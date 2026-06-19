#!/usr/bin/env node
import chalk from 'chalk'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { parallelTask } from './parallel-task.js'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const rootPkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'))

console.log(chalk.bgBlue.white.bold(' ▸ cleanup '))
execSync('npm run cleanup', { cwd: rootDir, stdio: 'inherit' })

console.log(chalk.bgBlue.white.bold(' ▸ build '))
const tasks = rootPkg.workspaces
	.map((ws) => {
		const dir = join(rootDir, ws)
		const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'))
		return pkg.scripts?.build ? { label: pkg.name, command: 'npm run build', cwd: dir } : null
	})
	.filter(Boolean)

await parallelTask(tasks, { timeoutMs: 120_000 })
