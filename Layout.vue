<template>
  <div 
    class="layout-main" 
    :class="{ 'layout-main__nm--opened': nmOpened, 'layout-main__negative': negative }"
    itemscope itemtype="https://schema.org/WebPage">

    <meta itemprop="name" :content="$site.title">
    <meta itemprop="alternateName" :content="$site.title">
    <meta itemprop="url" :content="$themeConfig.url">

    <transition name="nav-mobile">
      <nav-mobile v-show="nmOpened" @click="closeMenu" />
    </transition>
    <transition :name="transitionName">
      <component :is="layout" class="wrapper-body__nm" :class="{ 'wrapper-body__nm--opened': nmOpened }">
        <div slot="view">          
          <skip-to to="#main" :text="$t('skip_to_main_content')" />
          <component :is="view" />
          <global-events @keyup.esc="cancel" />
          <back-to-top /> 
          <overlay />
        </div>
      </component>
    </transition>

    <vue-announcer v-if="announcerHasLoaded" />
    <SWUpdatePopup :updateEvent="swUpdateEvent"/>
  </div>
</template>

<script>
  // layouts
  import LayoutBase from '@theme/layouts/Base'
  import LayoutPost from '@theme/layouts/Post'
  import LayoutPage from '@theme/layouts/Page'

  // views
  import Home from '@theme/views/Home'
  import Page from '@theme/views/Page'
  import Post from '@theme/views/Post'
  import Posts from '@theme/views/Posts'
  import Category from '@theme/views/Category'
  import Author from '@theme/views/Author'
  import Authors from '@theme/views/Authors'
  import Categories from '@theme/views/Categories'

  // plugins
  import EventBus from '@theme/plugins/EventBus'

  // Components
  import SWUpdatePopup from '@theme/components/SW/UpdatePopup'

  // Mixins
  import NProgressMixin from '@theme/mixins/NProgress'
  import AnnouncerMixin from '@theme/mixins/Announcer'

  import FontFaceObserver from 'fontfaceobserver'
  
  export default {
    name: 'MainLayout',

    mixins: [NProgressMixin, AnnouncerMixin],

    components: { 
      Home,
      Page,
      Post,
      Posts,
      Author,
      Authors,
      Categories,
      Category,
      LayoutBase,
      LayoutPost,
      LayoutPage,
      SWUpdatePopup,
      Overlay: () => import(/* webpackChunkName = "Overlay" */ '@theme/components/Overlay'),
      NavMobile: () => import(/* webpackChunkName = "NavMobile" */ '@theme/components/NavMobile'),
      GlobalEvents: () => import(/* webpackChunkName = "GlobalEvents" */ 'vue-global-events'),
      SkipTo: () => import(/* webpackChunkName = "SkipTo" */ '@theme/components/SkipTo'),
      BackToTop: () => import(/* webpackChunkName = "BackToTop" */ '@theme/components/BackToTop')
    },

    data () {
      return {
        transitionName: 'slideleft',
        nmOpened: false,
        negative: false,
        swUpdateEvent: null
      }
    },

    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slideright' : 'slideleft'
      }
    },

    computed: {
      layout () {
        return 'layout-' + (this.$page.frontmatter.layout || 'base')
      },
      view () {
        return this.$page.frontmatter.view
      }
    },

    created () {
      EventBus.$on('show_nm', data => {
        this.nmOpened = data
      })

      if (this.$themeConfig.blackWhite) {
        EventBus.$on('toggle_black_white', data => {
          this.negative = data
        })
      }      
    },

    beforeMount () {
      // SW update tip for PWA
      this.$on('sw-updated', this.onSWUpdated)
      this.handleLoadWebFont()
    },

    methods: {
      handleLoadWebFont () {
        const poppinsRegular = new FontFaceObserver('Poppins', { weight: 400 })
        const poppinsBold = new FontFaceObserver('Poppins', { weight: 700 })

        if (sessionStorage.fontsLoaded) {
          return document.documentElement.classList.add('fonts-loaded')
        }

        Promise.all([poppinsRegular.load(), poppinsBold.load()]).then(() => {
          document.documentElement.classList.add('fonts-loaded')
          sessionStorage.fontsLoaded = true
        }).catch(() => {
          sessionStorage.fontsLoaded = false
        })
      },

      cancel () {
        EventBus.$emit('show_search', false)
        EventBus.$emit('close_overlay', false)
      },

      closeMenu () {
        this.nmOpened = false
        EventBus.$emit('close_nm', false)
      },

      onSWUpdated (e) {
        this.swUpdateEvent = e
      }
    }
  }
</script>

<style src="carbon-grid"></style>
<style src="./styles/base.styl" lang="stylus"></style>
<style lang="stylus">
@import '~@theme/styles/config.styl'

.layout-main
  &__nm
    &--opened
      background-color: darken($accentColor, 10%)

  &__negative
    &.layout-main__nm--opened,
    *:not(.no_bw):not([class*='switch-bw']):not([class*='hamburguer__']):not([class*='language-']):not(code):not(.token)
      background-color: black !important
      color: #ccc !important
      box-shadow: none !important
      fill: black !important

      input, button:not(.back-button)
        border: 1px solid white !important

      ::placeholder
        color: white

.wrapper-body
  &__nm
    transition: transform .2s ease-in-out
    transform-origin: top center
    
    &--opened
      border-radius: 20px
      overflow: hidden
      transform: perspective(400px) scale3d(.85, .85, 1)

@media (max-width: $mobile)
  [class^="slideright"], [class^="slideleft"]
    will-change: transform, opacity

  .slideright-enter-active, .slideright-leave-active {
    transition: transform .250s, opacity .1s;
  }
  .slideright-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    position: absolute !important;
    transform: translate(-100%) !important;
  }
  .slideright-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate(100%) !important;
    position: absolute !important;
  }

  .slideleft-enter-active, .slideleft-leave-active {
    transition: transform .250s, opacity .1s;
  }
  .slideleft-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    position: absolute !important;
    transform: translate(100%) !important;
  }
  .slideleft-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate(-100%) !important;
    position: absolute !important;
  }
</style>