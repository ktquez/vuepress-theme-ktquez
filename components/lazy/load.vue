<template>
  <div class="observer" :class="{ 'observer--displayed': displayed }">
    <spinner class="observer__spinner" :class="{ 'observer__spinner--hide': displayed }" v-if="spinner" />
    <component v-if="tag && displayed" :is="current" :tag="tag" :data="data" />
    <slot v-if="!tag && displayed" />
  </div>
</template>

<script>
  import Spinner from '@theme/components/Spinner'

  export default {
    name: 'LazyLoadIntersectionObserver',

    components: {
      Spinner
    },

    props: {
      tag: String,
      data: Object,
      spinner: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        displayed: false,
        observer: null
      }
    },

    computed: {
      current () {
        return () => import(`@theme/components/lazy/load-${this.tag}.vue`)
      }
    },

    mounted () {
      require('intersection-observer')
      this.observer = new IntersectionObserver(([entry]) => {
        if (this.displayed) return
        if (entry && entry.isIntersecting) {
          this.displayed = true
          this.disconnect()
        }
      }, (this.$themeConfig.lazyLoad || {}))

      this.observer.observe(this.$el)
    },

    beforeDestroy () {
      this.disconnect()
    },

    methods: {
      disconnect () {
        this.observer.disconnect()
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.observer
  position: relative
  height: 100%
  min-height: 200px

  &--displayed
    min-height: auto

  &__spinner
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 1
    transition visibility .5s 1s, opacity .5s 1s

    &--hide
      opacity: 0
      visibility: hidden

</style>