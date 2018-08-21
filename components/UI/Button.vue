<template>
  <button 
    class="ui-button reset-button" 
    :class="getClass"
    :type="type">
    <slot class="ui-button__inner"></slot>
  </button>
</template>

<script>
  export default {
    name: 'UIButton',

    props: {
      type: {
        type: String,
        default: 'button'
      },
      color: String
    },

    computed: {
      getClass () {
        const classes = {}
        if (this.color) {
          classes[`ui-button--${this.color}`] = this.color
        }
        return classes
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.ui-button
  font-family: inherit
  padding: 14px 30px
  border-radius: 60px
  
  &.ui-button--primary
    background-color: $primaryColor
    color: white
    transition-property: background-color
    transition-duration: .5s

    &:hover
      background-color: darken(@background-color, 20%)

</style>