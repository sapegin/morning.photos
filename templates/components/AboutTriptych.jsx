const AboutTriptychItem = ({ id, alt }) => (
	<div class="photo-grid__photo">
		<div class="photo-grid__photo-i js-instagram">
			<img
				src={`/images/about/me${id}.jpg`}
				alt={alt}
				class="photo-grid__img photo-grid__img_original"
			/>
		</div>
	</div>
);

export default ({ start, alt }) => (
	<div class="photo-grid photo-grid_three photo-grid_fade">
		<AboutTriptychItem id={start} alt={alt} />
		<AboutTriptychItem id={start + 1} alt={alt} />
		<AboutTriptychItem id={start + 2} alt={alt} />
	</div>
);
