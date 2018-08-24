<template>
  <div class="page authors">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xs-100">
        <h1 class="page-header__title">{{ $page.frontmatter.title }}</h1>
        <h2 class="page-header__title meta-text--primary">
          {{ getAuthors.length }} {{ getAuthors.length > 1 ? $t('authors') : $t('author') }}
        </h2>
      </div>
      <div class="column xs-100">
        <hr class="divider">
      </div>
    </section>

    <section class="row authors-grid">
      <div 
        class="column md-50 mt-30"
        v-for="author in getAuthors"
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
      CardAuthor,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton')
    },
    
    computed: {
      getAuthors () {
        return this.$authors.filter(author => {
          return author.frontmatter.lang === this.$localeConfig.lang
        })
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
