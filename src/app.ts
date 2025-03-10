import Elysia from 'elysia'
import swagger from '@elysiajs/swagger'
import routes from './app.routes'

export function createApp() {
    const app = new Elysia()
        .use(
            swagger({
                exclude: ['/swagger'],
                autoDarkMode: true,
                documentation: {
                    info: {
                        title: 'Inject-O-Matic',
                        description: 'API to inject scripts into HTML pages',
                        version: '1.0.0',
                        license: {
                            name: 'MIT',
                            url: 'https://opensource.org/license/mit',
                        },
                        contact: {
                            name: 'Franck DUBARD',
                            url: 'https://github.com/franckdubard',
                        },
                    },
                },
            }),
        )
        .use(routes())
    return app
}

export default createApp
