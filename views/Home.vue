<template>
  <div class="page home">
    <section class="row" v-if="$posts.length">
      <div class="home__first-card column md-50">
        <card-post :item="latestPosts[0]" cover="top" />
      </div>
      <div class="column md-50">
        <div class="row">
          <div class="column sm-100">
            <card-post :item="latestPosts[1]" :cover="false" />
          </div>

          <div class="column sm-100 mt-30">
            <card-post :item="latestPosts[2]" :cover="false" />
          </div>
        </div>
      </div>
    </section>

    <section class="row section-newsletter justify-center" v-if="$themeConfig.newsletter.active">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>

    <more-posts :posts="morePosts">
      <sidebar slot="sidebar" />
    </more-posts>
  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import MorePosts from '@theme/components/MorePosts'
  import Sidebar from '@theme/components/Sidebar'

  export default {
    name: 'Home',

    components: {
      Sidebar,
      CardPost,
      MorePosts,
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    computed: {
      latestPosts () {
        return [...this.$posts].slice(0, 3)
      },

      morePosts () {
        return [...this.$posts].splice(3, 9)
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

</style>
