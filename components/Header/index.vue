<template>
  <header 
    class="header" 
    :class="{ 'header--search-open': searchOpened }"
    itemscope itemtype="https://schema.org/Organization">
    <navigation class="header-navigation" />
    <div class="row header-top">
      <div class="column xs-33 sm-20">
        <menu-hamburguer 
          class="header-top__hamburguer"
          :open="openMenu"
          @click="toggleMenuMobile" />

        <languages class="header-top__languages" />
      </div>
      <div class="column xs-33 sm-60">
        <router-link class="header-top__logo" to="/" itemprop="url">
          <logo itemprop="logo" />
        </router-link>

        <meta itemprop="name" content="HTML Moderno">
        <meta itemprop="sameAs" content="https://www.facebook.com/groups/htmlmoderno/">
        <meta itemprop="sameAs" content="https://www.facebook.com/htmlmoderno/">
        <meta itemprop="sameAs" content="https://twitter.com/htmlmoderno/">
        <meta itemprop="sameAs" content="https://github.com/htmlmoderno/">
        <meta itemprop="sameAs" content="https://www.youtube.com/channel/UCByMpqccsCqL42LMzKIMnBg/">
        <meta itemprop="sameAs" content="https://plus.google.com/u/3/108837093816785343826/">

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

.header-navigation.header-nav
  position: relative

  @media (max-width: $mobile)
    display: none

.header-top
  position: relative
  padding: 30px 20px
  background-color: white
  
  &__hamburguer
    position: relative
    transform: rotate(90deg)

  &__toggle.switch-bw
    position: absolute
    bottom: -35px
    right: 10px

  &__logo
    display: block
    font-weight: bold
    position: relative
    text-align: center
    width: 100%
    transition: opacity .5s .5s ease-in-out, top .5s .5s ease-in-out

    @media (max-width: $max-tablet)
      left: initial

    &:focus
      color: $textColor

    .txt
      position: relative
      top: -14px
      font-size: 18px

      @media (max-width: $max-tablet)
        display: none
    
    img
      margin: 0 10px

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