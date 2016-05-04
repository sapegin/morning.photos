export default ({
	option,
}) => (
	<div class="comments">
		<a class="muut" href={`https://muut.com/i/${option('moot')}/comments`} type="dynamic">{option('moot')}</a>
		<script src="//cdn.muut.com/1/moot.min.js"></script>
	</div>
);
