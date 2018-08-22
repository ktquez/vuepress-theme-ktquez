<template>
  <div class="languages" v-if="languages.length"> 
    <div class="languages__box">
      <span class="languages__title meta-text">{{ getCurrentLanguage.shortname }}</span>
      <span class="languages__icon"></span>
    </div>
    <ul class="languages__list">
      <li 
        class="languages__item"
        v-for="language in languages"
        :key="language.label">
          <router-link class="languages__link" :to="language.path">
            {{ language.label }}
          </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Languages',

    computed: {
      languages () {
        const { locales } = this.$site
        if (Object.keys(locales).length > 1) {
          return Object.keys(locales).map(path => {
            const locale = locales[path]
            return {
              ...this.$themeConfig.locales[path].languages,
              path
            }
          })
        }
        return []
      },

      getCurrentLanguage () {
        return this.$themeLocaleConfig.languages 
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.languages
  display: inline-block
  font-size: $smallText
  width: 70px
  padding: 10px
  transition: all .5s
  cursor: pointer
  z-index: 2

  &__box
    display: inline-block

  &__list
    height: 0
    overflow: hidden
    transition: all .2s
    padding-left: 2px
    padding-right: 14px

  &__item
    margin-bottom: 2px
    visibility: hidden
    opacity: 0
    transition: all .5s .2s

    &:before
      content: '-'
      color: $primaryColor

  &__link
    padding: 7px 4px
    display: inline-block

    &:hover
      color: $primaryColor
      text-decoration: underline

  &__icon
    display: inline-block
    padding: 2px
    position: relative
    top: -2px
    margin-left: 4px
    border: solid $primaryColor
    border-width: 0 2px 2px 0
    transform: rotate(45deg)
    transition: all .5s

.languages:hover
  width: max-content
  background-color: white
  box-shadow: 1px 1px 99px #e2e2e2
  border-radius: 10px

  > .languages__list
    margin-top: 18px
    height: max-content

    .languages__item
      visibility: visible
      opacity: 1
      transition: all .5s .2s

  .languages__icon
    transform: rotate(-135deg)
    top: 1px

</style>
