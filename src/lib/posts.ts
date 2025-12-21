export interface Post {
	title: string;
	slug: string;
	date: string;
	description: string;
	tags: string[];
	image?: string;
	external?: string;
}

interface PostMetadata {
	title: string;
	date: string;
	description: string;
	tags?: string[];
	published?: boolean;
	image?: string;
	external?: string;
}

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/content/posts/*.md', { eager: true });

	const posts: Post[] = [];

	for (const path in modules) {
		const module = modules[path] as { metadata: PostMetadata };
		const { metadata } = module;

		if (metadata.published === false) continue;

		const slug = path.replace('/content/posts/', '').replace('.md', '');

		posts.push({
			title: metadata.title,
			slug,
			date: metadata.date,
			description: metadata.description || '',
			tags: metadata.tags || [],
			image: metadata.image,
			external: metadata.external
		});
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
