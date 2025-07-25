import {createServer} from 'node:http'

import {handler} from './app.js'
import {config} from './config.js'

const server = createServer(handler)
server.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port}`)
})
