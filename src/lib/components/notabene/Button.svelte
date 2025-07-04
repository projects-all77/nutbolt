<script>
  export let variant = 'primary';
  export let size = 'base';
  export let disabled = false;
  export let loading = false;
  export let href = undefined;
  export let type = 'button';
  export let className = '';
  export let ariaLabel = '';
  
  const variants = {
    primary: 'bg-content-accent text-content-inverse hover:bg-content-accent/90 focus:ring-content-accent/50',
    secondary: 'bg-surface-secondary text-content-primary hover:bg-surface-tertiary focus:ring-notabene-300',
    outline: 'border border-notabene-300 bg-transparent text-content-primary hover:bg-surface-secondary focus:ring-notabene-300',
    ghost: 'bg-transparent text-content-primary hover:bg-surface-secondary focus:ring-notabene-300',
    link: 'bg-transparent text-content-accent hover:text-content-accent/80 underline-offset-4 hover:underline focus:ring-content-accent/50',
    danger: 'bg-content-error text-content-inverse hover:bg-content-error/90 focus:ring-content-error/50'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  $: variantClasses = variants[variant] || variants.primary;
  $: sizeClasses = sizes[size] || sizes.base;
  
  $: baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  $: classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    loading ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');
  
  $: tag = href ? 'a' : 'button';
  $: props = href ? { href } : { type, disabled: disabled || loading };
  $: ariaProps = ariaLabel ? { 'aria-label': ariaLabel } : {};
</script>

<svelte:element this={tag} class={classes} {...props} {...ariaProps} {...$$restProps}>
  {#if loading}
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  <slot />
</svelte:element>