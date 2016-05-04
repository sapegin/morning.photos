import books from '../src/data/books';
import PageWithTitle from './PageWithTitle';

export default function($) {
	const { importantPosts } = $;
	const { typo } = $;
	return (
		<PageWithTitle {...$}>
			<div class="l-row text">
				<div class="l-half">
					<div class="articles-list">
						<ul class="articles-list__list">
							<li class="articles-list__item">
								<a href="/learn/reading" class="link">Книги о фотографии</a>
								<div class="articles-list__description">Рецензии на прочитанные мной книги</div>
								<div class="latest-books">
									{books.slice(0, 5).map(book => {
										const alt = `${book.author}. ${book.title}`;
										return (
											<a href={`/reading/${book.id}`} title={alt} class="latest-books__item">
												<img
													src={`/images/books/${book.id}.jpg`}
													alt={alt}
													class="latest-books__img"
												/>
											</a>
										);
									})}
								</div>
							</li>
							<li class="articles-list__item">
								<a href="/learn/microstocks" class="link">Микростоки</a>
								<div class="articles-list__description">Как продавать фотографии в интернете</div>
							</li>
							<li class="articles-list__item">
								<a href="/learn/quotes" class="link">Цитаты о фотографии и искусстве</a>
								<div class="articles-list__description">Фотографы, художники и писатели</div>
							</li>
							<li class="articles-list__item">
								<a href="/learn/funquotes" class="link">Фотография где</a>
								<div class="articles-list__description">Смешные цитаты с фотофорумов</div>
							</li>
							<li class="articles-list__item">
								<a href="/subscribe" class="link">Рассылка сайта</a>
								<div class="articles-list__description">
									Фотографии, статьи, новые проекты
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="l-half">
					<div class="articles-list">
						<h2 class="articles-list__title">
							<a href="/blog" class="link">Блог</a>
						</h2>
						<ul class="articles-list__list">
							{importantPosts.map(post => (
								<li class="articles-list__item">
									<a href={post.url} class="link">{typo(post.title)}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</PageWithTitle>
	);
}
