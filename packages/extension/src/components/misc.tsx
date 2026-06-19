import type { AgentStatus } from '@page-agent/core'
import { BookOpen, Globe } from 'lucide-react'
import { siGithub } from 'simple-icons'

import { cn } from '@/lib/utils'

// Status dot indicator
export function StatusDot({ status }: { status: AgentStatus }) {
	const colorClass = {
		idle: 'bg-muted-foreground',
		running: 'bg-blue-500',
		completed: 'bg-green-500',
		error: 'bg-destructive',
	}[status]

	const label = {
		idle: 'Ready',
		running: 'Running',
		completed: 'Done',
		error: 'Error',
	}[status]

	return (
		<div className="flex items-center gap-1.5 mr-2">
			<span
				className={cn('size-2 rounded-full', colorClass)}
			/>
			<span className="text-xs text-muted-foreground">{label}</span>
		</div>
	)
}

export function Logo({ className }: { className?: string }) {
	return (
		<span
			role="img"
			aria-label="Student Web-Agent logo"
			className={cn(
				'inline-grid place-items-center border-2 border-foreground bg-background font-mono text-[9px] font-bold leading-none text-foreground',
				className
			)}
		>
			W
		</span>
	)
}

// Empty state for the student extension.
export function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
			<div className="select-none pointer-events-none">
				<Logo className="size-12" />
			</div>
			<div>
				<h2 className="text-base font-medium text-foreground mb-1">Student Web-Agent</h2>
				<p className="text-sm text-muted-foreground">Enter a task to automate this page.</p>
			</div>
			<div className="flex items-center gap-3 mt-1 text-muted-foreground">
				<a
					href="/hub.html"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors"
					title="GitHub"
				>
					<svg role="img" viewBox="0 0 24 24" className="size-4 fill-current">
						<path d={siGithub.path} />
					</svg>
				</a>
				<a
					href="/hub.html"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors"
					title="Documentation"
				>
					<BookOpen className="size-4" />
				</a>
				<a
					href="/hub.html"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors"
					title="Website"
				>
					<Globe className="size-4" />
				</a>
			</div>
		</div>
	)
}
