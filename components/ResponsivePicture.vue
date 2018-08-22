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
        const responsive = this.$themeConfig.responsive
        responsive.breakpoints.forEach(breakpoint => {
          src[breakpoint] = `${this.coverName},w_${breakpoint}.${responsive.ext}`
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