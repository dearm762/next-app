'use client'

import { usePost } from '@/actions/posts/post'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon, UserIcon, EyeIcon } from 'lucide-react'

function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).split('/').join('.')
}

export default function Post() {
	const { id } = useParams()
	const { post, loading, error } = usePost(id as string)

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Skeleton className="h-12 w-3/4 mb-4" />
				<Skeleton className="h-4 w-1/2 mb-8" />
				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Alert variant="destructive">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		)
	}

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Alert>
					<AlertTitle>Not Found</AlertTitle>
					<AlertDescription>The requested post could not be found.</AlertDescription>
				</Alert>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">{post.title}</CardTitle>
					<div className="flex items-center space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<UserIcon className="mr-1 h-3 w-3" />
							<span>{post.author.name}</span>
						</div>
						<div className="flex items-center">
							<CalendarIcon className="mr-1 h-3 w-3" />
							<span>{formatDate(post.createdAt)}</span>
						</div>
						<div className="flex items-center">
							<EyeIcon className="mr-1 h-3 w-3" />
							<span>{post.viewCount} views</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="prose max-w-none">{post.content}</div>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-2">
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<Badge key={tag.name} variant="secondary">
								{tag.name}
							</Badge>
						))}
					</div>
					{post.category && (
						<Badge variant="outline" className="mt-2">
							{post.category.name}
						</Badge>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
