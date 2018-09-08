<template>
  <article 
    class="card box-default" 
    :class="{ 'card--cover-top': isCoverPosition('top') }">
    <div class="card__box1" :class="`card__box1--${cover}`">
      <header>
        <div class="card-category">
          <router-link 
            class="card-category__link" 
            :to="getCurrentCategory.path"
            :aria-labelledby="`sr-link-cat-${item.key}`" >
            <bullet :type="item.categories[0]" />
            <span class="meta-text">{{ getCurrentCategory.frontmatter.title }}</span>
          </router-link>
          <span hidden :id="`sr-link-cat-${item.key}`">
            {{ $t('labelledby_cat_card_post') }} {{ getCurrentCategory.frontmatter.title }}
          </span>
        </div>
        <div class="card-cover" v-if="isCoverPosition('top')">
          <router-link :to="item.path" :aria-labelledby="`sr-link-post-${item.key}`">
            <responsive-picture :coverName="item.coverName">
              <img    
                class="card-cover__image card-cover__image--top cover"
                :src="`${item.coverName},w_${lastBreakpoint}.${extension}`" 
                :title="item.coverAlt"
                :alt="item.coverAlt"> 
            </responsive-picture>
          </router-link>
        </div>
        <router-link class="card-title" :to="item.path">
          <h2 class="card-title__text">{{ item.title }}</h2>
        </router-link>
      </header>
      <aside class="row card-info">
        <div class="column xs-50">
          <ul class="card-info__list">
            <li class="card-info__item">
              <time-provider type="ago" :date="item.created_at">
                <time 
                  :datetime="`${item.created_at}`" 
                  class="card-timeago"
                  slot-scope="{ time }">
                    {{ time }}
                </time>
              </time-provider>              
            </li>
            <li v-if="item.video" class="card-info__item">
              <span class="youtube-play"></span>
            </li>
          </ul>
        </div>
        <div class="column xs-50">
          <router-link 
            class="card-readmore" 
            :to="item.path"
            :aria-labelledby="`sr-link-post-${item.key}`">
              <span class="card-readmore__text">{{ $t('see_post') }}</span>
              <span class="icon card-readmore__icon icon--arrow">arrow</span>
          </router-link>
          <span hidden :id="`sr-link-post-${item.key}`"> {{ $t('labelledby_post_card_post') }} {{ item.title }}</span>
        </div>
      </aside>
    </div>

    <div class="card__box2" :class="`card__box2--${cover}`" v-if="item.cover && cover && !isCoverPosition('top')">
      <router-link :to="item.path">
        <img 
          class="card-cover__image card-cover__image--side cover" 
          :src="getSideImage(item.coverName)" 
          :alt="item.coverAlt">
      </router-link>
    </div>
  </article>
</template>

<script>
  import ResponsivePicture from '@theme/components/ResponsivePicture'

  export default {
    name: 'CardPost',

    components: {
      ResponsivePicture,
      bullet: () => import(/* webpackChunkName = "Bullet" */ '@theme/components/Bullet'),
      TimeProvider: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Time/Provider')
    },

    props: {
      item: {
        type: Object,
        required: true
      },

      cover: {
        type: [String, Boolean],
        default: false
      }
    },

    computed: {
      getCurrentCategory () {
        return this.$site.pages.filter(page => {
          return this.item.lang === page.frontmatter.lang && page.frontmatter.slug === this.item.categories[0]
        })[0]
      },

      lastBreakpoint () {
        const bp = this.$themeConfig.responsive.breakpoints
        return bp[bp.length - 1] || 680
      },

      extension () {
        return this.item.coverExt || this.$themeConfig.responsive.ext || 'png'
      }
    },

    methods: {
      isCoverPosition (position) {
        return this.cover === position
      },
      getSideImage (coverName) {
        if (this.$themeConfig.responsive.active) {
          return `${coverName},w_${this.$themeConfig.responsive.breakpoints[0]}.${this.extension}`
        }
        return `${coverName}.${this.extension}`
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.card
  display: flex
  
  &.box-default
    padding-bottom: 0

  &--cover-top .card-title
    height: 84px

  &__box1
    width: 100%
    min-width: 120px

    &--left
      order: 2
      padding-right: 30px

  &__box2
    min-width: 120px

    &--left
      order: 1
      padding-right: 30px

    &--right
      padding-left: 30px

  @media (max-width: $max-tablet)
    &__box1
      width: 100%

    &__box2
      display: none

.card-category
  &__link
    display: inline-block
    margin-bottom: 10px

.card-cover
  width: 100%
  height: 150px
  margin-bottom: 20px

  &__image
    width: 100%
    -o-object-fit: cover
    object-fit: cover

    &--top
      height: 150px

    &--side
      height: 120px

.card-title
  display: block
  height: 60px

  &__text
    font-size: $title3
    line-height: $title3
    font-weight: bold

    @media (max-width: $min-large)
      font-size: $regularText
      line-height: $regularText

  @media (max-width: $max-tablet)
    height: max-content !important
    padding-bottom: 20px

.card-info.row
  border-top: .5px solid $borderColor

  .column
    padding: 0

.card-info
  &__item
    display: inline-flex

    .youtube-play
      top: 3px 


.card-readtime, .card-timeago, .card-readmore
  font-size: $smallText
  color: $textLightColor
  padding: 16px 0

.card-readmore
  position: relative
  right: 4px
  display: block
  text-align: right

  &__icon
    margin-left: 6px

  &__text
    text-transform: uppercase

  &:hover
    .card-readmore__icon
      animation-name: arrow
      animation-duration: .5s
      animation-timing-function: ease-out
      animation-iteration-count: infinite

@keyframes arrow {
  0% { left: 0px }
  50% { left: 6px }
  100% { left: -5px }
}
</style>
