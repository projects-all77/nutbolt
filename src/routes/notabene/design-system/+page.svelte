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
</script>

<svelte:head>
  <title>Notabene Design System</title>
  <meta name="description" content="A comprehensive design system for readable, accessible digital experiences." />
</svelte:head>

<div class="min-h-screen bg-surface-primary">
  <Container size="lg">
    <div class="py-12 space-y-16">
      
      <!-- Header -->
      <header class="text-center">
        <Typography variant="h1" className="mb-4">
          Notabene Design System
        </Typography>
        <Typography variant="lead" color="secondary" className="max-w-2xl mx-auto">
          A text-focused design system prioritizing readability, accessibility, and user experience.
        </Typography>
      </header>

      <!-- Typography Section -->
      <section>
        <Typography variant="h2" className="mb-8">Typography</Typography>
        
        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Headings</Typography>
          <div class="space-y-4">
            <Typography variant="h1">Heading 1 - The quick brown fox</Typography>
            <Typography variant="h2">Heading 2 - The quick brown fox</Typography>
            <Typography variant="h3">Heading 3 - The quick brown fox</Typography>
            <Typography variant="h4">Heading 4 - The quick brown fox</Typography>
            <Typography variant="h5">Heading 5 - The quick brown fox</Typography>
            <Typography variant="h6">Heading 6 - The quick brown fox</Typography>
          </div>
        </Card>

        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Body Text</Typography>
          <div class="space-y-4">
            <Typography variant="lead">
              Lead text: This is larger body text used for introductions or important paragraphs that need more emphasis.
            </Typography>
            <Typography variant="body">
              Body text: This is the standard body text used for most content. It's optimized for readability with proper line height and letter spacing.
            </Typography>
            <Typography variant="small">
              Small text: Used for captions, metadata, or less important information.
            </Typography>
            <Typography variant="caption">
              Caption text: The smallest text size, used for fine print or micro-content.
            </Typography>
          </div>
        </Card>

        <Card variant="outlined" padding="lg">
          <Typography variant="h3" className="mb-6">Colors</Typography>
          <div class="space-y-3">
            <Typography variant="body" color="primary">Primary text color</Typography>
            <Typography variant="body" color="secondary">Secondary text color</Typography>
            <Typography variant="body" color="tertiary">Tertiary text color</Typography>
            <Typography variant="body" color="accent">Accent text color</Typography>
            <Typography variant="body" color="success">Success text color</Typography>
            <Typography variant="body" color="warning">Warning text color</Typography>
            <Typography variant="body" color="error">Error text color</Typography>
          </div>
        </Card>
      </section>

      <!-- Buttons Section -->
      <section>
        <Typography variant="h2" className="mb-8">Buttons</Typography>
        
        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Variants</Typography>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>

        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Sizes</Typography>
          <div class="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="base">Base</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </Card>

        <Card variant="outlined" padding="lg">
          <Typography variant="h3" className="mb-6">States</Typography>
          <div class="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </Card>
      </section>

      <!-- Cards Section -->
      <section>
        <Typography variant="h2" className="mb-8">Cards</Typography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default">
            <Typography variant="h4" className="mb-2">Default Card</Typography>
            <Typography variant="body" color="secondary">
              Basic card with default styling and padding.
            </Typography>
          </Card>
          
          <Card variant="elevated">
            <Typography variant="h4" className="mb-2">Elevated Card</Typography>
            <Typography variant="body" color="secondary">
              Card with shadow for visual elevation.
            </Typography>
          </Card>
          
          <Card variant="outlined">
            <Typography variant="h4" className="mb-2">Outlined Card</Typography>
            <Typography variant="body" color="secondary">
              Card with visible border outline.
            </Typography>
          </Card>
          
          <Card variant="filled">
            <Typography variant="h4" className="mb-2">Filled Card</Typography>
            <Typography variant="body" color="secondary">
              Card with background fill color.
            </Typography>
          </Card>
          
          <Card variant="default" hoverable>
            <Typography variant="h4" className="mb-2">Hoverable Card</Typography>
            <Typography variant="body" color="secondary">
              Card with hover effect animation.
            </Typography>
          </Card>
          
          <Card variant="default" clickable>
            <Typography variant="h4" className="mb-2">Clickable Card</Typography>
            <Typography variant="body" color="secondary">
              Card with clickable interaction state.
            </Typography>
          </Card>
        </div>
      </section>

      <!-- Badges Section -->
      <section>
        <Typography variant="h2" className="mb-8">Badges</Typography>
        
        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Variants</Typography>
          <div class="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Card>

        <Card variant="outlined" padding="lg">
          <Typography variant="h3" className="mb-6">Sizes</Typography>
          <div class="flex flex-wrap items-center gap-3">
            <Badge size="sm">Small</Badge>
            <Badge size="base">Base</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </Card>
      </section>

      <!-- Links Section -->
      <section>
        <Typography variant="h2" className="mb-8">Links</Typography>
        
        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Variants</Typography>
          <div class="space-y-3">
            <div><Link href="#" variant="default">Default link</Link></div>
            <div><Link href="#" variant="muted">Muted link</Link></div>
            <div><Link href="#" variant="primary">Primary link</Link></div>
            <div><Link href="#" variant="subtle">Subtle link</Link></div>
          </div>
        </Card>

        <Card variant="outlined" padding="lg" className="mb-8">
          <Typography variant="h3" className="mb-6">Underline Styles</Typography>
          <div class="space-y-3">
            <div><Link href="#" underline="none">No underline</Link></div>
            <div><Link href="#" underline="always">Always underlined</Link></div>
            <div><Link href="#" underline="hover">Hover underline</Link></div>
            <div><Link href="#" underline="focus">Focus underline</Link></div>
          </div>
        </Card>

        <Card variant="outlined" padding="lg">
          <Typography variant="h3" className="mb-6">External Links</Typography>
          <div class="space-y-3">
            <div><Link href="#" external>External link with icon</Link></div>
            <div><Link href="#" external variant="muted">Muted external link</Link></div>
          </div>
        </Card>
      </section>

      <!-- Article Section -->

      <section>
        <Typography variant="h2" className="mb-8">Article Content</Typography>
        
        <Card variant="outlined" padding="lg">
          <Article>
            <h3>Sample Article Content</h3>
            <p>This is how article content appears with proper prose styling. The article component applies consistent typography, spacing, and formatting to create an optimal reading experience.</p>
            
            <h4>Features Include:</h4>
            <ul>
              <li>Optimized line height for readability</li>
              <li>Proper heading hierarchy</li>
              <li>Consistent link styling</li>
              <li>Balanced spacing between elements</li>
            </ul>
            
            <blockquote>
              This is a blockquote that demonstrates how quoted content appears within the article styling system.
            </blockquote>
            
            <p>Code snippets are also properly styled: <code>const example = 'inline code';</code></p>
            
            <pre><code>// Block code example
</code></pre>
            
            <p>The article component ensures that all content maintains readability and accessibility standards while providing a consistent visual hierarchy.</p>
          </Article>
        </Card>
      </section>

      <!-- Color Palette Section -->
      <section>
        <Typography variant="h2" className="mb-8">Color Palette</Typography>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Notabene Colors -->
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-6">Notabene Scale</Typography>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-50 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">50</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-100 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">100</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-200 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">200</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-300 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">300</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-400 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">400</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-500 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">500</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-600 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">600</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-700 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">700</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-800 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">800</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-notabene-900 border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">900</Typography>
              </div>
            </div>
          </Card>

          <!-- Content Colors -->
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-6">Content Colors</Typography>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-primary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Primary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-secondary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Secondary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-tertiary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Tertiary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-accent border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Accent</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-success border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Success</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-warning border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Warning</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-content-error border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Error</Typography>
              </div>
            </div>
          </Card>

          <!-- Surface Colors -->
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-6">Surface Colors</Typography>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-surface-primary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Primary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-surface-secondary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Secondary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-surface-tertiary border border-notabene-200 rounded"></div>
                <Typography variant="small" color="secondary">Tertiary</Typography>
              </div>
              <div class="flex items-center justify-between">
                <div class="w-12 h-8 bg-surface-elevated border border-notabene-200 rounded shadow-sm"></div>
                <Typography variant="small" color="secondary">Elevated</Typography>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- Accessibility Section -->
      <section>
        <Typography variant="h2" className="mb-8">Accessibility Features</Typography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-4">Typography</Typography>
            <ul class="space-y-2 text-content-secondary">
              <li>• Minimum 4.5:1 contrast ratio</li>
              <li>• Optimized line height (1.5-1.6)</li>
              <li>• Readable font families</li>
              <li>• Scalable rem units</li>
              <li>• Proper letter spacing</li>
            </ul>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-4">Interactive Elements</Typography>
            <ul class="space-y-2 text-content-secondary">
              <li>• Focus indicators</li>
              <li>• Keyboard navigation</li>
              <li>• ARIA attributes</li>
              <li>• Semantic HTML</li>
              <li>• Touch targets (44px min)</li>
            </ul>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-4">Color & Contrast</Typography>
            <ul class="space-y-2 text-content-secondary">
              <li>• WCAG AA compliant</li>
              <li>• Color-blind friendly</li>
              <li>• Semantic color usage</li>
              <li>• High contrast mode support</li>
              <li>• Reduced motion options</li>
            </ul>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <Typography variant="h3" className="mb-4">Content Structure</Typography>
            <ul class="space-y-2 text-content-secondary">
              <li>• Logical heading hierarchy</li>
              <li>• Skip links</li>
              <li>• Descriptive link text</li>
              <li>• Alternative text</li>
              <li>• Screen reader friendly</li>
            </ul>
          </Card>
        </div>
      </section>

    </div>
  </Container>
</div>