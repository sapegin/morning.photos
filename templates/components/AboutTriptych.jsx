const AboutTriptychItem = ({ id, alt }) => (
	<div class="about-triptych__item">
		<div class="about-triptych__item-i js-instagram">
			<img
				src={`/images/about/me${id}.jpg`}
				alt={alt}
				class="about-triptych__photo about-triptych__photo_original"
			/>
		</div>
	</div>
);

export default ({ start, alt }) => (
	<div class="about-triptych">
		<AboutTriptychItem id={start} alt={alt} />
		<AboutTriptychItem id={start + 1} alt={alt} />
		<AboutTriptychItem id={start + 2} alt={alt} />
	</div>
);
