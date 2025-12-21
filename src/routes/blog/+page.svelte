<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Wilson Wilson</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-12">
	<h1 class="font-serif text-3xl font-bold text-fg">Blog</h1>

	<ul class="mt-8 space-y-6">
		{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}" class="group block">
					<h2 class="text-lg font-medium text-fg group-hover:text-violet-600">{post.title}</h2>
					<time class="text-sm text-fg-muted">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
				</a>
			</li>
		{/each}
	</ul>
</main>
