<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Wilson Wilson</title>
</svelte:head>

<!-- Bio -->
<div class="mt-8 space-y-4 text-fg">
	<p>I'm Wilson Wilson, a 21-year old indie-hacker, language learner and guitarist.</p>
	<p>
		I'm currently building <a href="https://ferndesk.com" class="text-primary hover:underline"
			>Ferndesk</a
		>, a help center that automatically keeps itself up to date using context around your
		entire product (your support tickets, code changes, changelog etc).
	</p>
	<p>
		I'm also the cofounder of <a href="https://senja.io" class="text-primary hover:underline"
			>Senja</a
		>. A testimonial collection tool that makes collecting, managing and sharing testimonials
		easy. I've been building it for 3.5 years with my cofounder
		<a href="https://twitter.com/ollygaspar" class="text-primary hover:underline">Olly</a> (currently
		at $800K+ ARR).
	</p>
</div>

<!-- Social Links -->
<div class="mt-4 flex gap-2 text-sm">
	<a href="https://twitter.com/euboid" class="text-primary hover:underline">Twitter</a>
	<span class="text-fg-muted">•</span>
	<a href="https://linkedin.com/in/euboid" class="text-primary hover:underline">LinkedIn</a>
	<span class="text-fg-muted">•</span>
	<a href="https://github.com/wilsonowilson" class="text-primary hover:underline">Github</a>
</div>

<!-- Recent Articles -->
<section class="mt-12">
	<h2 class="font-serif text-xl font-bold text-fg">Recent articles</h2>
	<ul class="mt-4 space-y-3">
		{#each data.posts as post}
			<li>
				<a href="/articles/{post.slug}" class="group block">
					<span class="text-fg group-hover:text-primary">{post.title}</span>
					<time class="ml-2 text-sm text-fg-muted">
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</time>
				</a>
			</li>
		{/each}
	</ul>
</section>
