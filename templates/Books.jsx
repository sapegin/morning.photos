import flow from 'lodash/flow';
import { markdownBlock } from 'fledermaus/lib/util';
import PageWithTitle from './PageWithTitle';
import Subscribe from './components/Subscribe';
import Share from './components/Share';

const image = (id, lang, type) => `/images/ebooks/${id}/${id}-${lang}-${type}.jpg`;

const onClickScript = () => `
	var form = document.querySelector('.js-subscribe-block');
	form.classList.remove('is-active');
	setTimeout(function() {
		form.classList.add('is-active');
		document.querySelector('.js-subscribe-email').focus();
	}, 100)
`.replace(/[\n\t]/g, '');

export default function($) {
	const { pageTitle, lang, books } = $;
	const { typo, Script, __ } = $;
	return (
		<PageWithTitle {...$}>
			{books.map(book => (
				<div class="book">
					<div class="book__cover">
						<img
							class="book__cover-image"
							src={image(book.id, lang, 'cover')}
							alt={book.caption}
						/>
					</div>
					<div class="book__info">
						<div class="book__description text">{flow(markdownBlock, typo)(book.description)}</div>
						<div class="book__footer">
							<ul class="book__features">
								{book.features.map(feature => (
									<li class="book__feature">{feature}</li>
								))}
							</ul>
							<div class="book__download">
								<a
									href="#subscribe"
									class="buy-button"
									onclick={onClickScript()}
									data-scroll
								>
									{__('books.download')}
								</a>
							</div>
						</div>
					</div>
					<div class="book__spreads">
						<div class="book__spread">
							<img
								class="book__spread-image"
								src={image(book.id, lang, 'spread-1')}
								alt={book.caption}
							/>
						</div>
						<div class="book__spread book__spread_middle">
							<img
								class="book__spread-image book__spread-image_middle"
								src={image(book.id, lang, 'spread-2')}
								alt={book.caption}
							/>
						</div>
						<div class="book__spread book__spread_last">
							<img
								class="book__spread-image"
								src={image(book.id, lang, 'spread-3')}
								alt={book.caption}
							/>
						</div>
					</div>
				</div>
			))}

			<Subscribe
				{...$}
				from="Books"
				formTitle={__('books.formTitle')}
				infoText={__('books.formInfo')}
				buttonLabel={__('books.formButton')}
			/>

			<Share {...$} title={pageTitle} />

			<Script src="/build/main.js"/>
		</PageWithTitle>
	);
}

