import Elysia from 'elysia'

import HtmlController from '../modules/html/rest-v1.controller'

export const ApiRestv1 = () => new Elysia({ prefix: 'api/rest/1' }).use(HtmlController())

export default ApiRestv1
