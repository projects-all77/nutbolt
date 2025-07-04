<script>
  export let className = '';
  export let element = 'article';
  
  $: baseClasses = 'prose prose-lg max-w-none';
  $: proseClasses = [
    'prose-headings:text-content-primary',
    'prose-headings:font-semibold',
    'prose-headings:tracking-tight',
    'prose-p:text-content-primary',
    'prose-p:leading-relaxed',
    'prose-a:text-content-accent',
    'prose-a:no-underline',
    'hover:prose-a:underline',
    'prose-strong:text-content-primary',
    'prose-strong:font-semibold',
    'prose-em:text-content-primary',
    'prose-code:text-content-primary',
    'prose-code:bg-surface-secondary',
    'prose-code:px-1.5',
    'prose-code:py-0.5',
    'prose-code:rounded',
    'prose-code:text-sm',
    'prose-code:font-mono',
    'prose-pre:bg-surface-secondary',
    'prose-pre:border',
    'prose-pre:border-notabene-200',
    'prose-blockquote:text-content-secondary',
    'prose-blockquote:border-l-content-accent',
    'prose-blockquote:pl-6',
    'prose-blockquote:not-italic',
    'prose-hr:border-notabene-200',
    'prose-ul:text-content-primary',
    'prose-ol:text-content-primary',
    'prose-li:text-content-primary',
    'prose-li:leading-relaxed'
  ];
  
  $: classes = [
    baseClasses,
    ...proseClasses,
    className
  ].filter(Boolean).join(' ');
</script>

<svelte:element this={element} class={classes} {...$$restProps}>
  <slot />
</svelte:element>