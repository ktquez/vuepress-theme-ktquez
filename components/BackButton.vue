<template>
  <kt-button class="back-button" type="button" @click.native="$router.go(-1)">
    <span class="icon back-button__icon icon--arrow">arrow</span>
    <span class="back-button__text">{{ $t('back') }}</span>
  </kt-button>
</template>

<script>
  import KtButton from '@theme/components/UI/Button'

  export default {
    name: 'BackButton',

    components: {
      KtButton
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.back-button
  position: relative

  &__icon
    display: inline-block
    transform: rotate(180deg)

</style>