<script>
  import { 
    Typography, 
    Button, 
    Card, 
    Badge, 
    Container, 
    Separator, 
    Link, 
    Article 
  } from '$lib/components/notabene';
  
  let posts = [
    {
      id: 1,
      title: "The Art of Readable Typography in Digital Design",
      excerpt: "Exploring the fundamental principles of typography that make content accessible and engaging for all readers.",
      content: `# The Art of Readable Typography in Digital Design

Typography is the backbone of digital communication. When done well, it becomes invisible to the reader—allowing them to focus entirely on the content. When done poorly, it becomes a barrier to understanding.

## The Science of Readability

Research shows that optimal line length sits between 50-75 characters per line. This isn't arbitrary—it's based on how our eyes naturally track across text. Too short, and readers tire from constantly jumping to new lines. Too long, and they lose their place.

### Key Principles

1. **Hierarchy**: Use size, weight, and spacing to create clear information hierarchy
2. **Contrast**: Ensure sufficient contrast between text and background
3. **Spacing**: Give your text room to breathe with proper line height and margins
4. **Consistency**: Maintain consistent spacing and sizing throughout

> "Typography is the craft of endowing human language with a durable visual form." — Robert Bringhurst

## Accessibility First

Good typography isn't just about aesthetics—it's about accessibility. Consider users with dyslexia, low vision, or other reading difficulties. Your design choices can make the difference between inclusion and exclusion.

### Best Practices

- Use relative units (rem, em) instead of fixed pixels
- Maintain at least 1.5x line height for body text
- Ensure color contrast meets WCAG AA standards (4.5:1 for normal text)
- Choose fonts that distinguish between similar characters (like 'l' and 'I')

The goal isn't to create the most beautiful typography—it's to create the most *effective* typography. Beauty emerges from function, not the other way around.`,
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["design", "typography", "accessibility"],
      category: "Design"
    },
    {
      id: 2,
      title: "Building Sustainable Design Systems",
      excerpt: "How to create design systems that scale with your organization and stand the test of time.",
      content: `# Building Sustainable Design Systems

A design system is more than a collection of components—it's a living language that enables teams to build consistent, accessible experiences at scale.

## The Foundation

Start with the basics: colors, typography, and spacing. These form the foundation everything else builds upon.

### Color Strategy

Choose colors not just for their aesthetic appeal, but for their functional properties:

- **Semantic colors**: Success, warning, error states
- **Neutral palette**: For backgrounds, borders, and text
- **Brand colors**: Used sparingly for key actions and identity

## Component Philosophy

Each component should solve a specific problem and do it well. Avoid the temptation to create overly complex components that try to handle every possible use case.

### Guidelines for Components

1. **Single responsibility**: Each component should have one clear purpose
2. **Composability**: Components should work well together
3. **Accessibility**: Built-in ARIA attributes and keyboard navigation
4. **Documentation**: Clear examples and usage guidelines

The best design systems are the ones that teams actually use. Focus on solving real problems rather than creating theoretical perfection.`,
      author: "Marcus Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["design-systems", "development", "teamwork"],
      category: "Development"
    },
    {
      id: 3,
      title: "The Psychology of Reading: How Layout Affects Comprehension",
      excerpt: "Understanding how readers process information and designing layouts that support natural reading patterns.",
      content: `# The Psychology of Reading: How Layout Affects Comprehension

Reading isn't just about recognizing words—it's a complex cognitive process that involves pattern recognition, memory, and attention. Understanding this process helps us design better reading experiences.

## How We Read

Contrary to popular belief, we don't read letter by letter or even word by word. Instead, we:

1. **Scan** for familiar patterns
2. **Skip** predictable words
3. **Focus** on content words over function words
4. **Predict** what comes next based on context

## The F-Pattern

Eye-tracking studies reveal that readers follow predictable patterns when scanning content:

- **First**, they read across the top of the page
- **Then**, they scan down the left side
- **Finally**, they read across again, usually shorter than the first line

This creates an F-shaped pattern that informs how we should structure our layouts.

### Design Implications

- Place important information in the first two paragraphs
- Use meaningful headings and subheadings
- Front-load sentences with important information
- Break up long paragraphs with white space

## Cognitive Load

Every design decision either reduces or increases cognitive load. Our goal is to minimize the mental effort required to process information.

### Reducing Cognitive Load

- **Chunking**: Group related information together
- **White space**: Give the brain time to process
- **Consistency**: Reduce the need to learn new patterns
- **Hierarchy**: Make the structure obvious

Remember: readers are not on your page to admire your design. They're there to accomplish a task or learn something. Your job is to get out of their way.`,
      author: "Dr. Elena Vasquez",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["psychology", "ux", "reading"],
      category: "Research"
    }
  ];
  
  let selectedPost = posts[0];
  let showFullPost = false;
  
  function selectPost(post) {
    selectedPost = post;
    showFullPost = true;
  }
  
  function backToList() {
    showFullPost = false;
  }
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Notabene - A Blog About Digital Reading</title>
  <meta name="description" content="Exploring the art and science of readable digital design through typography, layout, and user experience." />
</svelte:head>

<div class="min-h-screen bg-surface-primary">
  <!-- Header -->
  <header class="bg-surface-primary border-b border-notabene-200 sticky top-0 z-10 backdrop-blur-sm bg-surface-primary/80">
    <Container size="lg">
      <div class="flex items-center justify-between py-6">
        <div class="flex items-center space-x-8">
          <Typography variant="h3" element="h1" className="!mb-0">
            <Link href="/" variant="primary" underline="none">notabene</Link>
          </Typography>
          <nav class="hidden md:flex space-x-6">
            <Link href="#" variant="muted">Articles</Link>
            <Link href="#" variant="muted">Categories</Link>
            <Link href="#" variant="muted">About</Link>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="sm">Subscribe</Button>
          <Button variant="outline" size="sm">Search</Button>
        </div>
      </div>
    </Container>
  </header>

  <main>
    {#if !showFullPost}
      <!-- Blog List View -->
      <Container size="lg">
        <div class="py-12">
          <!-- Hero Section -->
          <div class="text-center mb-16">
            <Typography variant="h1" className="mb-6">
              Thoughts on Digital Reading
            </Typography>
            <Typography variant="lead" color="secondary" className="max-w-2xl mx-auto">
              Exploring the art and science of readable digital design through typography, layout, and user experience.
            </Typography>
          </div>

          <!-- Featured Post -->
          <Card variant="elevated" className="mb-12 overflow-hidden">
            <div class="p-8">
              <Badge variant="primary" className="mb-4">Featured</Badge>
              <Typography variant="h2" className="mb-4">
                <Link href="#" on:click={() => selectPost(posts[0])} variant="primary" underline="none">
                  {posts[0].title}
                </Link>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                {posts[0].excerpt}
              </Typography>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <Typography variant="small" color="secondary">
                    By {posts[0].author}
                  </Typography>
                  <Separator orientation="vertical" className="h-4" />
                  <Typography variant="small" color="secondary">
                    {formatDate(posts[0].date)}
                  </Typography>
                  <Separator orientation="vertical" className="h-4" />
                  <Typography variant="small" color="secondary">
                    {posts[0].readTime}
                  </Typography>
                </div>
                <Button variant="link" on:click={() => selectPost(posts[0])}>
                  Read More →
                </Button>
              </div>
            </div>
          </Card>

          <!-- Post Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each posts.slice(1) as post}
              <Card variant="outlined" hoverable className="group">
                <div class="p-6">
                  <div class="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary" size="sm">{post.category}</Badge>
                    <Typography variant="caption" color="tertiary">
                      {formatDate(post.date)}
                    </Typography>
                  </div>
                  
                  <Typography variant="h4" className="mb-3 group-hover:text-content-accent transition-colors">
                    <Link href="#" on:click={() => selectPost(post)} variant="primary" underline="none">
                      {post.title}
                    </Link>
                  </Typography>
                  
                  <Typography variant="body" color="secondary" className="mb-4">
                    {post.excerpt}
                  </Typography>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-2">
                      {#each post.tags as tag}
                        <Badge variant="outline" size="sm">#{tag}</Badge>
                      {/each}
                    </div>
                    <Typography variant="small" color="tertiary">
                      {post.readTime}
                    </Typography>
                  </div>
                </div>
              </Card>
            {/each}
          </div>

          <!-- Newsletter Signup -->
          <Card variant="filled" className="mt-16">
            <div class="p-8 text-center">
              <Typography variant="h3" className="mb-4">
                Stay Updated
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6 max-w-md mx-auto">
                Get the latest articles on digital reading, typography, and design delivered to your inbox.
              </Typography>
              <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  class="flex-1 px-4 py-2 border border-notabene-300 rounded-md focus:outline-none focus:ring-2 focus:ring-content-accent focus:border-transparent"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    {:else}
      <!-- Full Post View -->
      <Container size="prose">
        <div class="py-12">
          <!-- Back Button -->
          <div class="mb-8">
            <Button variant="ghost" on:click={backToList}>
              ← Back to Articles
            </Button>
          </div>

          <!-- Post Header -->
          <header class="mb-12">
            <div class="flex items-center space-x-3 mb-6">
              <Badge variant="primary">{selectedPost.category}</Badge>
              <Typography variant="small" color="secondary">
                {formatDate(selectedPost.date)}
              </Typography>
              <Separator orientation="vertical" className="h-4" />
              <Typography variant="small" color="secondary">
                {selectedPost.readTime}
              </Typography>
            </div>
            
            <Typography variant="h1" className="mb-6">
              {selectedPost.title}
            </Typography>
            
            <Typography variant="lead" color="secondary" className="mb-8">
              {selectedPost.excerpt}
            </Typography>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <Typography variant="body" color="secondary">
                  By <strong>{selectedPost.author}</strong>
                </Typography>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm">Share</Button>
                <Button variant="outline" size="sm">Bookmark</Button>
              </div>
            </div>
          </header>

          <Separator className="mb-12" />

          <!-- Post Content -->
          <Article>
            {@html selectedPost.content.replace(/\n/g, '<br>')}
          </Article>

          <Separator className="my-12" />

          <!-- Post Footer -->
          <footer class="space-y-8">
            <!-- Tags -->
            <div>
              <Typography variant="body" color="secondary" className="mb-4">
                Tags:
              </Typography>
              <div class="flex flex-wrap gap-2">
                {#each selectedPost.tags as tag}
                  <Badge variant="outline">#{tag}</Badge>
                {/each}
              </div>
            </div>

            <!-- Author Bio -->
            <Card variant="filled">
              <div class="p-6">
                <Typography variant="h5" className="mb-3">
                  About {selectedPost.author}
                </Typography>
                <Typography variant="body" color="secondary">
                  {selectedPost.author} is a design researcher and writer focused on digital reading experiences and accessible design practices.
                </Typography>
              </div>
            </Card>

            <!-- Related Posts -->
            <div>
              <Typography variant="h4" className="mb-6">
                Related Articles
              </Typography>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each posts.filter(p => p.id !== selectedPost.id).slice(0, 2) as post}
                  <Card variant="outlined" hoverable>
                    <div class="p-4">
                      <Typography variant="h6" className="mb-2">
                        <Link href="#" on:click={() => selectPost(post)} variant="primary" underline="none">
                          {post.title}
                        </Link>
                      </Typography>
                      <Typography variant="small" color="secondary">
                        {post.readTime} • {formatDate(post.date)}
                      </Typography>
                    </div>
                  </Card>
                {/each}
              </div>
            </div>
          </footer>
        </div>
      </Container>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="bg-surface-secondary border-t border-notabene-200 mt-16">
    <Container size="lg">
      <div class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Typography variant="h6" className="mb-4">notabene</Typography>
            <Typography variant="small" color="secondary">
              Thoughts on digital reading and accessible design.
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Categories</Typography>
            <div class="space-y-2">
              <Link href="#" variant="muted">Design</Link>
              <Link href="#" variant="muted">Development</Link>
              <Link href="#" variant="muted">Research</Link>
              <Link href="#" variant="muted">Accessibility</Link>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Connect</Typography>
            <div class="space-y-2">
              <Link href="#" variant="muted" external>Twitter</Link>
              <Link href="#" variant="muted" external>LinkedIn</Link>
              <Link href="#" variant="muted" external>GitHub</Link>
              <Link href="#" variant="muted">RSS</Link>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Subscribe</Typography>
            <Typography variant="small" color="secondary" className="mb-4">
              Get weekly insights on digital reading.
            </Typography>
            <Button variant="outline" size="sm">Subscribe</Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div class="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="small" color="tertiary">
            © 2024 Notabene. All rights reserved.
          </Typography>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" variant="muted">Privacy</Link>
            <Link href="#" variant="muted">Terms</Link>
            <Link href="#" variant="muted">Contact</Link>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</div>