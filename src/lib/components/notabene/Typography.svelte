<script>
  export let variant = 'body';
  export let size = 'base';
  export let weight = 'normal';
  export let color = 'primary';
  export let align = 'left';
  export let element = 'p';
  export let className = '';
  
  const variants = {
    h1: 'text-4xl sm:text-5xl font-bold tracking-tight',
    h2: 'text-3xl sm:text-4xl font-bold tracking-tight',
    h3: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h4: 'text-xl sm:text-2xl font-semibold tracking-tight',
    h5: 'text-lg sm:text-xl font-semibold tracking-tight',
    h6: 'text-base sm:text-lg font-semibold tracking-tight',
    body: 'text-base leading-relaxed',
    lead: 'text-lg sm:text-xl leading-relaxed font-light',
    small: 'text-sm leading-relaxed',
    caption: 'text-xs leading-relaxed',
    blockquote: 'text-lg sm:text-xl leading-relaxed italic border-l-4 border-content-accent pl-6 my-6',
    code: 'font-mono text-sm bg-surface-secondary px-2 py-1 rounded'
  };
  
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl'
  };
  
  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  const colors = {
    primary: 'text-content-primary',
    secondary: 'text-content-secondary',
    tertiary: 'text-content-tertiary',
    inverse: 'text-content-inverse',
    accent: 'text-content-accent',
    success: 'text-content-success',
    warning: 'text-content-warning',
    error: 'text-content-error'
  };
  
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  $: baseClasses = variants[variant] || variants.body;
  $: sizeClass = variant.startsWith('h') ? '' : sizes[size] || '';
  $: weightClass = weights[weight] || '';
  $: colorClass = colors[color] || colors.primary;
  $: alignClass = alignments[align] || '';
  
  $: classes = [
    baseClasses,
    sizeClass,
    weightClass,
    colorClass,
    alignClass,
    className
  ].filter(Boolean).join(' ');
  
  $: tag = element === 'auto' ? (variant.startsWith('h') ? variant : 'p') : element;
</script>

<svelte:element this={tag} class={classes} {...$$restProps}>
  <slot />
</svelte:element>