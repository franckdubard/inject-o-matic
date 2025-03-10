import * as cheerio from 'cheerio'
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

export function createApp() {
    const app = new Elysia().use(swagger()).post(
        '/api/rest/1/inject',
        async ({ headers, body: { url, scripts } }) => {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            let html = await response.text()
            const $ = cheerio.load(html)
            if ($('head').length === 0) {
                html = new HTMLRewriter()
                    .on('html', {
                        element(html) {
                            html.prepend(`<head></head>`, { html: true })
                        },
                    })
                    .transform(html)
            }
            html = new HTMLRewriter()
                .on('head', {
                    element(head) {
                        scripts.forEach(({ src, async = true, defer = false }) => {
                            const attrs = []
                            if (async) attrs.push('async')
                            if (defer) attrs.push('defer')
                            head.append(`<script src="${src}" ${attrs.join(' ')}/>`, { html: true })
                        })
                    },
                })
                .transform(html)
            return new Response(html, { headers: { ...headers, 'content-type': 'text/html' } })
        },
        {
            body: t.Object({
                url: t.String(),
                scripts: t.Array(
                    t.Object({
                        src: t.String(),
                        async: t.Optional(t.Boolean({ default: true })),
                        defer: t.Optional(t.Boolean({ default: false })),
                    }),
                    {
                        minItems: 1,
                    },
                ),
            }),
        },
    )
    return app
}

export default createApp
