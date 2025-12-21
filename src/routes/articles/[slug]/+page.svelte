<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} - Wilson Wilson</title>
	{#if data.metadata.description}
		<meta name="description" content={data.metadata.description} />
	{/if}
	{#if data.metadata.image}
		<meta property="og:image" content={data.metadata.image} />
	{/if}
</svelte:head>

<article class="mt-8">
	<header class="mb-8">
		<h1 class="font-serif text-2xl font-bold text-fg">{data.metadata.title}</h1>
		<div class="mt-2 flex items-center gap-3 text-sm text-fg-muted">
			<time>
				{new Date(data.metadata.date).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</time>
			{#if data.metadata.tags?.length > 0}
				<span>·</span>
				<div class="flex gap-2">
					{#each data.metadata.tags as tag}
						<span class="rounded bg-canvas-muted px-2 py-0.5 text-xs">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<div
		class="prose max-w-none prose-stone prose-invert prose-headings:font-serif prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
	>
		<data.content />
	</div>

	{#if data.metadata.external}
		<a
			href={data.metadata.external}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-fg-inverted transition-opacity hover:opacity-90"
		>
			Read the article
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		</a>
	{/if}
</article>
