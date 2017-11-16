import block from 'bem-cn';
import map from 'lodash/map';

const logo = block('logo');
const nav = block('nav');

export default ({ menu, url, title }) => (
	<header class="header content">
		<div class="header-i">
			{url === '/' ? (
				<h1 class={logo}>{title}</h1>
			) : (
				<div class={logo}>
					<a href="/" class={logo('link')}>
						{title}
					</a>
				</div>
			)}
			<nav class={nav}>
				{map(menu, (itemUrl, itemTitle) => (
					<div class={nav('item')}>
						{itemUrl === url ? (
							<span class={nav('label').is({ active: true })}>{itemTitle}</span>
						) : (
							<a class={nav('link').is({ active: url.startsWith(itemUrl) })} href={itemUrl}>
								{itemTitle}
							</a>
						)}
					</div>
				))}
			</nav>
		</div>
	</header>
);
