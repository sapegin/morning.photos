import Page from './Page';
import ArticlesList from './components/ArticlesList';
import Photo from './components/Photo';
import SubscribeForm from './components/SubscribeForm';
import { getPhotoUrl } from '../js/util/util';

export default function($) {
	const { content, links, photoPosts, posts, userpic, subscribeNote } = $;
	const { Script, typo, __ } = $;

	const [photo1, photo2, photo3] = photoPosts;
	const postsList = posts.map(({ url, title, important }) => ({ link: url, label: title, important }));

	return (
		<Page {...$}>
			<div class="index content">
				<div class="l-quint-space">
					<a href={photo1.url} class="index__primary-photo">
						<Photo slug={photo1.firstPhoto} size="medium" />
						<div class="index__primary-photo-title">
							<span class="index__primary-photo-title-text">
								{photo1.title}
							</span>
						</div>
					</a>
					{photo2 && photo3 &&
						<div class="index__secondary-photos">
							<a href={photo2.url} class="index__secondary-photo link link_quoted">
								<div
									class="index__secondary-photo-img"
									style={`background-image:url(${getPhotoUrl(photo2.firstPhoto, 'small')})`}
								></div>
								<u class="index__secondary-photo-title">{photo2.title}</u>
							</a>
							<a href={photo3.url} class="index__secondary-photo link link_quoted">
								<div
									class="index__secondary-photo-img"
									style={`background-image:url(${getPhotoUrl(photo3.firstPhoto, 'small')})`}
								></div>
								<u class="index__secondary-photo-title">{photo3.title}</u>
							</a>
						</div>
					}
				</div>
				<div class="l-sext-space">
					<div class="l-double-space">
						<ArticlesList list={postsList} cols markImportant {...$} />
					</div>
					{links &&
						<ArticlesList list={links} cols {...$} />
					}
				</div>
				<div class="index__about-container">
					<div class="index__userpic">
						<img
							src={userpic}
							alt={__('author')}
							class="index-content__userpic-img"
						/>
					</div>
					<div class="index__about">
						<div class="index__about-text text">
							{typo(content)}
						</div>
						<div class="index__subscribe">
							<SubscribeForm {...$} from="Index" />
							<div class="note">{typo(subscribeNote)}</div>
						</div>
					</div>
				</div>
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
