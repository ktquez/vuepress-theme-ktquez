<template>
  <div class="page posts">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xs-100">
        <h1 class="page-header__title">{{ $page.frontmatter.title }} {{ tag ? `by ${tag.toUpperCase()} tag` : '' }}</h1>
        <h2 class="page-header__subtitle">{{ $page.frontmatter.excerpt }}</h2>
      </div>
      <div class="column xs-100">
        <hr class="divider">
      </div>
      <div class="column xs-100 page-header-cat">
        <categories-list :inline="true" />
      </div>
    </section>

    <section class="row posts-grid">
      <div 
        class="column md-50 mt-30"
        v-for="post in getPosts(0, 4)"
        :key="post.key">
        <card-post
          :item="post"
          cover="right" />
      </div>
    </section>

    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>

    <section class="row posts-grid">
      <div 
        class="column md-50 mt-30"
        v-for="post in getPosts(4)"
        :key="post.key">
        <card-post
          :item="post"
          cover="right" />
      </div>
    </section>

  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import CategoriesList from '@theme/components/CategoriesList'

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'AllPosts',

    mixins: [PostsMixin],

    components: {
      CardPost,
      CategoriesList,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },
    
    computed: {
      tag () {
        return this.$route.query.tag
      },

      filterPosts () {
       if (this.tag) {
         return this.postsByLang.filter(post => {
           if (!post.tags.length) return
           return post.tags.includes(this.tag)
         })
       }
       return this.postsByLang
      }
    },

    methods: {
      getPosts (start, end) {
        const p = [...this.filterPosts]
        return p.splice(start, (end || p.length))
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'
</style>
