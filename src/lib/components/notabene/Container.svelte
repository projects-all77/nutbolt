<script>
  export let size = 'base';
  export let className = '';
  export let centered = true;
  export let element = 'div';
  
  const sizes = {
    sm: 'max-w-2xl',
    base: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    prose: 'max-w-prose',
    'prose-wide': 'max-w-prose-wide',
    'prose-narrow': 'max-w-prose-narrow',
    full: 'max-w-full'
  };
  
  $: sizeClasses = sizes[size] || sizes.base;
  $: centerClasses = centered ? 'mx-auto' : '';
  
  $: baseClasses = 'w-full px-4 sm:px-6 lg:px-8';
  
  $: classes = [
    baseClasses,
    sizeClasses,
    centerClasses,
    className
  ].filter(Boolean).join(' ');
</script>

<svelte:element this={element} class={classes} {...$$restProps}>
  <slot />
</svelte:element>