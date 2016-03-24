<?php
// Author: Artem Sapegin, http://sapegin.me, 2014

require 'vendor/PHPMailer/class.phpmailer.php';
require 'vendor/PHPMailer/class.smtp.php';

$PROVIDERS = array('free', 'yandex', 'paypal');

define('SETTINGS_DIR', '../../payments/');
define('LOG_FILE', SETTINGS_DIR . '/log.log');
define('DB_FILE', SETTINGS_DIR . '/data/db');
define('TEMPLATES_DIR', SETTINGS_DIR . '/templates');

require SETTINGS_DIR . '/settings.php';

if (DEBUG) {
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
}

////////////////////////////////////////////////////////////////

// Yandex
/*$_GET = array(
	'provider' => 'yandex',
);
$_POST = array(
	'test_notification' => 'true',
	'sender' => '41001000040',
	'amount' => '213.03',
	'withdraw_amount' => '220',
	'operation_id' => 'test-notification',
	'sha1_hash' => '8e65cb819abbd7f5c19c236747ba3b4d55485691',
	'notification_type' => 'p2p-incoming',
	'codepro' => 'false',
	'label' => '{"good_id":"csebook","email":"artem+test@sapegin.ru","via":"card"}',
	'datetime' => '2014-09-25T09:51:54Z',
	'currency' => '643',
);*/

// Paypal
/*
$_GET = array(
	'provider' => 'paypal',
);
$_POST = array(
	'mc_gross' => '99.00',
	'protection_eligibility' => 'Eligible',
	'address_status' => 'unconfirmed',
	'payer_id' => 'SRJRN49UFNKYE',
	'tax' => '0.00',
	'address_street' => 'Lenin street, 13',
	'payment_date' => '09:56:28 Oct 08, 2014 PDT',
	'payment_status' => 'Completed',
	'charset' => 'windows-1252',
	'address_zip' => '127001',
	'first_name' => 'Artem',
	'option_selection1' => 'artem+book@sapegin.ru',
	'mc_fee' => '13.86',
	'address_country_code' => 'RU',
	'address_name' => 'Sapegin Artem',
	'notify_version' => '3.8',
	'custom' => '',
	'payer_status' => 'verified',
	'business' => 'artem+seller@sapegin.ru',
	'address_country' => 'Russia',
	'address_city' => 'Moscow',
	'quantity' => '1',
	'verify_sign' => 'AomRS5l2W2xlt2An.GaSrAzpCl-NAFCYDOV1hMU9V0ZdXpJ1.Zawtt56',
	'payer_email' => 'artem+wow@sapegin.ru',
	'option_name1' => 'email',
	'txn_id' => '34F65801476271124',
	'payment_type' => 'instant',
	'last_name' => 'Sapegin',
	'address_state' => 'Moscow',
	'receiver_email' => 'artem+seller@sapegin.ru',
	'payment_fee' => '',
	'receiver_id' => '78HJUSAJ9HL3G',
	'txn_type' => 'web_accept',
	'item_name' => 'csebook',
	'mc_currency' => 'RUB',
	'item_number' => '',
	'residence_country' => 'RU',
	'test_ipn' => '1',
	'handling_amount' => '0.00',
	'transaction_subject' => '',
	'payment_gross' => '',
	'shipping' => '0.00',
	'ipn_track_id' => 'f44957adc2228',
);
*/

// Free
$_GET = array(
	'provider' => 'free',
);
$_POST = array(
	'good_id' => 'csebook',
	'email' => 'artem+book@sapegin.ru',
);
////////////////////////////////////////////////////////////////


log_message(print_r($_GET, true));
log_message(print_r($_POST, true));

$provider = get_required('provider', $_GET);
if (!in_array($provider, $PROVIDERS)) bad_request();
require "providers/$provider.php";
process($_POST);

// ----

/**
 * Process order.
 *
 * @param {array} $data POST data.
 */
function process($data) {
	// Extras
	$extras = parse_extras($data);
	log_message("Extras:\n" . print_r($extras, true));
	$good_id = get_required_escaped('good_id', $extras);
	$email = get_required_escaped('email', $extras);
	$via = get_required_escaped('via', $extras);

	// Init database
	$db = init_db();

	// Verify currency
	if (!is_currency_ok($data)) {
		log_error('Wrong currency.');
		bad_request();
	}

	// Verify good and price
	$good = $db->querySingle("SELECT price, list_id FROM goods WHERE good_id = '$good_id'", true);
	$price = floatval(get_required('price', $good));
	$summ = get_paid_amount($data);
	if ($summ < $price) {
		log_error("Not enough money. Paid $summ, needed $price.");
		bad_request();
	}

	// Verify payment notification
	if (!is_verified($data)) {
		bad_request();
	}

	// Save order
	$db->exec("INSERT INTO sales (good_id, summ, via, email) VALUES ('$good_id', '$summ', '$via', '$email')");

	// Send email
	$subject = trim(template("$good_id.subject"));
	$body = template("$good_id.body");
	email($email, $subject, $body);

	// Subscribe to list
	$list_id = $good['list_id'];
	if ($list_id) {
		subscribe($email, $list_id);
	}

	log_message('OK.');
}

/**
 * Connect to SQLite database and create tables if they don’t exist.
 *
 * @return {SQLite3}
 */
function init_db() {
	// Connect to DB
	try {
		$db = new SQLite3(DB_FILE);
	}
	catch (Exception $e) {
		log_error('Cannot open SQLite database: ' . $e->getMessage());
		exit();
	}

	// Create tables
	$db->exec("CREATE TABLE IF NOT EXISTS goods (
		good_id text PRIMARY KEY NOT NULL,
		price real NOT NULL,
		discount integer DEFAULT(0),
		discount_end integer DEFAULT(0),
		list_id text
	)");
	$db->exec("CREATE TABLE IF NOT EXISTS sales (
		sale_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		good_id text NOT NULL,
		summ real NOT NULL,
		via text NOT NULL,
		email text NOT NULL,
		coupon text,
		timestamp integer DEFAULT(strftime('%s','now'))
	)");

	return $db;
}

/**
 * Send email.
 *
 * @param {string} $to Recepient email.
 * @param {string} $subject Email subject.
 * @param {string} $body Message.
 * @return {boolean}
 */
function email($to, $subject, $body) {
	$mail = new PHPMailer;

	// Set up SMTP
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPDebug = DEBUG ? 2 : 0;  // 0 = off; 1 = client messages; 2 = client and server messages
	$mail->Debugoutput = 'html';
	$mail->Port = 587;  // 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;
	$mail->Username = FROM_EMAIL;
	$mail->Password = GMAIL_PASSWORD;

	$mail->CharSet = 'UTF-8';

	$mail->addAddress($to);
	$mail->setFrom(FROM_EMAIL, FROM_NAME);
	$mail->Subject = $subject;
	$mail->Body = $body;

	if ($mail->send()) {
		return true;
	}
	else {
		log_error('Message could not be sent: ' . $mail->ErrorInfo);
		return false;
	}
}

/**
 * Silently subscribe to MailChimp list.
 *
 * @param {string} $email User email.
 * @param {string} $list_id MailChimp list ID.
 * @return {boolean}
 */
function subscribe($email, $list_id) {
	// http://apidocs.mailchimp.com/api/2.0/lists/subscribe.php
	$params = array(
		'apikey' => MAILCHIMP_API_KEY,
		'id' => $list_id,
		'email' => array(
			'email' => $email
		),
		'double_optin' => false,
		'send_welcome' => false
	);

	$curl = curl_init(MAILCHIMP_API_HOST . '/2.0/lists/subscribe');
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($curl);
	curl_close($curl);

	log_message("MailChimp result:\n $result");

	if ($result === false) {
		log_error('Cannot subscribe to mail list: curl returned false.');
		return false;
	}

	$result = json_decode($result);
	if (property_exists($result, 'status') && $result->status === 'error') {
		log_error('Cannot subscribe to mail list: MailChimp said: ' . $result->error);
		return false;
	}

	return true;
}

/**
 * Read template from a file.
 *
 * @param {string} $name Template name
 * @return {string}
 */
function template($name) {
	$filename = TEMPLATES_DIR . "/$name.tpl";
	if (!file_exists($filename)) bad_request();
	return file_get_contents($filename);
}

/**
 * Return array (object) value or halt script if there’s not such key in array.
 *
 * @param {string} $key
 * @param {array|object} $array
 * @return {mixed}
 */
function get_required($key, $array) {
	if (is_array($array) && array_key_exists($key, $array)) {
		return $array[$key];
	}
	else if (is_object($array) && property_exists($array, $key)) {
		return $array->$key;
	}
	else {
		log_message("Key $key not found in an array.");
		bad_request();
	}
}

/**
 * Return escaped array (object) value or halt script if there’s not such key in array.
 *
 * @param {string} $key
 * @param {array|object} $array
 * @return {mixed}
 */
function get_required_escaped($key, $array) {
	return SQLite3::escapeString(get_required($key, $array));
}

/**
 * Halt script with 400 Bad request HTTP header.
 *
 * @return [type] [description]
 */
function bad_request() {
	header('HTTP/1.0 400 Bad request');
	exit('Shoo! Shoo!');
}

/**
 * Write string to a log file, only in debug mode.
 *
 * @param {string} $message
 */
function log_message($message, $error = false) {
	if (DEBUG || $error) {
		error_log($message, 3, LOG_FILE);
	}
}

/**
 * Write string to a log file
 *
 * @param {string} $message
 */
function log_error($message) {
	log_message($message, true);
}
