<script>
	import { onMount } from 'svelte';
	import Dexie from 'dexie';
	import { page } from '$app/stores'; // For SvelteKit metadata
  
	// Meta tags management
	const META_DEFAULTS = {
	  title: 'Top 10 Cars Sold in India - January 2025 | Auto Sales Statistics',
	  description: 'Discover the most popular cars in India with detailed sales statistics, growth rates, and pricing information. Updated monthly with latest market trends.',
	  keywords: 'car sales india, top selling cars, auto sales statistics, indian automobile market, car rankings'
	};
  
	// Schema.org structured data
	const structuredData = {
	  "@context": "https://schema.org",
	  "@type": "ItemList",
	  "name": "Top 10 Cars Sold in India - January 2025",
	  "description": "Monthly ranking of best-selling cars in India with detailed sales statistics",
	  "itemListOrder": "Descending",
	  "numberOfItems": 10,
	  "itemListElement": []
	};
  
	// Rest of the existing Dexie setup
	const db = new Dexie('carSalesDB');
	db.version(1).stores({
	  cars: '++id, rank, model, sales, yoyGrowth, price, bodyStyle, manufacturer, slug'
	});
  
	let searchQuery = '';
	let sortField = 'rank';
	let sortDirection = 'asc';
	let cars = [];
	let selectedFilter = 'all';
  
	// Generate SEO-friendly slugs
	function generateSlug(text) {
	  return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
	}
  
	// Enhanced data structure with SEO elements
	async function initializeData() {
	  const sampleData = [
		{
		  rank: 1,
		  model: "Maruti Suzuki Wagon R",
		  sales: 24078,
		  yoyGrowth: 35.6,
		  price: "5.54 - 7.42 Lakh",
		  bodyStyle: "Hatchback",
		  manufacturer: "Maruti Suzuki",
		  imageUrl: "/api/placeholder/200/150",
		  slug: "maruti-suzuki-wagon-r",
		  specs: {
			fuelType: "Petrol/CNG",
			transmission: "Manual/Automatic",
			mileage: "24.35 kmpl"
		  },
		  metaDescription: "Maruti Suzuki Wagon R sales statistics, pricing, and market performance in India. Compare growth rates and analyze market trends.",
		  altText: "Maruti Suzuki Wagon R - India's top-selling hatchback"
		},
		// ... more cars with similar structure
	  ];
  
	  // Update structured data
	  structuredData.itemListElement = sampleData.map((car, index) => ({
		"@type": "ListItem",
		"position": car.rank,
		"item": {
		  "@type": "Product",
		  "name": car.model,
		  "description": car.metaDescription,
		  "brand": {
			"@type": "Brand",
			"name": car.manufacturer
		  },
		  "offers": {
			"@type": "AggregateOffer",
			"priceCurrency": "INR",
			"priceRange": car.price
		  }
		}
	  }));
  
	  await db.cars.bulkPut(sampleData);
	  cars = await db.cars.toArray();
	}
  
	onMount(async () => {
	  await initializeData();
	});
  
	// SEO-friendly filtering and sorting
	$: filteredCars = cars
	  .filter(car => {
		const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
		  car.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = selectedFilter === 'all' || car.bodyStyle.toLowerCase() === selectedFilter;
		return matchesSearch && matchesFilter;
	  })
	  .sort((a, b) => {
		const modifier = sortDirection === 'asc' ? 1 : -1;
		if (sortField === 'sales' || sortField === 'yoyGrowth' || sortField === 'rank') {
		  return (a[sortField] - b[sortField]) * modifier;
		}
		return a[sortField].localeCompare(b[sortField]) * modifier;
	  });
  </script>
  
  <svelte:head>
	<title>{META_DEFAULTS.title}</title>
	<meta name="description" content={META_DEFAULTS.description} />
	<meta name="keywords" content={META_DEFAULTS.keywords} />
	
	<!-- Open Graph tags -->
	<meta property="og:title" content={META_DEFAULTS.title} />
	<meta property="og:description" content={META_DEFAULTS.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	
	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={META_DEFAULTS.title} />
	<meta name="twitter:description" content={META_DEFAULTS.description} />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	  {JSON.stringify(structuredData)}
	</script>
	
	<!-- Canonical URL -->
	<link rel="canonical" href={$page.url.href} />
  </svelte:head>
  
  <!-- Main content with semantic HTML -->
<main class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8 text-center">
	  Top 10 Cars Sold in India - January 2025
	</h1>
	
	<!-- Search and Filters -->
	<section aria-label="Search and Filters" class="flex flex-col md:flex-row gap-4 mb-6">
	  <div class="flex-1">
		<label for="car-search" class="sr-only">Search Cars</label>
		<input
		  id="car-search"
		  type="search"
		  bind:value={searchQuery}
		  placeholder="Search Cars"
		  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
		/>
	  </div>
	  
	  <div class="flex gap-4">
		<label for="car-type" class="sr-only">Filter by Type</label>
		<select
		  id="car-type"
		  bind:value={selectedFilter}
		  class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
		>
		  <option value="all">All Types</option>
		  <option value="suv">SUV</option>
		  <option value="hatchback">Hatchback</option>
		  <option value="sedan">Sedan</option>
		</select>
  
		<label for="sort-by" class="sr-only">Sort By</label>
		<select
		  id="sort-by"
		  bind:value={sortField}
		  class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
		>
		  <option value="rank">Sort by Rank</option>
		  <option value="sales">Sort by Sales</option>
		  <option value="yoyGrowth">Sort by Growth</option>
		</select>
	  </div>
	</section>
  
	<!-- Car List -->
	<section aria-label="Car Rankings" class="space-y-6">
	  {#each filteredCars as car (car.id)}
		<article 
		  class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
		  itemscope 
		  itemtype="https://schema.org/Product"
		>
		  <div class="flex flex-col md:flex-row">
			<!-- Rank and Image -->
			<div class="relative w-full md:w-64 h-48">
			  <div class="absolute top-2 left-2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
				{car.rank}
			  </div>
			  <img
				src={car.imageUrl}
				alt={car.altText}
				class="w-full h-full object-cover"
				itemprop="image"
				loading="lazy"
			  />
			</div>
  
			<!-- Details -->
			<div class="p-6 flex-1">
			  <div class="flex justify-between items-start">
				<div>
				  <h2 class="text-xl font-bold mb-2" itemprop="name">
					<a href="/cars/{car.slug}" class="hover:text-blue-600">
					  {car.model}
					</a>
				  </h2>
				  <p class="text-gray-600 mb-2">
					<span itemprop="category">{car.bodyStyle}</span> • 
					<span itemprop="offers" itemscope itemtype="https://schema.org/AggregateOffer">
					  <span itemprop="priceRange">{car.price}</span>
					</span>
				  </p>
				</div>
				<div class="text-right">
				  <p class="text-lg font-semibold">
					<span itemprop="sales">{car.sales.toLocaleString()}</span> Units Sold
				  </p>
				  <p class={car.yoyGrowth >= 0 ? "text-green-600" : "text-red-600"}>
					{car.yoyGrowth}% YoY Growth
				  </p>
				</div>
			  </div>
			  
			  <!-- Additional SEO-friendly content -->
			  <div class="mt-4">
				<dl class="grid grid-cols-2 gap-4 text-sm">
				  <div>
					<dt class="text-gray-600">Fuel Type:</dt>
					<dd itemprop="fuelType">{car.specs.fuelType}</dd>
				  </div>
				  <div>
					<dt class="text-gray-600">Transmission:</dt>
					<dd itemprop="transmission">{car.specs.transmission}</dd>
				  </div>
				  <div>
					<dt class="text-gray-600">Mileage:</dt>
					<dd itemprop="mileage">{car.specs.mileage}</dd>
				  </div>
				</dl>
			  </div>
			  
			  <div class="mt-4 flex justify-between items-center">
				<p class="text-sm text-gray-500">
				  Manufacturer: <span itemprop="manufacturer">{car.manufacturer}</span>
				</p>
				<a
				  href="/cars/{car.slug}"
				  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
				  rel="nofollow"
				>
				  View Details
				</a>
			  </div>
			</div>
		  </div>
		</article>
	  {/each}
	</section>
  
	<!-- Disclaimer -->
	<footer class="text-sm text-gray-500 mt-8 text-center">
	  <p>Sales numbers reflect units dispatched to dealers and may vary.</p>
	  <p>Last updated: January 2025</p>
	</footer>
  </main>
  
  <!-- Add sitemap generation -->
  <script context="module">
	export async function load({ page, fetch }) {
	  // Generate sitemap data
	  const sitemapData = {
		baseUrl: 'https://yourdomain.com',
		pages: [
		  {
			url: '/',
			lastMod: new Date().toISOString(),
			changeFreq: 'monthly',
			priority: 1.0
		  }
		]
	  };
	  
	  return {
		props: {
		  sitemapData
		}
	  };
	}
  </script>