<template>
  <div class="hamburguer" :class="{ 'hamburguer--open': open }" @click="$emit('click')">
    <div class="hamburguer__wrapper">
      <span class="hamburguer__line"></span>
      <span class="hamburguer__line"></span>
      <span class="hamburguer__line"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuHamburguer',

  props: {
    open: Boolean
  }
}
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.hamburguer
  width: 44px
  height: 44px
  cursor: pointer

  &__wrapper
    width: 30px
    position: relative
    left: 50%
    top: 12px
    margin-left: -15px
    transform: rotate(0deg)
    transition: .5s ease-in-out    

  &__line
    display: block
    position: absolute
    height: 4px
    width: 100%
    background-color: $primaryColor
    border-radius: 50px
    opacity: 1
    left: 0
    transform: rotate(0deg)
    transition: .25s ease-in-out

    &:nth-child(1)
      top: 0px

    &:nth-child(2)
      top: 8px
      width: 60%

    &:nth-child(3)
      top: 16px
      width: 80%

  &--open
    .hamburguer__line
      &:nth-child(1)
        top: 8px;
        transform: rotate(135deg)

      &:nth-child(2)
        opacity: 0
        position: fixed
        left: 700px
        width: 100%

      &:nth-child(3)
        top: 8px
        transform: rotate(-135deg)
        width: 100%
</style>