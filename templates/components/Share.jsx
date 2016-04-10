import { Group } from 'fledermaus/lib/components';

export default ({
	title, url,
	__, absolutizeUrl,
}) => (
	<div class="social-likes social-likes_light" data-title={title} data-url={absolutizeUrl(url)}>
		<div class="facebook" title="Share link on Facebook">{__('share.facebook')}</div>
		<div class="twitter" title="Share link on Twitter" data-via={__('twitter')}>{__('share.twitter')}</div>
	</div>
);
