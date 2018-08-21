<template>
  <div class="container-fluid">    
    <kt-header />
    <main id="main" class="container main">
      <slot name="view"></slot>
    </main>
    <kt-footer />
  </div>
</template>

<script>
  import ktHeader from '@theme/components/Header'

  export default {
    name: 'LayoutBase',

    components: { 
      ktHeader,
      ktFooter: () => import(/* webpackChunkName = "Footer" */ '@theme/components/Footer')
    }
  }
</script>