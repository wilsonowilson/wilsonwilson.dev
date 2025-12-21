import { error } from '@sveltejs/kit';

const posts = import.meta.glob('/content/posts/*.md', { eager: true });

export async function entries() {
	return Object.keys(posts)
		.filter((path) => {
			const post = posts[path] as { metadata: { published?: boolean } };
			return post.metadata.published !== false;
		})
		.map((path) => ({
			slug: path.replace('/content/posts/', '').replace('.md', '')
		}));
}

export async function load({ params }) {
	const path = `/content/posts/${params.slug}.md`;
	const post = posts[path] as { default: unknown; metadata: Record<string, unknown> } | undefined;

	if (!post) {
		throw error(404, `Post not found: ${params.slug}`);
	}

	return {
		content: post.default,
		metadata: post.metadata
	};
}
