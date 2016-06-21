export default ({
	from, extra, buttonLabel,
	dateToString, option, __,
}) => (
	<u-subscribe data-action={option('subscribe.endpoint')} data-from={from}>
		<form action={option('subscribe.url')} method="post" class="form subscribe js-subscribe-form">
			<div class="subscribe__form l-wrap l-space">
				<input type="hidden" name="u" value="de175cf2070fa3cfd7d3ad209" />
				<input type="hidden" name="id" value={option('subscribe.id')} />
				<input type="hidden" name="SIGNUP" value={from} />
				<div class="subscribe__honey" aria-hidden="true">
					<input
						type="text"
						name={`b_de175cf2070fa3cfd7d3ad209_${option('subscribe.id')}`}
						tabindex="-1"
						value=""
					/>
				</div>
				<div class="subscribe__field-col l-left">
					<input
						type="email"
						name="MERGE0"
						class="subscribe__field field field_block js-subscribe-email"
						placeholder={__('subscribe.emailLabel')}
						autocomplete="home email"
						autocapitalize="off"
						autocorrect="off"
						required
						{...extra}
					/>
				</div>
				<div class="subscribe__button-col">
					<button type="submit" class="subscribe__button button">
						{buttonLabel || __('subscribe.button')}
					</button>
				</div>
			</div>
			<div class="form__success alert js-ajaxform-success">{__('subscribe.success')}</div>
			<div class="form__error alert alert_error js-ajaxform-error">{__('subscribe.error')}</div>
		</form>
	</u-subscribe>
);
