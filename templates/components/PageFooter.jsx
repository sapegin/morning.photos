export default ({ author }) => (
	<footer class="footer">
		<div class="copyrights content">
			© <a href="http://sapegin.me/" class="link">{author}</a>,
			{' '}
			{(new Date()).getFullYear()}
		</div>
	</footer>
);
