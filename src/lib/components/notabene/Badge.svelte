<script>
  export let variant = 'default';
  export let size = 'base';
  export let className = '';
  
  const variants = {
    default: 'bg-surface-tertiary text-content-primary',
    primary: 'bg-content-accent text-content-inverse',
    secondary: 'bg-surface-secondary text-content-secondary',
    success: 'bg-content-success/10 text-content-success',
    warning: 'bg-content-warning/10 text-content-warning',
    error: 'bg-content-error/10 text-content-error',
    outline: 'border border-notabene-300 bg-transparent text-content-primary'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    base: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  
  $: variantClasses = variants[variant] || variants.default;
  $: sizeClasses = sizes[size] || sizes.base;
  
  $: baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors';
  
  $: classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  ].filter(Boolean).join(' ');
</script>

<span class={classes} {...$$restProps}>
  <slot />
</span>