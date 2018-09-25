<template>
  <div class="share">
    <ul class="share__list">
      <li class="share__item">
        <span class="txt-share">{{ $t('share') }}:</span>
      </li>
      <li 
        class="share__item" 
        v-for="(network, index) in networks" 
        :key="`${network.name}-${index}`"
        v-if="network.active">
        <a
          @click="handle(network)"
          role="button"
          class="link share__link"
          :class="`link--filler-s-${network.name}`"
          :href="getLinkInfo(post, network)"
          :title="network.label"
          :target="network.target">
            <span class="icon">{{ network.name }}share</span>
        </a>
      </li>
    </ul>
    <div id="fb-root"></div>
  </div>
</template>

<script>
  import networks from '@theme/services/networks'
  import { twitterWidgetApi } from '@theme/services/utils'

  export default {
    name: 'SharePost',

    props: {
      post: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        networks
      }
    },

    mounted () {
      this.snippetFacebook()
      this.snippetTwitter()
    },

    methods: {
      getFullURL (source) {
        return this.$themeConfig.url + this.post.path + `?utm_source=${source}&amp;utm_medium=single-post&amp;utm_campaign=share`
      },

      getLinkInfo (post, network) {
        const twitterVia = network.name === 'twitter' ? this.$themeLocaleConfig.share.twitterVia : null
        return network.link(
          post.title, this.getFullURL(network.name), 
          `${this.$themeConfig.url}${post.coverName}.${this.$themeConfig.responsive.ext}`, 
          post.excerpt, 
          twitterVia
        )
      },

      snippetFacebook () {
        if (window.FB) return
        /* facebook */
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: this.$themeConfig.share.facebook.appId,
            xfbml: true,
            version: this.$themeConfig.share.facebook.version
          })
          window.FB.AppEvents.logPageView()
        }

        ;(function (d, s, id, ctx) {
          let js = null
          let fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return }
          js = d.createElement(s); js.id = id
          js.src = `//connect.facebook.net/${ctx.$lang.replace('-', '_')}/sdk.js`
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk', this))
      },

      facebook (fb) {
        const meta = fb.meta(
          this.post.title, this.$el.baseURI, 
          `${this.$themeConfig.url}${this.post.coverName}.${this.$themeConfig.responsive.ext}`,
          this.post.excerpt, 
          this.$themeLocaleConfig.share.facebookCaption
        )
        window.FB.ui({
          method: 'feed',
          display: 'popup',
          name: meta.name,
          link: meta.link + '?utm_source=facebook&amp;utm_medium=single-post&amp;utm_campaign=share',
          picture: meta.picture,
          caption: meta.caption,
          description: meta.description
        })
      },

      snippetTwitter () {
        if (window.twttr) return
        /* twitter */
        window.twttr = ((d, s, id) => {
          var fjs = d.getElementsByTagName(s)[0]
          var t = window.twttr || {}
          if (d.getElementById(id)) return t
          let js = d.createElement(s)
          js.id = id
          js.src = 'https://platform.twitter.com/widgets.js'
          fjs.parentNode.insertBefore(js, fjs)
          t._e = []
          t.ready = (f) => {
            t._e.push(f)
          }
          return t
        })(document, 'script', 'twitter-wjs')
      },

      handle (network) {
        if (network.name !== 'facebook') return
        this.facebook(network)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.share
  &__item
    display: inline-flex

    &:not(:last-child)
      margin-right: 25px

    .txt-share
      font-size: $smallText
      text-transform: uppercase
      font-weight: bold
      position: relative
      top: -3px

  &__link
    cursor: pointer

    &.-filler-s-gplus .icon
      font-size: 18px
      top: -3px

  &__icon
    font-size: 13px
    width: 24px
    height: 14px
    text-align: center

  &__text
    font-size: 10px
    float: left
    margin-top: 1px
    margin-left: 5px
</style>
