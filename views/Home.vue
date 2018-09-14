<template>
  <div class="page home">
    <div class="row" v-if="$posts.length">
      <div class="home__first-card column md-50">
        <card-post :item="latestPosts[0]" cover="top" />
      </div>
      <div class="column md-50">
        <div class="row">
          <div class="column sm-100">
            <card-post v-if="latestPosts[1]" :item="latestPosts[1]" :cover="false" />
          </div>

          <div class="column sm-100 mt-30">
            <card-post v-if="latestPosts[2]" :item="latestPosts[2]" :cover="false" />
          </div>
        </div>
      </div>
    </div>

    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>

    <more-posts class="home__see-more" :posts="morePosts">
      <sidebar slot="sidebar" />
    </more-posts>
  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import MorePosts from '@theme/components/MorePosts'
  import Sidebar from '@theme/components/Sidebar'

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'Home',

    mixins: [PostsMixin],

    components: {
      Sidebar,
      CardPost,
      MorePosts,
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    computed: {
      latestPosts () {
        return [...this.postsByLang].slice(0, 3)
      },

      morePosts () {
        return [...this.postsByLang].splice(3, 9)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.home
  &__first-card
    @media (max-width: $max-tablet)
      margin-bottom: 30px

  &__see-more.row
    margin-top: 50px
</style>
