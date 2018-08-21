<template>
  <div class="container-fluid">
    <kt-header />
    <main id="main" class="container main">
      <div class="page not-found">
        <section class="row justify-center">
          <div class="column md-50 tac not-found__message">
            <h2>{{ $t('title_404') }}</h2>
            <p v-html="$t('text_404')"></p>
            <router-link to="/">
              <kt-button type="button" color="primary">
                {{ $t('back_to_homepage').toUpperCase() }}
              </kt-button>
            </router-link>
          </div>
        </section>
        <section class="row justify-center">
          <div class="column md-50">
            <div class="not-found__image">
              <img src="/abduction.svg" alt="404 Error page" />
            </div>
          </div>
        </section>
      </div>
    </main>
    <kt-footer />
  </div>
</template>

<script>
  import ktHeader from '@theme/components/Header'
  import KtButton from '@theme/components/UI/Button'

  export default {
    name: 'NotFound',

    components: { 
      ktHeader,
      KtButton,
      ktFooter: () => import(/* webpackChunkName = "Footer" */ '@theme/components/Footer')
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.not-found
  position: relative
  height: 40vh

  &__message
    position: absolute
    top: 50%
    transform: translateY(-50%)
    z-index: 2

    p
      font-size: $mediumText
      color: $textLightColor
      margin-top: 20px
      margin-bottom: 20px
      line-height: $title3

  &__image
    position: relative
    text-align: center
    top: -5%
    z-index: 1

    img
      width: 100%
      opacity: .3

</style>