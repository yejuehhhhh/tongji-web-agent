#!/usr/bin/env node
import { createReadStream, existsSync } from 'fs'
import { createServer } from 'http'
import { extname, join, normalize } from 'path'
import { fileURLToPath } from 'url'

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const port = Number(process.env.PORT || 5174)
const host = process.env.HOST || '127.0.0.1'

const routes = new Map([
	['/', join(rootDir, 'examples/search.html')],
	['/search.html', join(rootDir, 'examples/search.html')],
	['/page-agent.demo.js', join(rootDir, 'packages/page-agent/dist/iife/page-agent.demo.js')],
])

const contentTypes = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
}

function getFilePath(url) {
	const pathname = new URL(url, `http://localhost:${port}`).pathname
	if (routes.has(pathname)) return routes.get(pathname)

	const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
	if (safePath.startsWith('/examples/')) {
		return join(rootDir, safePath)
	}

	return null
}

const server = createServer((request, response) => {
	const filePath = getFilePath(request.url || '/')

	if (!filePath || !existsSync(filePath)) {
		response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
		response.end('Not found')
		return
	}

	response.writeHead(200, {
		'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
		'Cache-Control': 'no-store',
	})
	createReadStream(filePath).pipe(response)
})

server.listen(port, host, () => {
	console.log(`Student Web-Agent demo: http://${host}:${port}`)
	console.log('Task to try: 请在搜索框输入 browser-use，并点击搜索按钮')
})
