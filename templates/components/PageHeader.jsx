import cx from 'classnames';
import map from 'lodash/map';

export default ({ menu, url, title }) => (
	<header class="header content">
		<div class="header-i">
			{url === '/' ? (
				<h1 class="logo">{title}</h1>
			) : (
				<div class="logo"><a href="/" class="logo__link">{title}</a></div>
			)}
			<nav class="nav">
				{map(menu, (itemUrl, itemTitle) => (
					<div class="nav__item">
						{itemUrl === url ? (
							<span class="nav__label is-active">{itemTitle}</span>
						) : (
							<a class={cx('nav__link', { 'is-active': url.startsWith(itemUrl) })} href={itemUrl}>{itemTitle}</a>
						)}
					</div>
				))}
			</nav>
		</div>
	</header>
);
