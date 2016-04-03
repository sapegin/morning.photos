export default ({
	from, extra,
	safe, dateToString, option,
}) => (
	<form action={option('subscribe.url')} method="post" class="form subscribe" data-component="form subscribe"
		data-form-action={option('subscribe.endpoint')} data-form-type="jsonp" data-subscribe-from={from}>
		<div class="l-wrap l-space">
			<input type="hidden" name="u" value="de175cf2070fa3cfd7d3ad209" />
			<input type="hidden" name="id" value="e0d45226cc" />
			<div class="subscribe__honey">
				<input type="text" name="b_de175cf2070fa3cfd7d3ad209_e0d45226cc" tabindex="-1" value="" />
			</div>
			<div class="subscribe__field-col l-left">
				<input type="email" name="MERGE0" class="subscribe__field field field_block js-subscribe-email"
					placeholder={option('subscribe.emailLabel')} autocapitalize="off" autocorrect="off" required
					{...extra}
				/>
			</div>
			<div class="subscribe__button-col">
				<button type="submit" class="subscribe__button button">{option('subscribe.button')}</button>
			</div>
		</div>
		<div class="form__success alert js-form-success">{option('subscribe.success')}</div>
		<div class="form__error alert alert_error js-form-error">{option('subscribe.error')}</div>
	</form>
);
