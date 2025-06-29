import { Stack } from './Stack';
import { Heading } from './Heading';
import { TextTypo } from './TextTypo';
import { SubscriptionForm } from './SubscriptionForm';

export function Subscription() {
	return (
		<Stack as="aside" gap="m" aria-label="Newsletter">
			<Heading as="h2" level={3}>
				Join the newsletter
			</Heading>
			<TextTypo>
				<>
					Like my photos? Subscribe to get my thoughts, new photos, and updates
					on my zine into your inbox.
					<br />
					<i>No spam, not-too-often, unsubscribe at any time.</i>
				</>
			</TextTypo>
			<SubscriptionForm />
		</Stack>
	);
}
