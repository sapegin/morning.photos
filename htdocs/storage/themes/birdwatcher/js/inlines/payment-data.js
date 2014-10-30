var paymentData = {
	providers: {
		free: {
			action: '/pay/?provider=free',
			extras: {
				summ: 'summ',
				good_id: 'good_id',
				redirect: 'redirect'
			}
		},
		yandex: {
			action: 'https://money.yandex.ru/quickpay/confirm.xml',
			form: {
				'receiver': '4100135063548',
				'quickpay-form': 'small',
				'is-inner-form': 'true',
				'paymentType': 'PC'
			},
			extras: {
				json: 'label',
				summ: 'sum',
				description: 'targets',
				redirect: 'successURL'
			}
		},
		card: {
			clone: 'yandex',
			form: {
				paymentType: 'AC'
			}
		},
		paypal: {
			action: 'https://www.paypal.com/cgi-bin/webscr',
			form: {
				button: 'buynow',
				business: 'artem@sapegin.ru',
				currency_code: 'RUB',
				notify_url: 'http://birdwatcher.ru/pay/?provider=paypal',
				env: 'www',
				cmd: '_xclick',
				lc: 'ru_RU',
				on0: 'email'
			},
			extras: {
				good_id: 'item_name',
				summ: 'amount',
				email: 'os0',
				redirect: 'return'
			},
			test: {
				action: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
				formData: {
					business: 'artem+seller@sapegin.ru',
					env: 'www.sandbox'
				}
			}
		}
	}
};
