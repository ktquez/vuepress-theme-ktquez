<template>
  <div class="search">
    <transition name="bottom-top">
      <div class="search-box" v-if="show" :class="{ 'search-box--show': show }">
        <label for="query">
          <input 
            id="query" 
            type="text"
            ref="inputSearch"
            class="search-box__input reset-input"
            :aria-label="$t('aria_label_search')"
            :placeholder="$t('ph_search')"
            autocomplete="off"
            spellcheck="false"
            @input="query = $event.target.value" />
        </label>
       <nav class="suggestions" v-if="query">
          <ul class="suggestions__list">
            <li
              class="suggestion__item"
              v-for="(s, i) in suggestions"
              v-if="suggestions.length"
              :key="`sug-${i}-${s.key}`">
              <router-link @click.native="toggle" class="suggestion__link" :to="s.path">
                <div :class="`suggestion__badge suggestion__badge--${s.frontmatter.view}`">
                    {{ $t(s.frontmatter.view) }} <br>
                    <span class="icon">arrow</span>
                </div>
                <div class="page-title">
                  <span>{{ s.title || s.path }}</span>
                  <span v-if="s.header" class="header">
                    <span class="meta-text meta-text--primary">=> {{ s.header.title }}</span>  
                  </span>
                </div>
              </router-link>
            </li>
            <li v-if="!suggestions.length && query" class="suggestion__item">
              <div class="suggestion__link">
                <h2>{{ $t('no_search_results') }}</h2>  
              </div>
            </li>
          </ul>
       </nav>
      </div>
    </transition>
    <span class="icon search__icon" v-html="getIcon" @click="toggle"></span>
  </div>
</template>

<script>
  import EventBus from '@theme/plugins/EventBus'

  export default {
    name: 'Search',

    data () {
      return {
        show: false,
        query: '',
        focused: false,
        focusIndex: 0
      }
    },

    computed: {
      getIcon () {
        return this.show ? 'cancel' : 'search'
      },

      showSuggestions () {
        return (
          this.focused &&
          this.suggestions &&
          this.suggestions.length
        )
      },

      suggestions () {
        const query = this.query.trim().toLowerCase()
        if (!query) {
          return []
        }

        const { pages, themeConfig } = this.$site
        const max = themeConfig.searchMaxSuggestions || 5
        const localePath = this.$localePath
        const matches = item => (
          item.title &&
          item.title.toLowerCase().indexOf(query) > -1
        )
        const res = []
        for (let i = 0; i < pages.length; i++) {
          if (res.length >= max) break
          const p = pages[i]
          // filter out results that do not match current locale
          if (this.getPageLocalePath(p) !== localePath) {
            continue
          }
          if (matches(p)) {
            res.push(p)
          } else if (p.headers) {
            for (let j = 0; j < p.headers.length; j++) {
              if (res.length >= max) break
              const h = p.headers[j]
              if (matches(h)) {
                res.push(Object.assign({}, p, {
                  path: p.path + '#' + h.slug,
                  header: h
                }))
              }
            }
          }
        }
        return res
      }
    },

    created () {
      EventBus.$on('show_search', data => {
        this.show = data
      })
      EventBus.$on('close_overlay', data => {
        this.show = data
      })
    },

    methods: {
      toggle () {
        this.show = !this.show        
        if (this.show) this.setFocus()
        EventBus.$emit('show_search', this.show)
        EventBus.$emit('show_overlay', this.show)
      },

      setFocus () {
        setTimeout(() => {
          this.reset()
          this.$refs.inputSearch.focus()
        }, 400)
      },

      reset () {
        this.query = ''
        this.$refs.inputSearch.value = ''
      },

      getPageLocalePath (page) {
        for (const localePath in this.$site.locales || {}) {
          if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
            return localePath
          }
        }
        return '/'
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.search
  position: relative

  &__icon
    position: relative
    float: right
    padding: 10px
    cursor: pointer

    &:hover
      color: $primaryColor

.search-box
  position: absolute
  top: 74px
  right: 0px
  z-index: 10
  width: 88vw  
  max-width: 400px
  padding: 20px
  padding-bottom: 40px
  background-color: white
  overflow: auto
  border-radius: 0 0 10px 10px

  &__input.reset-input
    position: relative
    width: 100%
    padding-top: 10px
    padding-bottom: 10px
    color: $textColor
    font-family: inherit
    font-size: $title2
    outline: none
    border-bottom: 1px solid #ccc

    &:focus
      border-top-color: $textLightColor
      border-bottom-color: $textLightColor

    &::placeholder
      color: $textLightColor

  &--show
    .search-box__input
      opacity: 1
      visibility: visible

    .suggestions
      position: relative
      margin-top: 20px
      width: 100%
      background-color: #fff
      z-index: 10

      @media (max-width: $mobile)
        padding-left: 10px
        padding-right: 10px

    .suggestion
      &__badge
        width: 66px
        height: 30px
        height: max-content
        margin-right: 10px
        text-align: center
        display: inline-block
        padding: 6px 4px
        color: $primaryColor
        border-radius: 6px
        font-size: 8px
        letter-spacing: .7px
        text-transform: uppercase
        background-color: #f2f2f2

        &--post
          color: $color6

        &--author
          color: $color7

        &--page
          color: $color2

        @media (max-width: $mobile)
          display: block
          margin-bottom: 10px

      &__link
        line-height: 1.4
        padding: 1em .5em
        border-radius: 4px
        cursor: pointer
        white-space: normal
        color: lighten($textColor, 35%)
        display: flex

        .page-title
          font-weight: 600

          span
            margin-top: 4px
            display: block
            margin: 0

        .header
          font-size: 0.9em
          margin-left: 0.25em
          display: inline

        &:hover
          background-color: #f3f4f5
          color: $accentColor

</style>