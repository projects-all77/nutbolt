<script>
const features = [
  {
    title: "Validate your website online free",
    description:
      "Scan your website for any cybersecurity vunrebalities",
    icon: "bx:bxs-briefcase",
  },
//   {
//     title: "100% Static HTML, No JS",
//     description:
//       "Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.",
//     icon: "bx:bxs-window-alt",
//   },
//   {
//     title: "On-Demand Components",
//     description:
//       "Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.  ",
//     icon: "bx:bxs-data",
//   },
//   {
//     title: "Broad Integration",
//     description:
//       "Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.",
//     icon: "bx:bxs-bot",
//   },
//   {
//     title: "SEO Enabled",
//     description:
//       "Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!",
//     icon: "bx:bxs-file-find",
//   },
//   {
//     title: "Community",
//     description:
//       "Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.",
//     icon: "bx:bxs-user",
//   },
];
</script>


<div class="mt-16 md:mt-0">
  <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
    Everything you need to know our tools
  </h2>
  <p class="text-lg mt-4 text-slate-600">
    NutBolt comes batteries included. It takes the best parts of state-of-the-art
    tools and adds its own innovations.
  </p>
</div>

<div class="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
    {#each features as item}
    <div class="flex gap-4 items-start">
        <div class="mt-1 bg-black rounded-full  p-2 w-8 h-8 shrink-0">
          icon
        </div>
        <div>
          <h3 class="font-semibold text-lg">{item.title}</h3>{" "}
          <p class="text-slate-500 mt-2 leading-relaxed">{item.description}</p>
        </div>
      </div>    
    {/each}  
    
</div>