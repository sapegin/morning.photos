import flow from 'lodash/flow';
import { markdownBlock } from 'fledermaus/lib/util';
import books, { booksPubDate } from '../src/data/books';
import PageWithTitle from './PageWithTitle';
import Share from './components/Share';
import SubscribePopup from './components/SubscribePopup';

const rating = stars => (
	<span>
		{'★'.repeat(stars)}
		{stars % 1 !== 0 && <i>★</i>}
	</span>
);

export default function($) {
	const { content, pageTitle, lastUpdateLabel } = $;
	const { typo, typoTitle, dateToString, getBuyLink, Script } = $;
	return (
		<PageWithTitle {...$} pageType="reading">
			<div class="text">
				{typo(content)}

				<p class="l-quad-space">{lastUpdateLabel} {dateToString(booksPubDate)}</p>

				<div class="book-reviews">
					{books.map(book => {
						return (
							<div class="book-review" id={book.id}>
								<h2 class="book-review__title">
									{book.author}{'. '}
									{book.link ? (
										<a href={getBuyLink(book.link)} data-track="Book link clicked">{book.title}</a>
									) : (
										book.link
									)}
									{' '}
									{book.year &&
										<span class="book-review__year">{book.year}</span>
									}
								</h2>
								{book.translation &&
									<h3 class="book-review__translation">
										{book.translation.author}{'. '}
										<a href={getBuyLink(book.translation.link)} data-track="Book link clicked">
											{book.translation.title}
										</a>
									</h3>
								}
								<div class="media">
									<div class="media__img">
										<img
											src={`/images/books/${book.id}.jpg`}
											alt={`${book.author}. ${book.title}`}
											class="book-review__img"
										/>
										<div class="book-review__rating">
											{rating(book.rating)}
										</div>
									</div>
									<div class="media__body book-review__text">
										{flow(markdownBlock, typo)(book.text)}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<Share {...$} title={pageTitle} />
			</div>

			<SubscribePopup {...$} from="Reading" />
			<Script src="/build/main.js"/>
		</PageWithTitle>
	);
}
