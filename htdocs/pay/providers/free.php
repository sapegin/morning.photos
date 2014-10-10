<?php
// Author: Artem Sapegin, http://sapegin.me, 2014

if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) exit('Shoo! Shoo!');

/**
 * Get extra parameters from notification data.
 *
 * @param {array} $data Notificaton POST data.
 * @return {array}
 */
function parse_extras($data) {
	return array(
		'good_id' => get_required('good_id', $data),
		'email' => get_required('email', $data),
		'via' => 'free',
	);
}

/**
 * Get amount of money paid by customer.
 *
 * @param {array} $data Notificaton POST data.
 * @return {float}
 */
function get_paid_amount($data) {
	return 0;
}

/**
 * Verify currency.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_currency_ok($data) {
	return true;
}

/**
 * Verify authenticity of notification.
 *
 * @param {array} $data Notificaton POST data.
 * @return {boolean}
 */
function is_verified($data) {
	return true;
}
