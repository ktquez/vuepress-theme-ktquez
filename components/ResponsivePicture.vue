<template>
  <picture>
    <source 
      v-for="size in breakpoints" 
      :key="size"
      :media="`(max-width: ${size}px)`"
      :srcset="getSrcSet[size]"
      v-if="isResponsive">
    <slot></slot>  
  </picture>
</template>

<script>
  export default {
    name: 'ResponsivePicture',

    props: {
      coverName: {
        type: String,
        required: true
      }
    },

    computed: {
      isResponsive () {
        return this.$themeConfig.responsive.active
      },

      getSrcSet () {
        const src = {}
        this.$themeConfig.responsive.breakpoints.forEach(breakpoint => {
          src[breakpoint] = `${this.coverName},w_${breakpoint}.png`
        })
        return src
      },

      breakpoints () {
        return this.$themeConfig.responsive.breakpoints
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

</style>