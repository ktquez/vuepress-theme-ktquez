<template>
  <img 
    v-if="$themeLocaleConfig.logo.name"
    :src="`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext}`" 
    :srcset="`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext} 1x, /${$themeLocaleConfig.logo.name}@2x.${$themeLocaleConfig.logo.ext} 2x`" 
    :alt="$themeLocaleConfig.logo.alt">
  <div v-else>
    <h1>{{ $site.title }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

</style>