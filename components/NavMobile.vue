<template>
  <nav 
    class="container nav-mobile"
    aria-label="Navigation" 
    itemscope itemtype="https://schema.org/SiteNavigationElement">
    <span itemprop="headline" class="nav-mobile__title">{{ $t('navigation') }}</span>
    <ul class="nav-mobile__list">
      <li 
        class="nav-mobile__item"
        v-for="(item, index) in getItemsNavMobile"
        :key="`${item.label}-${index}`">
          <router-link itemprop="url" class="nav-mobile__link" :to="item.path" @click.native="$emit('click')">
            <bullet type="primary" />
            <span class="text">{{ item.label }}</span>
          </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'SidNavMobileebar',

    components: {
      bullet: () => import(/* webpackChunkName = "Bullet" */ '@theme/components/Bullet'),
    },

    computed: {
      getItemsNavMobile () {
        const categories = this.$categories.map(category => {
          if (category.frontmatter.lang !== this.$localeConfig.lang) return
          return { label: category.frontmatter.title, path: category.path }
        }).filter(category => category)
        return [...this.$themeLocaleConfig.footer.nav1.items, ...categories]
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.nav-mobile
  position: relative

  &__title
    display: block
    font-weight: bold
    font-size: 18px
    padding-top: 20px
    text-align: center
    text-transform: uppercase
    color: lighten($primaryColor, 30%)

  &__list
    padding: 30px 0
    display: flex
    flex-wrap: wrap

  &__item
    padding-right: 5px
    margin-bottom: 10px

    @media (max-width: $mobile)
      width: 50%
  
  &__link
    padding: 12px
    display: block
    color: rgba(255, 255, 255, .8)
    font-weight: bold
    border-radius: 10px
    font-size: $smallText
    text-transform: uppercase
    display: flex

    .bullet
      width: 6px
      height: 6px
      top: 5px
      margin-right: 8px

    &:hover
      color: $primaryColor
      background-color: rgba(255, 255, 255, .8)

</style>