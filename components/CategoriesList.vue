<template>
  <nav class="categories">
    <ul class="categories__list">
      <li 
        class="categories__item"
        :class="{ 'categories__item--inline': inline }"
        v-if="$categories.length"
        v-for="category in getCategories"
        :key="category.key">
          <router-link 
            class="categories__link" 
            :to="category.path"
            :aria-current="$route.fullPath === category.path ? 'page' : null">
            <bullet v-if="bullets" :type="category.frontmatter.slug" size="small" />
            <span class="meta-text">{{ category.frontmatter.title }}</span>
          </router-link>
      </li>
      <li v-if="!$categories.length" class="categories__item">
        <h3>😔 {{ $t('no_categories') }}</h3>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Categories',

    props: {
      bullets: {
        type: Boolean,
        default: true
      },
      inline: {
        type: Boolean,
        default: false
      }
    },

    components: {
      bullet: () => import(/* webpackChunkName = "Bullet" */ '@theme/components/Bullet')
    },

    computed: {
      getCategories () {
        return this.$site.pages.filter(page => {
          if (page.frontmatter.view === 'category') {
            return page.frontmatter.lang === this.$localeConfig.lang
          }
        }).sort((a, b) => a.frontmatter.order - b.frontmatter.order)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.categories
  &__item
    margin-bottom: 2px

    &--inline
      display: inline-flex
      margin-right: 4px

      .categories__link
        padding: 12px
        margin-bottom: 4px

    .meta-text
      margin-bottom: 16px

  &__link
    display: block
    padding: 6px 0

    .bullet
      margin-right: 4px
      top: -1px

</style>