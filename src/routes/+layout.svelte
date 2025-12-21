<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-canvas px-4">
	<main class="mx-auto max-w-176 border-x border-line-subtle bg-canvas pb-12">
		<!-- Header Image -->
		<div class="relative">
			<img
				src="/images/pixel-art.png"
				alt="Pixel art landscape"
				class="h-44 w-full object-cover object-bottom"
			/>
			<!-- Profile Picture -->
			<a href="/">
				<img
					src="/images/avatar.jpeg"
					alt="Wilson Wilson"
					class="absolute -bottom-10 left-2 h-24 w-24 rounded-full border-4 border-canvas object-cover sm:left-10"
				/>
			</a>
		</div>

		<div class="mt-16 px-4 sm:px-12">
			<!-- Name and Nav -->
			<div>
				<a href="/">
					<h1 class="font-serif text-3xl font-bold text-fg">Wilson Wilson</h1>
				</a>
				<nav class="mt-2 flex gap-4 text-sm">
					<a
						href="/"
						class={page.url.pathname === '/' ? 'text-primary' : 'text-fg-secondary hover:text-fg'}
						>About</a
					>
					<a
						href="/articles"
						class={page.url.pathname.startsWith('/articles')
							? 'text-primary'
							: 'text-fg-secondary hover:text-fg'}>Blog</a
					>
					<a href="https://ferndesk.com" target="_blank" class="text-fg-secondary hover:text-fg"
						>Current</a
					>
					<a href="mailto:hello@wilsonwilson.dev" class={'text-fg-secondary hover:text-fg'}
						>Contact</a
					>
				</nav>
			</div>
		</div>
		<!-- <hr class="mt-12 border-t border-dashed border-line-subtle" /> -->

		<div class="mt-12 px-4 sm:px-12">
			{@render children()}
		</div>
	</main>
</div>
