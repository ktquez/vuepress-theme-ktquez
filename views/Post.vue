<template>
  <div>
    <div class="page page__full row justify-right">
      <article 
        class="column xs-100 page__full__box box-default" 
        itemscope
        itemprop="blogPost" 
        itemtype="https://schema.org/BlogPosting">
        <meta itemprop="mainEntityOfPage" :content="currentPost.path">
        
        <header class="page-header page__full-header">
          <back-button />
          <div class="page-header__meta">
            <time-provider type="ago" :date="currentPost.created_at">
              <time 
                :datetime="`${currentPost.created_at}`" 
                itemprop="datePublished"
                class="text"
                slot-scope="{ time }">
                  {{ time }}
              </time>
            </time-provider>
            <meta itemprop="dateModified" content="currentPost.updated_at">
            
            <time-provider type="mintoread" v-if="getContent('innerText')" :content="getContent('innerText')">
              <span class="text" slot-scope="{ time }" v-show="time">
                - <span class="icon">clock</span> <span>{{ time }}</span>
              </span>
            </time-provider>
          </div>
          <h1 itemprop="name headline" class="page-header__title">{{ currentPost.title }}</h1>
          <div class="page-header-cat">
            <nav class="page-header-cat__nav">
              <ul class="page-header-cat__list">
                <li class="page-header-cat__item" v-for="category in getCategories" :key="category.key">
                  <router-link class="page-header-cat__link meta-text" itemprop="keywords" :to="category.path">
                    {{ category.frontmatter.title }}
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div 
            v-if="getAuthor"
            class="page-header__author" 
            itemprop="author" 
            itemscope itemtype="https://schema.org/Person">
            <strong>{{ $t('author') }}: </strong>
            <router-link class="link link--filler-s-primary" rel="author" itemprop="url" :to="getAuthor.path">
              <span itemprop="name">{{ getAuthor.frontmatter.name }}</span>
            </router-link>
          </div>          
        </header>

        <div 
          v-if="currentPost.cover && !currentPost.video"
          class="post-cover" 
          itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
          <responsive-picture :coverName="currentPost.coverName">
            <img    
              class="post-cover__image cover"
              itemprop="url"  
              :src="`${currentPost.coverName}.${currentPost.coverExt || $themeConfig.responsive.ext || 'png'}`"
              :title="currentPost.coverAlt"
              :alt="currentPost.coverAlt">
          </responsive-picture>
        </div>

        <section class="post-cover post-cover--video" v-if="currentPost.video">
          <lazy-load tag="iframe" :data="{ src: currentPost.video, height: '100%' }" />
        </section>

        <section class="page-content page__full-content">
          <div class="row">
            <div class="column no-pad-l sm-50 post-share">
              <lazy-load :spinner="false">
                <share-post :post="currentPost" />
              </lazy-load>
            </div>
            <div v-if="currentPost.demo" class="column no-pad-r sm-50 post-demo-button">
              <a :href="currentPost.demo" target="_blank" aria-labelledby="see-demo">
                <kt-button type="submit" color="primary">
                  <span class="txt-upper">{{ $t('see_demo') }}</span>
                  <span class="icon icon--arrow">arrow</span>
                </kt-button>
              </a>
              <span hidden id="see-demo">
                {{ $t('see_demo') }} {{ currentPost.title }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="column no-pad-l md-75 xl-67 post-content">
              <div class="post-content__box-player">
                <div 
                  v-if="currentPost.audio" 
                  class="sound-player post-content__player" 
                  :class="`sound-player--${$themeConfig.players.default}`">
                  <lazy-load 
                    tag="iframe" 
                    :data="getParamsSoundPlayer" />                  
                </div>
              </div>
              <div class="post-content__excerpt">
                <h2 class="page-header__subtitle" itemprop="description" v-if="currentPost.excerpt">{{ currentPost.excerpt }}</h2>
              </div>
              <div class="post-content__table-contents" v-if="$page.headers">
                <table-contents :headers="$page.headers" />
              </div>
              <div ref="content" itemprop="articleBody">
                <Content></Content>
              </div>       
            </div>
            <div class="column no-pad-r sm-25 xl-33 xsNone smNone post-sidebar">
              <ads class="post-sidebar__bizu" direction="vertical" />
            </div>
            <aside class="column xs-100">
              <hr class="divider">
              <div>
                <lazy-load :spinner="false">
                  <share-post :post="currentPost" />
                </lazy-load>
              </div>
              <hr class="divider">
              <section class="post-content__disqus">
                <h3>{{ $t('text_comments') }}</h3>
                <ClientOnly>
                  <vue-disqus class="mt-30" :shortname="$themeConfig.disqus" />
                </ClientOnly>
              </section>
            </aside>
          </div>
        </section>
      </article>      
    </div>
    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>
    <aside class="container main">
      <!-- <more-posts label="related_posts" :posts="relatedPosts">
        <sidebar slot="sidebar" />
      </more-posts> -->
    </aside>
  </div>
</template>

<script>
  import ContentMixin from '@theme/mixins/Content'
  import PostsMixin from '@theme/mixins/Posts'

  import MorePosts from '@theme/components/MorePosts'
  import Sidebar from '@theme/components/Sidebar'
  import ResponsivePicture from '@theme/components/ResponsivePicture'

  export default {
    name: 'Post',

    mixins: [ContentMixin, PostsMixin],

    components: {
      Sidebar,
      MorePosts,
      ResponsivePicture,
      Ads: () => import(/* webpackChunkName = Ads" */ '@theme/components/Ads'),
      TimeProvider: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Time/Provider'),
      TableContents: () => import(/* webpackChunkName = TableContents" */ '@theme/components/TableContents'),
      KtButton: () => import(/* webpackChunkName = SharePost" */ '@theme/components/UI/Button'),
      SharePost: () => import(/* webpackChunkName = KtButton" */ '@theme/components/SharePost'),
      VueDisqus: () => import(/* webpackChunkName = "vue-disqus" */ 'vue-disqus/dist/vue-disqus.vue'),
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter'),
      LazyLoad: () => import(/* webpackChunkName = "LazyLoad" */ '@theme/components/lazy/load')
    },

    computed: {
      getCategories () {
        return this.$categories.filter(category => {
          if (this.currentPost.categories.includes(category.frontmatter.slug)) {
            if (category.frontmatter.lang === this.$localeConfig.lang) return category
          }
        })
      },

      currentPost () {
        return this.$posts.filter(post => {
          return post.key === this.$page.key
        })[0]
      },

      getAuthor () {
        const [author] = this.$authors.filter(author => {
          const fm = author.frontmatter
          return fm.nickname === this.currentPost.author && fm.lang === this.$localeConfig.lang
        })
        if (author) return author
        return this.$authors.filter(author => author.frontmatter.nickname === this.currentPost.author)[0]
      },

      relatedPosts () {
        // return [...this.postsByLang].splice(3, 9)
      },

      getPlayer () {
        return this.$themeConfig.players[this.$themeConfig.players.default]
      },

      getParamsSoundPlayer () {
        return {
          src: `${this.getPlayer.url}${this.currentPost.audio}${this.getUrlParams}`,
          height: 166,
          allow: 'autoplay'
        }
      },
      getUrlParams () {
        return '&amp;' + Object.keys(this.getPlayer.params)
                          .map(key => `${encodeURI(key)}=${encodeURI(this.getPlayer.params[key])}`)
                          .join('&amp;')
                          .replace(/#/g, '%23')
      }
    },

    methods: {
      getUrl () {
        return this.$el.baseURI
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.page-header-cat
  margin-top: 14px

.post-cover
  width: 100%
  height: 358px
  margin-top: 30px
  margin-bottom: 30px
  background-color: lighten($primaryColor, 90%)

  @media (max-width: $max-tablet)
    height: 192px

  &--video
    height: 80vh

    @media (max-width: $max-tablet)
      height: 300px

  &__image
    width: 100%
    height: 100%
    -o-object-fit: cover
    object-fit: cover

.post-share
  position: relative
  margin-bottom: 20px

  &__item
    display: inline-flex

    > .twitter-share-button
      position: relative !important
      top: 4px

  &:before
    content: ''
    width: 150px
    height: 2px
    background-color: $primaryColor
    position: absolute
    bottom: 0
    left: 0

    @media (max-width: $mobile)
      left: 50%
      transform: translateX(-50%)
  
  .share
    margin-top: 12px
    padding-bottom: 30px

.post-demo-button
  text-align: right 

  .icon
    top: -1px
    margin-left: 6px

@media (max-width: $mobile)
  .post-share
    order: 2

  .post-demo-button
    order: 1
    margin-bottom: 30px

  .post-share, .post-demo-button
    text-align: center

.post-content
  width: calc(100% - 100px)

  &__box-player
    overflow: hidden
  
  &__player
    position: relative
    width: 100%
    margin-top: 30px
    margin-bottom: 30px

  &__table-contents
    margin-top: 60px
    margin-bottom: 80px

  &__disqus
    margin-top: 60px

  &__excerpt > .page-header__subtitle
    font-size: 21px
    line-height: 1.58em

.post-sidebar
  &__bizu
    margin-top: 40px
    float: right
    width: 100%
    max-width: 180px

    @media (max-width: $min-large)
      word-break: break-all

</style>
