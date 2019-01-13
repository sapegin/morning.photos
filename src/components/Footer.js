import React from 'react';
import { Text, Link } from 'tamia';

export default () => (
	<Text size="xs" as="footer" role="contentinfo">
		© <Link href="http://sapegin.me/">Artem Sapegin</Link>, 2004—{new Date().getFullYear()}
	</Text>
);
