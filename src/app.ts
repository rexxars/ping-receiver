import {IncomingMessage, ServerResponse} from 'node:http'

import {config} from './config.js'

export function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    res.writeHead(405, {'Content-Type': 'text/plain'})
    res.end('Method Not Allowed')
    return
  }

  const url = req.url || ''

  if (!url.startsWith('/ping/')) {
    return write404(res)
  }

  const thing = url.split('/')[2]
  if (!thing || !config.knownPings.includes(thing)) {
    return write404(res)
  }

  console.log('Received ping:', thing)
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('PONG')
}

function write404(res: ServerResponse) {
  res.writeHead(404, {'Content-Type': 'text/plain'})
  res.end('Not Found')
}
