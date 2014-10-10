<?php
// Author: Artem Sapegin, http://sapegin.me, 2014

if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) exit('Shoo! Shoo!');

define('CURRENCY_RUR', 'RUB');
if (TEST) {
	define('PAYPAL_API_HOST', 'https://www.sandbox.paypal.com/');
}
else {
	define('PAYPAL_API_HOST', 'https://www.paypal.com/');
}

/**
 * Get extra parameters from notification data.
 *
 * @param {array} $data Notificaton POST data.
 * @return {array}
 */
function parse_extras($data) {
	return array(
		'good_id' => get_required('item_name', $data),
		'email' => get_required('option_selection1', $data),
		'via' => 'paypal',
	);
}

/**
 * Get amount of money paid by customer.
 *
 * @param {array} $data Notificaton POST data.
 * @return {float}
 */
function get_paid_amount($data) {
	return floatval(get_required('mc_gross', $data));
}

/**
 * Verify currency.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_currency_ok($data) {
	return get_required('mc_currency', $data) === CURRENCY_RUR;
}

/**
 * Verify authenticity of notification.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_verified($data) {
	// Check status
	if (get_required('payment_status', $data) !== 'Completed') {
		// Just skip uncompleted notifications
		return false;
	}

	// Check receiver email
	$receiver_email = get_required('receiver_email', $data);
	if ($receiver_email !== PAYPAL_RECEIVER) {
		log_error("Wrong receiver email: $receiver_email");
		return false;
	}

	// Verify notification
	$url = PAYPAL_API_HOST . 'cgi-bin/webscr?cmd=_notify-validate';
	foreach ($data as $key => $value) {
		$url .= '&' . $key . '=' . urlencode(stripslashes($value));
	}
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($curl);
	curl_close($curl);

	log_message("PayPal result:\n $result");

	if ($result === 'VERIFIED') {
		return true;
	}
	else {
		log_error('Cannot verify HTTP notification');
		return false;
	}
}
