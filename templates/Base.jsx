const viewport = extra => 'width=device-width, initial-scale=1.0' + (extra ? `, ${extra}` : '');

export default ($, children) => (
	<html lang={$.lang}>
		<head>
			<meta charset="utf-8" />
			<title>{$.getPageTitle()}</title>
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content={viewport($.viewportExtra)} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			{$.noindex && <meta name="robots" content="noindex follow" />}

			<meta property="og:site_name" content="Replace with proper meta tags generation" />
			{/* <link rel="alternative" href={$.rss} title={$.option('blogTitle')} type="application/atom+xml" /> */}

			<$.Style src="/build/styles.css" />

			{/* <Script src="build/counters.js" inline /> */}
		</head>
		<body class={$.getBodyClasses($.pageType)}>
			{children}
		</body>
	</html>
);
