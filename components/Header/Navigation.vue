<template>
  <nav class="row justify-center header-nav">
    <router-link
      v-if="navTop.length"
      v-for="item in navTop"
      :aria-current="$route.fullPath === item.path ? 'page' : null"
      :key="item.key"
      :to="item.path" 
      :class="`header-nav__link column xs-50 sm-25 header-nav__link--${item.frontmatter.slug}`">
      {{ item.frontmatter.shortLabel || item.frontmatter.title }}
    </router-link>
  </nav>
</template>

<script>
  export default {
    name: 'HeaderNavigation',

    computed: {
      navTop () {
        return this.$site.pages.filter(page => {
          if (page.frontmatter.view === 'category') {
            return page.frontmatter.top && page.frontmatter.lang === this.$localeConfig.lang
          }
        }).sort((a, b) => a.frontmatter.order - b.frontmatter.order)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.header-nav
  &__link
    display: block
    position: relative
    padding-top: 26px
    padding-bottom: 26px
    text-align: center
    text-transform: uppercase
    color: white

    &:hover
      color: white
      text-decoration: underline

    &--semantica
      background-color: $color1

    &--acessibilidade
      background-color: $color2

    &--seo
      background-color: $color3
    
    &--ux
      background-color: $color4

    &.router-link-exact-active:before
      content: ''
      position: absolute
      bottom: 0px
      left: 50%
      transform: translateX(-50%)
      border: 8px solid transparent
      border-bottom-color: white

</style>