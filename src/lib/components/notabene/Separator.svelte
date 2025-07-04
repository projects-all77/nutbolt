<script>
  export let orientation = 'horizontal';
  export let className = '';
  export let decorative = false;
  
  $: isHorizontal = orientation === 'horizontal';
  
  $: classes = [
    'shrink-0 bg-notabene-200',
    isHorizontal ? 'h-px w-full' : 'w-px h-full',
    className
  ].filter(Boolean).join(' ');
  
  $: role = decorative ? 'presentation' : 'separator';
  $: ariaOrientation = !decorative ? { 'aria-orientation': orientation } : {};
</script>

<div class={classes} {role} {...ariaOrientation} {...$$restProps}></div>