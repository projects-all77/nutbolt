<script>
	import Container from '$lib/components/layout/container.svelte';
import Features from '$lib/components/layout/features.svelte';
import Button from '$lib/components/ui/button/button.svelte';
</script>
<Container><main class="grid place-items-center pb-8 pt-16 md:pb-24 md:pt-12 lg:grid-cols-2">
	<div class="hidden py-6 md:order-1 md:block"></div>
	<div>
		<h1 class="text-5xl font-bold lg:text-6xl lg:tracking-tight xl:text-7xl xl:tracking-tighter">
			Cyber Info and security
		</h1>
		<p class="mt-4 max-w-xl text-lg text-slate-600">
			Nutbolt is a starter for someone who want to understand cybersecurity.<wbr /> Let us know
			if you want a help in cybersecurity front. We have tools and solutions for you to keep your websites secure.
		</p>
		<div class="mt-6 flex flex-col gap-3 sm:flex-row">
			<Button
				href="/blog"
				target="_blank"
				class="flex items-center justify-center gap-1"
				rel="noopener"
			>
				Blogs
			</Button>
			<Button
				style="outline"
				rel="noopener"
				href="/about"
				class="flex items-center justify-center gap-1"
				target="_blank"
			>
				About
			</Button>
		</div>
	</div>
</main>

<!-- <Features></Features> -->

<!-- 
<div class="mt-24">
  <h2 class="text-center text-slate-500">Works with your technologies</h2>
  <div class="flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap">

Icons
ICONS
  </div>
</div> -->


<div
  class="bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
  <h2 class="text-white text-4xl md:text-6xl tracking-tight">
    Scan your websites.
  </h2>
  <p class="text-slate-400 mt-4 text-lg md:text-xl">
    Scan your website for any cyber vulnerabilities.
  </p>
  <div class="flex mt-5">
    <Button href="/security-scan" style="inverted">Get Started</Button>
  </div>
</div>
</Container>

