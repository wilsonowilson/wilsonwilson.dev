<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Wilson Wilson</title>
</svelte:head>

<section class="mt-8">
	<h2 class="font-serif text-2xl font-bold text-fg">All articles</h2>

	<ul class="mt-6 space-y-6">
		{#each data.posts as post}
			<li>
				<a href="/articles/{post.slug}" class="group block">
					<h3 class="font-medium text-fg group-hover:text-primary">{post.title}</h3>
					<time class="text-sm text-fg-muted">
						{new Date(post.date).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})}
					</time>
					{#if post.description}
						<p class="mt-1 line-clamp-2 text-sm text-fg-secondary">{post.description}</p>
					{/if}
					{#if post.tags.length > 0}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span class="rounded bg-canvas-muted px-2 py-0.5 text-xs text-fg-muted">{tag}</span>
							{/each}
						</div>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
