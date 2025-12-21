<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} - Wilson Wilson</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<article class="mx-auto max-w-2xl px-6 py-12">
	<header class="mb-8">
		<h1 class="font-serif text-3xl font-bold text-fg">{data.metadata.title}</h1>
		<time class="mt-2 block text-sm text-fg-muted">
			{new Date(data.metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
		</time>
	</header>

	<div class="prose prose-stone max-w-none">
		<data.content />
	</div>
</article>
