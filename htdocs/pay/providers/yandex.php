<?php
// Author: Artem Sapegin, http://sapegin.me, 2014

if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) exit('Shoo! Shoo!');

define('CURRENCY_RUR', '643');

/**
 * Get extra parameters from notification data.
 *
 * @param {array} $data Notificaton POST data.
 * @return {array}
 */
function parse_extras($data) {
	$json = get_required('label', $data);
	$json = json_decode($json);
	if (!$json) bad_request();
	return $json;
}

/**
 * Get amount of money paid by customer.
 *
 * @param {array} $data Notificaton POST data.
 * @return {float}
 */
function get_paid_amount($data) {
	return floatval(get_required('withdraw_amount', $data));
}

/**
 * Verify currency.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_currency_ok($data) {
	return get_required('currency', $data) === CURRENCY_RUR;  // TODO
}

/**
 * Verify authenticity of notification.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_verified($data) {
	if (get_required('sha1_hash', $data) === _calculate_hash($data)) {
		return true;
	}
	else {
		log_error('Cannot verify HTTP notification');
		return false;
	}
}

/**
 * Calculate notification hash.
 *
 * @param {array} $data Notificaton POST data.
 * @return {string}
 */
function _calculate_hash($data) {
	// http://api.yandex.ru/money/doc/dg/reference/notification-p2p-incoming.xml#verify-notification
	$parts = array(
		get_required('notification_type', $data),
		get_required('operation_id', $data),
		get_required('amount', $data),
		get_required('currency', $data),
		get_required('datetime', $data),
		get_required('sender', $data),
		get_required('codepro', $data),
		YA_MONEY_SECRET,
		get_required('label', $data),
	);
	return sha1(implode('&', $parts));
}
