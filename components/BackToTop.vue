<template>
  <div class="elevator">
    <a 
      @click="fired"
      class="elevator__link" 
      ref="arrowTop" 
      :class="{ 'elevator__link--show': show, 'elevator__link--fire': fire }">
        <span class="icon elevator__icon">greaterthan</span>
    </a>
  </div>
</template>

<script>
  import Elevator from 'elevator.js'

  export default {
    name: 'VueElevator',

    data () {
      return {
        show: false,
        fire: false
      }
    },

    computed: {
      elevatorConfig () {
        return this.$themeConfig.elevator
      }
    },

    mounted () {
      this.elevator()
      this.handleScrollEffectBackToTop()
    },

    beforeDestroy () {
      document.removeEventListener('scroll', this.setPanel)
    },

    methods: {
      fired () {
        this.fire = true
      },

      elevator () {
        const config = {
          element: this.$refs.arrowTop,
          duration: this.elevatorConfig.duration,
          mainAudio: this.elevatorConfig.mainAudio,
          endAudio: this.elevatorConfig.endAudio
        }
        /* eslint-disable no-new */
        setTimeout(() => {
          new Elevator(config)
        }, 5000)
      },

      handleScrollEffectBackToTop () {
        this.setPanel()
        document.addEventListener('scroll', this.setPanel)
      },

      setPanel () {
        window.requestAnimationFrame(() => {
          const diff = (document.documentElement.scrollHeight - document.documentElement.clientHeight) - 1500
          this.show = window.scrollY > diff
          if (window.scrollY === 0) {
            this.fire = false
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.elevator
  position: relative
  z-index: 99

  &__link
    position: fixed
    border-radius: 50%
    padding: 12px 18px
    display: inline-block
    transition: bottom .5s
    right: 12vw
    bottom: -300px
    opacity: 0
    visibility: hidden
    cursor: pointer
    background-color: $primaryColor
    transition: all .5s

    &--fire
      animation: fire 1s linear infinite
    
    &--show
      bottom: 300px
      opacity: 1
      visibility: visible

  &__icon
    display: inline-block
    transform: rotate(270deg)
    font-size: 20px
    color: white
    top: 2px

@keyframes fire
  from
    box-shadow: 0 30px 5px -10px $accentColor
  40%
    box-shadow: 0 15px 5px -10px darken($accentColor, 30%)
  60%
    box-shadow: 0 30px 5px -10px $accentColor
  80%
    box-shadow: 0 15px 5px -10px darken($accentColor, 30%)
  to
    box-shadow: 0 30px 5px -10px $accentColor

</style>
