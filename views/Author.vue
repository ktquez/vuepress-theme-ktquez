<template>
  <div class="page author">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xsNone sm-20">
        <img 
          class="author__avatar" 
          :src="$page.frontmatter.avatar" 
          :alt="`${$t('avatar_of')} ${$page.frontmatter.name}`" />
      </div>
      <div class="column xs-100 sm-80">
        <h1 class="page-header__title author__title">
          <span class="meta-text meta-text--primary">{{ $t('all_posts_author') }}</span>
          <br>
          {{ $page.frontmatter.name }} ({{ amountPostsAuthor }})
        </h1>
        
        <div class="author-joined">
          <span class="icon author-joined__icon">enter</span>
          <time-provider type="ago" :date="$page.frontmatter.created_at">
            <span class="author-joined__text" slot-scope="{ time }">
              {{ $t('joined') }} {{ time }}
            </span>
          </time-provider>
        </div>

        <div class="author-social">
          <ul class="author-social__list">
            <li 
              class="author-social__item" 
              v-for="(network, index) in $page.frontmatter.social" 
              :key="`${network.name}-${index}`">
              <a :href="network.url" class="author-social__link" rel="nofollow noopener" target="_blank">
                <span class="icon author-social__icon" :class="`icon-${network.name}`">{{ network.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="row posts-grid">
      <div 
        class="column md-50 mt-30"
        v-for="post in getPostsByAuthor(0, 4)"
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
        v-for="post in getPostsByAuthor(4)"
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

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'AllPosts',

    mixins: [PostsMixin],

    components: {
      CardPost,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton'),
      TimeProvider: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Time/Provider'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    computed: {
      amountPostsAuthor () {
        const amount = this.getPostsByAuthor(0)
        return `${amount.length} ${this.$t('article')}${amount.length > 1 ? 's' : ''}`
      }
    },

    methods: {
      getPosts (start, end) {
        return [...this.postsByLang].splice(start, (end || this.postsByLang.length))
      },

      getPostsByAuthor (start, end) {
        return this.getPosts(start, end).filter(post => {
          return post.author === this.$page.frontmatter.nickname
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.author
  &__avatar
    width: 100%
    border-radius: 50%

  &__title.page-header__title
    font-size: 2.5em

.author-joined
  margin-bottom: 40px
  color: $textColor
  font-size: $mediumText

  &__icon
    top: 10px
    font-size: $title2
    color: black

.author-social
  &__list
    margin-left: -12px

  &__item
    display: inline-flex
    margin-right: 2px

  &__link
    padding: 8px 10px

  &__icon
    font-size: $title2

</style>
