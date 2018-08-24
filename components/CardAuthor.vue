<template>
  <div 
    class="card-author box-default" 
    :class="{ 'card-author--no-shadow': !shadow }"
    itemscope itemtype="https://schema.org/Person">
    <div class="row">
      <div class="column xs-33">
        <img 
          class="card-author__avatar" 
          :src="author.frontmatter.avatar" 
          itemprop="image"
          :alt="`${$t('avatar_of')} ${author.frontmatter.name}`" />
      </div>
      <div class="column xs-67 card-author-info">
        <div class="card-author-info__role">
          <bullet type="primary" />
          <span itemprop="jobTitle" class="meta-text">{{ author.frontmatter.role }}</span>
        </div>

        <router-link 
          itemprop="url" 
          class="card-author__link" 
          :to="`${$localeConfig.path}${$t('path_route_authors')}/${author.frontmatter.nickname}.html`">
          <h3 itemprop="name" class="card-author-info__title">{{ author.frontmatter.name }}</h3>
        </router-link>

        <div class="card-author-info__joined">
          <span class="icon">enter</span>
          <time-provider type="ago" :date="author.frontmatter.created_at">
            <span class="text" slot-scope="{ time }">{{ $t('joined') }} {{ time }}</span>
          </time-provider>
          <span itemprop="alternateName" class="text meta-text--primary">
            ({{ getAmountPostsByAuthor(author.frontmatter.nickname) }})
          </span>
        </div>

        <div class="card-author-social">
          <ul class="card-author-social__list">
            <li 
              class="card-author-social__item" 
              v-for="(network, index) in author.frontmatter.social" 
              :key="`${network.name}-${index}`">
              <a itemprop="sameAs" :href="network.url" class="card-author-social__link" rel="nofollow noopener" target="_blank">
                <span class="icon card-author-social__icon" :class="`icon-${network.name}`">{{ network.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PostsMixin from '@theme/mixins/Posts'
  
  export default {
    name: 'CardAuthor',

    mixins: [PostsMixin],

    components: {
      bullet: () => import(/* webpackChunkName = "Bullet" */ '@theme/components/Bullet'),
      TimeProvider: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Time/Provider')
    },

    props: {
      author: {
        type: Object,
        required: true
      },
      shadow: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      getPostsByAuthor (nickname) {
        return this.postsByLang.filter(post => {
          return post.author === nickname
        })
      },

      getAmountPostsByAuthor (nickname) {
        const posts = this.getPostsByAuthor(nickname)
        return `${posts.length} ${this.$t('article')}${posts.length > 1 ? 's' : ''}`
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.card-author
  position: relative
  max-height: 150px
  max-width: 500px

  &--no-shadow.box-default
    box-shadow: none

  &__avatar
    width: 100%
    max-width: 120px
    max-height: 120px
    border-radius: 50%

  &__link
    &:hover
      color: $primaryColor

.card-author-info
  &__title
    @media (max-width: $max-tablet)
      font-size: $regularText

  &.column
    padding-left: 15px !important

  &__joined
    color: $textColor
    font-size: $mediumText
    margin-top: 2px

    .icon
      top: 5px
      font-size: $regularText
      color: black

    .text
      font-size: $smallText

.card-author-social
  &__list
    margin-left: -12px

  &__item
    display: inline-flex
    margin-right: 2px

  &__link
    padding: 8px 10px

  &__icon
    font-size: $title3


</style>
