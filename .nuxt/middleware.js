const middleware = {}

middleware['change-page-layout'] = require('@/middleware/change-page-layout.js');
middleware['change-page-layout'] = middleware['change-page-layout'].default || middleware['change-page-layout']

middleware['headers'] = require('@/middleware/headers.js');
middleware['headers'] = middleware['headers'].default || middleware['headers']

export default middleware
