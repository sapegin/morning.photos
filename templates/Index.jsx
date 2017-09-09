import block from 'bem-cn';
import Page from './Page';
import ArticlesList from './components/ArticlesList';
import Photo from './components/Photo';
import SubscribeBlock from './components/SubscribeBlock';
import { getPhotoUrl } from '../js/util/util';

const b = block('index');

export default function($) {
	const { content, photoPosts, posts, userpic } = $;
	const { Script, typo, __ } = $;

	const [photo1, photo2, photo3] = photoPosts;
	const postsList = posts.map(({ url, title }) => ({ link: url, label: title }));

	return (
		<Page {...$}>
			<div class={b.mix('content')}>
				<div class={b('photos-section')}>
					<a href={photo1.url} class={b('primary-photo').mix(['link', 'link_quoted'])}>
						<Photo slug={photo1.firstPhoto} size="medium" />
						<div class={b('primary-photo-title')}>
							<u class={b('primary-photo-title-text')}>
								{photo1.title}
							</u>
						</div>
					</a>
					{photo2 && photo3 &&
						<div class={b('secondary-photos')}>
							<a href={photo2.url} class={b('secondary-photo', { first: true }).mix(['link', 'link_quoted'])}>
								<div
									class={b('secondary-photo-img')}
									style={`background-image:url(${getPhotoUrl(photo2.firstPhoto, 'medium')})`}
								></div>
								<div class={b('secondary-photo-title', { first: true })}>
									<u>{photo2.title}</u>
								</div>
							</a>
							<a href={photo3.url} class={b('secondary-photo', { last: true }).mix(['link', 'link_quoted'])}>
								<div
									class={b('secondary-photo-img')}
									style={`background-image:url(${getPhotoUrl(photo3.firstPhoto, 'medium')})`}
								></div>
								<div class={b('secondary-photo-title', { last: true })}>
									<u>{photo3.title}</u>
								</div>
							</a>
						</div>
					}
				</div>
				<div class={b('articles-section')}>
					<ArticlesList list={postsList} cols {...$} />
				</div>
				<div class={b('about-section')}>
					<div class={b('userpic')}>
						<img src={userpic} alt={__('author')} />
					</div>
					<div class={b('about')}>
						<div class={b('about-text').mix('text')}>
							{typo(content)}
						</div>
						<div class={b('subscribe')}>
							<SubscribeBlock {...$} from="Index" />
						</div>
					</div>
				</div>
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
