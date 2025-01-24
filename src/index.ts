export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const contentURLStr = url.searchParams.get('url');
		if (!contentURLStr) {
			return new Response('Missing url parameter', { status: 400 });
		}
		const contentURL = new URL(contentURLStr);
		const response = await fetch(contentURL.toString());
		const streamResponse = new Response(response.body, response);
		streamResponse.headers.delete('Content-Security-Policy');
		streamResponse.headers.set('Access-Control-Allow-Origin', '*');
		streamResponse.headers.set('Access-Control-Allow-Methods', '*');
		streamResponse.headers.set('Access-Control-Allow-Headers', '*');
		return streamResponse;
	},
} satisfies ExportedHandler<Env>;
