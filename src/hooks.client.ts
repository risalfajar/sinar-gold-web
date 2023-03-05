import * as SentrySvelte from '@sentry/svelte'
import {BrowserTracing} from '@sentry/tracing'
import {HandleClientError} from "@sveltejs/kit"

const isProd = import.meta.env.PROD

if (isProd)
	SentrySvelte.init({
		dsn: 'https://5d4c36dd4693484a87c0a21e3541f1cc@o4504777970876416.ingest.sentry.io/4504777975267328',
		integrations: [new BrowserTracing()],
		tracesSampleRate: 0.1,
	})

// This will catch errors in load functions from +page.ts files
export const handleError = (({error, event}) => {
	if (isProd)
		SentrySvelte.captureException(error, {contexts: {sveltekit: {event}}})

	return {
		// @ts-ignore
		message: error.message
	}
}) satisfies HandleClientError
