<template>
  <div class="newsletter">
    <span class="meta-text meta-text--primary">{{ $t('stay_in') }}</span>
    <h2 class="newsletter__title">{{ $t('news_title') }}</h2>
    <form 
      class="newsletter__form"
      method="post"
      :action="_action">
        <label :for="`email_news-${id}`" class="newsletter__label">
          <kt-input 
            type="email" 
            name="EMAIL" 
            :id="`email_news-${id}`"
            class="newsletter__input" 
            required
            :aria-label="$t('ph_email')"
            :value.sync="email"
            :placeholder="$t('ph_email')" />
        </label>

        <kt-button type="submit" color="primary" class="newsletter__button txt-upper">
          {{ $t('subscribe') }}
        </kt-button>
    </form>
  </div>
</template>

<script>
  import KtButton from '@theme/components/UI/Button'
  import KtInput from '@theme/components/UI/InputField'

  export default {
    name: 'Newsletter',

    components: {
      KtInput,
      KtButton
    },

    props: {
      action: {
        type: String
      }
    },

    data () {
      return {
        email: '',
        _action: '',
        id: new Date().getTime()
      }
    },

    created () {
      this._action = this.action || this.$themeLocaleConfig.newsletter.action
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.newsletter
  text-align: center

  &__title
    font-size: $title2
    line-height: @font-size

    @media(max-width: $mobile)
      font-size: $title3
      line-height: @font-size

  &__form
    display: flex
    position: relative
    margin-top: 20px
    justify-content: center

  &__label
    width: 100%
    max-width: 300px

  &__input
    width: 100%
    padding: 12px 20px

    &.ui-input-field
      border-radius: 60px 0 0 60px

  &__button
    position: relative
    right: 17px
    top: -1px

@media (max-width: $mobile)
  .newsletter
    &__form
      flex-wrap: wrap
    
    &__label
      max-width: initial

    &__input
      &.ui-input-field
        border-radius: 60px

    &__button
      margin-top: 16px
      right: 0

</style>