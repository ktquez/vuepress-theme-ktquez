<template>
  <label for="switch-bw" class="switch-bw">
    <input 
      type="checkbox" 
      id="switch-bw" 
      name="switch-bw" 
      class="switch-bw__input" 
      @change="handle" 
      :checked="toggle"
      aria-labelledby="switch-bw-text">
    <span class="switch-bw__ball"></span>
    <span id="switch-bw-text" hidden>switch to black or white</span>
  </label> 
</template>

<script>
  import EventBus from '@theme/plugins/EventBus'

  export default {
    name: 'BlackWhite',

    data () {
      return {
        toggle: false
      }
    },

    mounted () {
      this.toggle = Boolean(localStorage.getItem('switch_bw'))
      this.emit()
    },

    methods: {
      handle () {
        this.toggle = !this.toggle
        localStorage.setItem('switch_bw', (this.toggle || ''))
        this.emit()
      },
      emit () {
        EventBus.$emit('toggle_black_white', this.toggle)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.switch-bw
  position: relative
  width: 40px
  height: 20px
  border-radius: 9px
  background-color: #e2e2e2
  cursor: pointer

  &__ball
    position: absolute
    top: -2px
    left: -3px
    width: 24px
    height: 24px
    background: $primaryColor
    border-radius: 50%
    transition: left .5s
    
  &__input
    opacity: 0
    cursor: pointer

  &__input:checked
    + .switch-bw__ball
      left: 20px 
      background-color: #999

</style>