<template>
  <div class="bizu box-default" :class="`bizu--${direction}`" v-if="!hideBizu && $themeLocaleConfig.ads.length">
    <div class="bizu-image">
      <span class="bizu-close" @click="hideBizu = true">&times;</span>
      <a :href="getAd.link" target="_blank" rel="nofollow noopener">
        <img :src="getAd.image.src" :alt="getAd.image.alt" class="bizu-image__image" />
      </a>
    </div>
    <div class="bizu-info">
      <a :href="getAd.link" class="bizu-info__link bizu-info__text" target="_blank" rel="nofollow noopener">
        {{ getAd.text }}
      </a>
      <a :href="getAd.by.link" class="bizu-info__link bizu-info__by" target="_blank" rel="nofollow noopener">
        {{ getAd.by.text }}
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Ads',

    props: {
      direction: {
        type: String,
        default: 'horizontal'
      }
    },

    data () {
      return {
        hideBizu: false
      }
    },

    computed: {
      getAd () {
        const ads = this.$themeLocaleConfig.ads
        return ads[Math.floor(Math.random() * ads.length)]
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.bizu
  position: relative
  display: flex
  flex-wrap: wrap

  &:hover
    .bizu-info__link
      text-decoration: underline

  &--vertical
    height: max-content

    .bizu-image, .bizu-info
      width: 100%
      padding-right: 0

    .bizu-info
      padding-bottom: 40px

.bizu-close
  position: absolute
  top: 6px
  right: 12px
  color: $textLightColor
  cursor: pointer

.bizu-image
  width: 45%
  padding-right: 20px
  
  &__image
    width: 100%
    height: 100%
    object-fit: cover

.bizu-info
  position: relative
  width: 55%

  &__text
    margin-top: 10px
    font-size: $mediumText
    color: lighten($textColor, 20%)
    line-height: $regularText

  &__by
    position: relative
    margin-top: 10px
    font-size: $smallText
    color: $textLightColor

  &__link
    display: block

</style>
