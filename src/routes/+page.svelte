<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Wilson Wilson</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-6 py-12">
	<!-- Header Image -->
	<div class="relative">
		<img
			src="/header.jpg"
			alt="Landscape painting"
			class="h-44 w-full rounded-lg object-cover"
		/>
		<!-- Profile Picture -->
		<img
			src="/profile.jpg"
			alt="Wilson Wilson"
			class="absolute -bottom-8 left-0 h-24 w-24 rounded-full border-4 border-canvas object-cover"
		/>
	</div>

	<!-- Name and Nav -->
	<div class="mt-12">
		<h1 class="font-serif text-2xl font-bold text-fg">Wilson Wilson</h1>
		<nav class="mt-2 flex gap-4 text-sm">
			<a href="/" class="text-violet-600">About</a>
			<a href="/blog" class="text-fg-secondary hover:text-fg">Blog</a>
			<a href="/current" class="text-fg-secondary hover:text-fg">Current</a>
			<a href="/contact" class="text-fg-secondary hover:text-fg">Contact</a>
		</nav>
	</div>

	<!-- Bio -->
	<div class="mt-8 space-y-4 text-fg">
		<p>
			I'm Wilson Wilson, a 21-year old indie-hacker, language learner and guitarist.
		</p>
		<p>
			I'm currently building <a href="https://ferndesk.com" class="text-violet-600 hover:underline">Ferndesk</a>, a help center that automatically keeps itself up to date using context around your entire product (your support tickets, code changes, changelog etc).
		</p>
		<p>
			I'm also the cofounder of <a href="https://senja.io" class="text-violet-600 hover:underline">Senja</a>. A testimonial collection tool that makes collecting, managing and sharing testimonials easy. I've been building it for 3.5 years with my cofounder <a href="https://twitter.com/ollygaspar" class="text-violet-600 hover:underline">Olly</a> (currently at $800K+ ARR).
		</p>
	</div>

	<!-- Social Links -->
	<div class="mt-4 flex gap-2 text-sm">
		<a href="https://twitter.com/wilsonwilsondev" class="text-violet-600 hover:underline">Twitter</a>
		<span class="text-fg-muted">•</span>
		<a href="https://linkedin.com/in/wilsonwilson" class="text-violet-600 hover:underline">LinkedIn</a>
		<span class="text-fg-muted">•</span>
		<a href="https://github.com/wilsonwilson" class="text-violet-600 hover:underline">Github</a>
	</div>

	<!-- Recent Articles -->
	<section class="mt-12">
		<h2 class="font-serif text-xl font-bold text-fg">Recent articles</h2>
		<ul class="mt-4 space-y-3">
			{#each data.posts as post}
				<li>
					<a href="/blog/{post.slug}" class="group block">
						<span class="text-fg group-hover:text-violet-600">{post.title}</span>
						<time class="ml-2 text-sm text-fg-muted">
							{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
						</time>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>
