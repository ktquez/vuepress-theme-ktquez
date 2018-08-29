<template>
  <div class="switch-bw">
    <span 
      class="switch-bw__text" 
      :class="{ 'switch-bw__text--turnon': toggle }">
      {{ getText }}
    </span>
    <label for="switch-bw" class="switch-bw__label">
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
  </div> 
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

    computed: {
      getText () {
        return !this.toggle ? this.$t('turnon_night_mode') : this.$t('turnoff_night_mode')
      }
    },

    mounted () {
      this.toggle = Boolean(sessionStorage.getItem('switch_bw'))
      this.emit()
    },

    methods: {
      handle () {
        this.toggle = !this.toggle
        sessionStorage.setItem('switch_bw', (this.toggle || ''))
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
  display: flex

  &__text
    font-size: 8px
    color: black
    text-transform: uppercase
    margin-right: 12px
    margin-top: 5px
    letter-spacing: .5px

    &--turnon
      color: white

  &__label
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