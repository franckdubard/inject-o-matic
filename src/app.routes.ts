import Elysia from 'elysia'

import ApiRestv1 from './api/rest-v1.controller'

export const routes = () => new Elysia().use(ApiRestv1())

export default routes
