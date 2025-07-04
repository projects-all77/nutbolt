<script>
  export let href = '#';
  export let variant = 'default';
  export let underline = 'hover';
  export let external = false;
  export let className = '';
  export let ariaLabel = '';
  
  const variants = {
    default: 'text-content-accent hover:text-content-accent/80',
    muted: 'text-content-secondary hover:text-content-primary',
    primary: 'text-content-primary hover:text-content-accent',
    subtle: 'text-content-tertiary hover:text-content-secondary'
  };
  
  const underlines = {
    none: '',
    always: 'underline',
    hover: 'hover:underline',
    focus: 'focus:underline'
  };
  
  $: variantClasses = variants[variant] || variants.default;
  $: underlineClasses = underlines[underline] || underlines.hover;
  
  $: baseClasses = 'transition-colors duration-200 underline-offset-4';
  $: focusClasses = 'focus:outline-none focus:ring-2 focus:ring-content-accent/50 focus:ring-offset-2 rounded-sm';
  
  $: classes = [
    baseClasses,
    variantClasses,
    underlineClasses,
    focusClasses,
    className
  ].filter(Boolean).join(' ');
  
  $: externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  $: ariaProps = ariaLabel ? { 'aria-label': ariaLabel } : {};
</script>

<a {href} class={classes} {...externalProps} {...ariaProps} {...$$restProps}>
  <slot />
  {#if external}
    <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  {/if}
</a>