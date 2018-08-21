<template>
  <div class="container-fluid">
    <kt-header />
    <main id="main" class="main-page" itemscope itemtype="https://schema.org/Blog">
      <slot name="view"></slot>
    </main>
    <kt-footer /> 
  </div>
</template>

<script>
  import ktHeader from '@theme/components/Header'
  
  export default {
    name: 'LayoutPost',

    components: { 
      ktHeader,
      ktFooter: () => import(/* webpackChunkName = "Footer" */ '@theme/components/Footer')
    }
  }
</script>