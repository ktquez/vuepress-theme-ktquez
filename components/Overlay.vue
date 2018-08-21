<template>
  <transition name="bottom-top">
    <div class="overlay" v-if="show" @click="close"></div>
  </transition>
</template>

<script>
  import EventBus from '@theme/plugins/EventBus'

  export default {
    name: 'Overlay',

    data () {
      return {
        show: false
      }
    },

    mounted () {
      EventBus.$on('show_overlay', data => {
        this.show = data
      })
      EventBus.$on('close_overlay', data => {
        this.show = data
      })
    },

    methods: {
      close () {
        this.show = false
        EventBus.$emit('close_overlay')
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: alpha($accentColor, .5)
  z-index: 9

</style>