# Notabene Design System

A text-focused design system prioritizing readability, accessibility, and user experience for blog and media applications.

## Philosophy

Notabene is built on the principle that **content comes first**. Every design decision serves the goal of making text more readable, accessible, and engaging. The system draws inspiration from traditional typography and modern web standards to create interfaces that get out of the reader's way.

## Core Principles

### 1. Readability First
- Optimal line lengths (50-75 characters)
- Generous line height (1.5-1.6 for body text)
- Proper contrast ratios (minimum 4.5:1)
- Hierarchy through size and weight, not color alone

### 2. Accessibility by Default
- WCAG AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators on all interactive elements

### 3. Progressive Enhancement
- Works without JavaScript
- Graceful degradation
- Mobile-first responsive design
- Fast loading and minimal CSS

### 4. Consistency
- Systematic spacing scale
- Consistent component APIs
- Predictable behavior patterns
- Unified visual language

## Design Tokens

### Colors

#### Notabene Scale (Neutral Grays)
```css
notabene-50:  #f8f9fa  /* Lightest gray */
notabene-100: #f1f3f4
notabene-200: #e8eaed  /* Borders, dividers */
notabene-300: #dadce0
notabene-400: #bdc1c6
notabene-500: #9aa0a6  /* Mid gray */
notabene-600: #80868b
notabene-700: #5f6368
notabene-800: #3c4043
notabene-900: #202124  /* Darkest gray */
notabene-950: #0d1117  /* Near black */
```

#### Content Colors (Semantic)
```css
content-primary:   #0d1117  /* Primary text */
content-secondary: #656d76  /* Secondary text */
content-tertiary:  #8b949e  /* Tertiary text */
content-inverse:   #ffffff  /* White text */
content-accent:    #0969da  /* Links, CTAs */
content-success:   #1a7f37  /* Success states */
content-warning:   #9a6700  /* Warning states */
content-error:     #d1242f  /* Error states */
```

#### Surface Colors
```css
surface-primary:   #ffffff  /* Main background */
surface-secondary: #f6f8fa  /* Card backgrounds */
surface-tertiary:  #f1f3f4  /* Subtle backgrounds */
surface-elevated:  #ffffff  /* Elevated cards */
surface-overlay:   rgba(0, 0, 0, 0.6)  /* Modal overlays */
```

### Typography

#### Font Families
- **Sans**: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Serif**: Charter, "Bitstream Charter", "Sitka Text", Cambria, serif
- **Mono**: "JetBrains Mono", Menlo, Monaco, Consolas, monospace

#### Type Scale
| Size | rem   | Usage |
|------|-------|-------|
| xs   | 0.75  | Captions, fine print |
| sm   | 0.875 | Small text, metadata |
| base | 1     | Body text |
| lg   | 1.125 | Large body text |
| xl   | 1.25  | Subheadings |
| 2xl  | 1.5   | H6 |
| 3xl  | 1.875 | H5 |
| 4xl  | 2.25  | H4 |
| 5xl  | 3     | H3 |
| 6xl  | 3.75  | H2 |
| 7xl  | 4.5   | H1 |

### Spacing Scale

The spacing scale follows a consistent rhythm based on 0.25rem (4px) increments:

```css
1:   0.25rem  (4px)
2:   0.5rem   (8px)
3:   0.75rem  (12px)
4:   1rem     (16px)  /* Base unit */
6:   1.5rem   (24px)
8:   2rem     (32px)
12:  3rem     (48px)
16:  4rem     (64px)
```

## Components

### Typography

The Typography component handles all text rendering with consistent styling and accessibility features.

```svelte
<Typography variant="h1">Main Heading</Typography>
<Typography variant="body" color="secondary">Body text</Typography>
<Typography variant="small" color="tertiary">Caption text</Typography>
```

**Props:**
- `variant`: h1-h6, body, lead, small, caption, blockquote, code
- `color`: primary, secondary, tertiary, accent, success, warning, error
- `size`: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
- `weight`: light, normal, medium, semibold, bold
- `align`: left, center, right, justify
- `element`: Custom HTML element

### Button

Text-focused button component with clear hierarchy and accessibility.

```svelte
<Button variant="primary">Primary Action</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="link">Text Link</Button>
```

**Props:**
- `variant`: primary, secondary, outline, ghost, link, danger
- `size`: sm, base, lg, xl
- `disabled`: boolean
- `loading`: boolean
- `href`: string (renders as link)

### Card

Container component for grouping related content.

```svelte
<Card variant="elevated" hoverable>
  <Typography variant="h4">Card Title</Typography>
  <Typography variant="body">Card content</Typography>
</Card>
```

**Props:**
- `variant`: default, elevated, outlined, filled, transparent
- `padding`: none, sm, base, lg, xl
- `hoverable`: boolean
- `clickable`: boolean

### Badge

Small labels for categorization and status indication.

```svelte
<Badge variant="primary">Featured</Badge>
<Badge variant="success" size="sm">Published</Badge>
```

**Props:**
- `variant`: default, primary, secondary, success, warning, error, outline
- `size`: sm, base, lg

### Link

Accessible link component with consistent styling.

```svelte
<Link href="/article" variant="default">Read More</Link>
<Link href="https://example.com" external>External Link</Link>
```

**Props:**
- `href`: string
- `variant`: default, muted, primary, subtle
- `underline`: none, always, hover, focus
- `external`: boolean (adds icon and rel attributes)

### Container

Layout component for consistent content width and spacing.

```svelte
<Container size="prose">
  <Typography variant="body">Content within reading width</Typography>
</Container>
```

**Props:**
- `size`: sm, base, lg, xl, prose, prose-wide, prose-narrow, full
- `centered`: boolean
- `element`: Custom HTML element

### Article

Specialized component for long-form content with prose styling.

```svelte
<Article>
  <h1>Article Title</h1>
  <p>Article content with automatic prose styling...</p>
</Article>
```

### Separator

Visual divider component.

```svelte
<Separator />
<Separator orientation="vertical" className="h-8" />
```

**Props:**
- `orientation`: horizontal, vertical
- `decorative`: boolean (affects ARIA attributes)

## Usage Guidelines

### Typography Hierarchy

1. Use heading levels semantically (h1 for page title, h2 for main sections, etc.)
2. Maintain consistent spacing between headings and content
3. Limit line length to 50-75 characters for optimal readability
4. Use the Typography component's `variant` prop rather than custom CSS

### Color Usage

1. Use semantic colors consistently (success for positive actions, error for warnings)
2. Ensure sufficient contrast for all text (4.5:1 minimum)
3. Don't rely on color alone to convey information
4. Use the content color scale for text, surface colors for backgrounds

### Spacing

1. Use the spacing scale for consistent rhythm
2. Prefer larger spacing between unrelated elements
3. Use responsive spacing (sm:, md:, lg: prefixes)
4. Maintain vertical rhythm with consistent line heights

### Responsive Design

1. Mobile-first approach
2. Use responsive typography (text-base sm:text-lg)
3. Adjust container sizes for different screens
4. Test at multiple viewport sizes

## Accessibility Checklist

- [ ] All interactive elements have focus indicators
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Headings follow logical hierarchy
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Links have descriptive text
- [ ] Page has proper document structure
- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- CSS bundle: ~8KB gzipped
- No JavaScript required for basic functionality
- Optimized for Core Web Vitals
- Progressive enhancement approach

## Contributing

When adding new components or features:

1. Follow existing naming conventions
2. Ensure accessibility compliance
3. Test with keyboard navigation
4. Verify color contrast
5. Document all props and usage examples
6. Include responsive behavior
7. Test with screen readers

## License

MIT License - feel free to use and modify for your projects.