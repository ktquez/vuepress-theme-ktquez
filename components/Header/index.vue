<template>
  <header 
    class="header" 
    :class="{ 'header--search-open': searchOpened }"
    itemscope itemtype="https://schema.org/Organization">
    <navigation class="header-navigation" v-if="$themeConfig.topNavigation" />
    <div class="row header-top">
      <div class="column xs-33 sm-20">
        <menu-hamburguer 
          class="header-top__hamburguer"
          :open="openMenu"
          @click="toggleMenuMobile" />

        <languages class="header-top__languages" />
      </div>
      <div class="column xs-33 sm-60">
        <h1 class="header__logo" v-if="$page.frontmatter.view === 'home'">
          <logo />
        </h1>

        <div class="header__logo" v-else>
          <logo />          
        </div>

        <meta itemprop="name" :content="$site.title">
        <meta 
          v-for="social in $themeLocaleConfig.social"
          :key="`meta-org-${social.name}`"
          itemprop="sameAs"
          :content="social.link">

      </div>
      <div class="column xs-33 sm-20">
        <search class="header-top__search" />
        <black-white v-if="$themeConfig.blackWhite" class="header-top__toggle" />
      </div>
    </div>
  </header>
</template>

<script>
  import Logo from '@theme/components/Logo'
  import Search from '@theme/components/Header/Search'
  import MenuHamburguer from '@theme/components/Hamburguer'
  import Navigation from '@theme/components/Header/Navigation'
  
  import EventBus from '@theme/plugins/EventBus'

  export default {
    name: 'Header',

    components: {
      Logo,
      Search,
      Navigation,
      MenuHamburguer,
      Languages: () => import(/* webpackChunkName = Languages */ '@theme/components/Header/Languages'),
      BlackWhite: () => import(/* webpackChunkName = BlackWhite */ '@theme/components/BlackWhite')
    },

    data () {
      return {
        searchOpened: false,
        openMenu: false
      }
    },

    created () {
      EventBus.$on('show_search', this.toggleSearch)
      EventBus.$on('close_nm', data => {
        this.openMenu = data
      })
    },

    methods: {
      toggleMenuMobile () {
        this.openMenu = !this.openMenu
        EventBus.$emit('show_nm', this.openMenu)
      },
      toggleSearch (show) {
        this.searchOpened = show
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.header  
  &--search-open
    position: relative
    z-index: 20

  &__logo
    text-align: center

.header-navigation.header-nav
  position: relative

  @media (max-width: $mobile)
    display: none

.header-top
  position: relative
  padding: 30px 20px 24px
  background-color: white
  
  &__hamburguer
    position: relative
    transform: rotate(90deg)

  &__toggle.switch-bw
    position: absolute
    bottom: -35px
    right: 10px
  

  &__languages
    position: absolute
    top: 32px
    left: 100px

    @media (max-width: $mobile)
      top: auto
      bottom: -42px
      left: 18px
    
@media (max-width: $mobile)
  .header-top
    top: 0
    left: 0
    width: 100%

    &__toggle.switch-bw
      display: none

  
</style>