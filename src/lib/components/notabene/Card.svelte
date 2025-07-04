<script>
  export let variant = 'default';
  export let padding = 'base';
  export let className = '';
  export let hoverable = false;
  export let clickable = false;
  
  const variants = {
    default: 'bg-surface-primary border border-notabene-200',
    elevated: 'bg-surface-elevated shadow-lg shadow-notabene-100',
    outlined: 'bg-surface-primary border border-notabene-300',
    filled: 'bg-surface-secondary border border-notabene-200',
    transparent: 'bg-transparent'
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    base: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  $: variantClasses = variants[variant] || variants.default;
  $: paddingClasses = paddings[padding] || paddings.base;
  
  $: baseClasses = 'rounded-lg transition-all duration-200';
  $: hoverClasses = hoverable ? 'hover:shadow-md hover:shadow-notabene-100' : '';
  $: clickableClasses = clickable ? 'cursor-pointer hover:bg-surface-secondary' : '';
  
  $: classes = [
    baseClasses,
    variantClasses,
    paddingClasses,
    hoverClasses,
    clickableClasses,
    className
  ].filter(Boolean).join(' ');
</script>

<div class={classes} {...$$restProps}>
  <slot />
</div>