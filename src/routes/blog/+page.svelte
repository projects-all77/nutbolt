<script>
	import SectionHead from "$lib/components/layout/section-head.svelte";
    export let data;
    console.log(data);

	const publishedBlogEntries = [
		{
			slug: 'how-global-malware-incidents-transformed-cybersecurity',
			data: {
				image: {
					src: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?&fit=crop&w=430&h=240',
					alt: ''
				},
				category: 'blog',
				author: 'Abhijit',
				title: 'How Global Malware Incidents Transformed Cybersecurity',
				publishDate: 'Wed nov 09 2022'
			}
		},
        {
			slug: 'how-global-malware-incidents-transformed-cybersecurity',
			data: {
				image: {
					src: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?&fit=crop&w=430&h=240',
					alt: ''
				},
				category: 'blog',
				author: 'Abhijit',
				title: 'How Global Malware Incidents Transformed Cybersecurity',
				publishDate: 'Wed nov 09 2022'
			}
		},
        {
			slug: 'how-global-malware-incidents-transformed-cybersecurity',
			data: {
				image: {
					src: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?&fit=crop&w=430&h=240',
					alt: ''
				},
				category: 'blog',
				author: 'Abhijit',
				title: 'How Global Malware Incidents Transformed Cybersecurity',
				publishDate: 'Wed nov 09 2022'
			}
		},
        {
			slug: 'how-global-malware-incidents-transformed-cybersecurity',
			data: {
				image: {
					src: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?&fit=crop&w=430&h=240',
					alt: ''
				},
				category: 'blog',
				author: 'Abhijit',
				title: 'How Global Malware Incidents Transformed Cybersecurity',
				publishDate: 'Wed nov 09 2022'
			}
		},
        {
			slug: 'how-global-malware-incidents-transformed-cybersecurity',
			data: {
				image: {
					src: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?&fit=crop&w=430&h=240',
					alt: ''
				},
				category: 'blog',
				author: 'Abhijit',
				title: 'How Global Malware Incidents Transformed Cybersecurity',
				publishDate: 'Wed nov 09 2022'
			}
		}
	];
</script>

<SectionHead>
    <span slot="title">Blogs</span>
    <span slot="desc">Cyber events going around the world and thoughts going on our mind.</span>
    
</SectionHead>
<main class="mt-16">
    <div>
        <h1>Data from JSON File</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
	<ul class="mx-auto grid max-w-4xl gap-16">
		{#each publishedBlogEntries as blogPostEntry}
			<li>
				<a href={`/blog/${blogPostEntry.slug}`}>
					<div class="grid items-center gap-5 md:grid-cols-2 md:gap-10">
                        <picture class="w-full rounded-md bg-white object-cover object-center">
                            <source media="(max-width: 800px) 100vw, 800px" srcset={blogPostEntry.data.image.src}>
                            <source media="(max-width: 800px) 100vw, 800px" srcset={blogPostEntry.data.image.src}>
                            <img src={blogPostEntry.data.image.src} alt={blogPostEntry.data.image.alt}>
                          </picture>
						<div>
							<span class="text-sm font-medium uppercase tracking-wider text-blue-400">
								{blogPostEntry.data.category}
							</span>

							<h2 class="mt-1 text-3xl font-semibold leading-snug tracking-tight">
								{blogPostEntry.data.title}
							</h2>

							<div class="mt-3 flex gap-2">
								<span class="text-gray-400">
									{blogPostEntry.data.author}
								</span>
								<span class="text-gray-400">• </span>
								<time class="text-gray-400" datetime={blogPostEntry.data.publishDate}>
									{blogPostEntry.data.publishDate}
								</time>
							</div>
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</main>
