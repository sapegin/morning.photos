export default ({ author }) => (
	<footer class="footer">
		<div class="copyrights content">
			©{' '}
			<a href="http://sapegin.me/" class="footer__link">
				{author}
			</a>, 2004—{new Date().getFullYear()}
		</div>
	</footer>
);
