import React from 'react';
import { Text, Link } from 'tamia';

export default function Footer() {
	return (
		<Text size="xs" as="footer" role="contentinfo">
			© <Link href="https://sapegin.me/">Artem Sapegin</Link>, 2004—{new Date().getFullYear()}
		</Text>
	);
}
