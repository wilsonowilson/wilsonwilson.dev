export interface Post {
	title: string;
	slug: string;
	date: string;
	description: string;
}

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/content/posts/*.md', { eager: true });

	const posts: Post[] = [];

	for (const path in modules) {
		const module = modules[path] as { metadata: { title: string; date: string; description: string } };
		const slug = path.replace('/content/posts/', '').replace('.md', '');

		posts.push({
			title: module.metadata.title,
			slug,
			date: module.metadata.date,
			description: module.metadata.description
		});
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
