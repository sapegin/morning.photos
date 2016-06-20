import Base from './Base';
import PageHeader from './components/PageHeader';
import ArticlesList from './components/ArticlesList';
import { slugify } from '../src/util/gallery';

export default function($) {
	const { url, content, importantPosts, links, links2, blogTitle } = $;
	const { __, option, typo, json, Script } = $;
	const photos = option('featured').map(slugify);
	const posts = importantPosts.slice(0, 5).map(({ url, title }) => ({ link: url, label: title }));
	return (
		<Base {...$} pageType={['index', 'inverted-head', 'has-splash']}>
			<div class="index">
				<PageHeader menu={option('menu')} title={__('title')} url={url} />
				<u-featured>
					<div class="index__gallery swiper-container js-featured-container">
						<div class="swiper-wrapper js-featured-wrapper"></div>
					</div>
				</u-featured>
			</div>
			<div class="index-content js-content">
				<div class="index-content-i content">
					<div class="index-content__text">
						<div class="index-content__text-i">
							<div class="index-content__blog">
								<div class="articles-list-title articles-list-title_index">
									{typo(blogTitle)}
								</div>
								<ArticlesList list={posts} {...$} />
							</div>
							<div class="index-content__learn">
								<ArticlesList list={links} {...$} />
							</div>
							<div class="index-content__about">
								<div class="media index-about">
									<img
										src="/images/userpic.jpg"
										width="100"
										height="100"
										alt={__('author')}
										class="index-content__userpic media__img media__img_rev"
									/>
									<div class="media__body">
										{typo(content)}
									</div>
								</div>
								<ArticlesList list={links2} {...$} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<script>
				var __featuredPhotos = {json(photos)};
			</script>
			<Script src="/build/main.js"/>
		</Base>
	);
}
