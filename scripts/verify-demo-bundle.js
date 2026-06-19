#!/usr/bin/env node
import { readFileSync } from 'fs'
import { join } from 'path'

const bundlePath = join(process.cwd(), 'packages/page-agent/dist/iife/page-agent.demo.js')
const bundle = readFileSync(bundlePath, 'utf-8')

const forbidden = [
	'page-ag-testing-ohftxirgbn.cn-shanghai.fcapp.run',
	'qwen3.5-plus',
	'DEMO_API_KEY',
]

const matches = forbidden.filter((text) => bundle.includes(text))

if (matches.length > 0) {
	console.error(`Demo bundle still contains removed demo defaults: ${matches.join(', ')}`)
	process.exit(1)
}

console.log('Demo bundle does not contain removed remote demo defaults.')
