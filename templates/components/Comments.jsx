export default ({
	url,
	absolutizeUrl, safe, option,
}) => (
	<div class="l-quad-space">
		<div id="disqus_thread"></div>
		<script>{safe(`
			var disqus_config = function () {
				this.page.url = ${JSON.stringify(absolutizeUrl(url))};
				this.page.identifier = ${JSON.stringify(url)};
			};
			(function() {
				var d = document, s = d.createElement('script');
				s.src = '//${option('disqus')}.disqus.com/embed.js';
				s.setAttribute('data-timestamp', +new Date());
				(d.head || d.body).appendChild(s);
			})();
		`)}</script>
	</div>
);
