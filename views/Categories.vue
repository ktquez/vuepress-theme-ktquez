<template>
  <div class="page sitemap">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xs-100">
        <h1 class="page-header__title">{{ $page.frontmatter.title }}</h1>
        <h2 class="page-header__subtitle">{{ $page.frontmatter.excerpt }}</h2>
      </div>
      <div class="column xs-100">
        <hr class="divider">
      </div>
    </section>
    <section class="row sitemap-body">
      <div class="column sm-50 sitemap-body__categories">
        <h2 class="sitemap-body__title">{{ $t('categories') }}</h2>
        <categories-list />
      </div>
      <div class="column sm-50 sitemap-body__tags tags">
        <h2 class="sitemap-body__title">{{ $t('Tags') }}</h2>

        <ul class="tags__list">
          <li class="tags__item" v-for="tag in getAllTags" :key="tag">
            <router-link 
              class="tags__link"
              :to="{ path: `${$localePath}${$t('path_route_posts')}/`, query: { tag } }">
                {{ tag }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>
  </div>
</template>

<script>
  import CategoriesList from '@theme/components/CategoriesList'

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'Categories',

    mixins: [PostsMixin],

    components: {
      CategoriesList,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    computed: {
      getAllTags () {
        const result = []
        if (!this.postsByLang.length) return result
        const tags = this.postsByLang.map(post => {
          return post.tags
        }).reduce((prev, current) => {
          return prev.concat(current)
        })
        
        tags.forEach(item => {
          if (!result.includes(item)) result.push(item)
        })
        return result
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.sitemap-body
  &__title
    margin-top: 40px
    margin-bottom: 40px

.tags
  &__item
    display: inline-flex
    margin-right: 10px

  &__link
    background-color: white
    text-transform: uppercase
    font-size: $smallText
    border-radius: 20px
    margin-bottom: 20px
    padding: 10px 14px 


</style>
