<template>
  <div class="page authors">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xs-100">
        <h1 class="page-header__title">{{ $page.frontmatter.title }}</h1>
        <h2 class="page-header__title meta-text--primary">
          {{ $authors.length }} {{ $authors.length > 1 ? $t('authors') : $t('author') }}
        </h2>
      </div>
      <div class="column xs-100">
        <hr class="divider">
      </div>
    </section>

    <section class="row authors-grid">
      <div 
        class="column md-50 mt-30"
        v-for="author in $authors"
        :key="author.key">
        <card-author :author="author" />
      </div>
    </section>
  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import CardAuthor from '@theme/components/CardAuthor'

  export default {
    name: 'AllAuthors',

    components: {
      CardPost,
      CardAuthor,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton')
    },
    
    computed: {
      tag () {
        return this.$route.query.tag
      },

      filterPosts () {
       if (this.tag) {
         return this.$posts.filter(post => {
           if (!post.tags.length) return
           return post.tags.includes(this.tag)
         })
       }
       return this.$posts
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

@media (max-width: $mobile)
  .authors-grid
    .card-author-info__role .meta-text
      font-size: 10px

</style>
