<script>
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<footer class="my-20">
	<p class="text-center text-sm text-slate-500">
	  Copyright © {new Date().getFullYear()} NutBolt. All rights reserved.
	</p>
	<p class="text-center text-xs text-slate-500 mt-1">
	  Made by <a
		href="https://nutbolt.xyz/about"
		target="_blank"
		rel="noopener"
		class="hover:underline">
		devs from nutbolt. 
	  </a>
	</p>
  </footer>
