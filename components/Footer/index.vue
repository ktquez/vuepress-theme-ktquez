<template>
  <footer class="footer">
    <div class="footer-box1">
      <svg class="footer-box__shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1366 161">
        <path d="M-11.925-4809v-154.746c40.454,19.75,273.683,130.936,420.544,142.612,161.25,12.821,339.978-42.709,521.543-86.3,169.82-40.769,395.43,29.2,423.912,38.429v60Z" transform="translate(11.926 4970)"/>
      </svg>
    </div>
    <div class="footer-box2">
      <svg class="footer-box__shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1366 246">
        <path d="M-1505.5-4725.5v-238.1c8.149-3.133,18.138-5.059,29.672-5.9h30.954c201.21,11.667,696.6,224.535,855.572,236.458,205.129,15.385,287.179-164.1,432.047-175.625a42.381,42.381,0,0,1,16.756,1.857V-4725.5Z" transform="translate(1506 4971)"/>
      </svg>

      <ul class="footer-social__list">
        <li 
          class="footer-social__item"
          v-for="(network, index) in $themeLocaleConfig.social"
          :key="`${network.name}-${index}`">
          <a :href="network.link" target="_blank" rel="noopener external" title="Follow us on Facebook">
            <span class="icon footer-social__icon">{{ network.name }}</span>
          </a>
        </li>
      </ul>

      <div class="footer-newsletter">
        <newsletter v-if="$themeLocaleConfig.newsletter.action" />
      </div>
    </div>
    <section class="footer-box3">
      <div class="row">
        <div class="column sm-50 footer-card">
          <lazy-load v-if="getAuthor.length">
            <card-author class="footer__card-author" :shadow="false" :author="getAuthor[0]" />
            <div class="watermark-logo"></div>
          </lazy-load>
        </div>
        <div class="column sm-50 footer-nav">
          <div class="row justify-right">
            <div 
              v-if="$themeLocaleConfig.footer.nav1.items.length"
              class="column xs-50 sm-40 md-33 footer-nav__box footer-nav__box--1">
              <h2 class="meta-text title">{{ $themeLocaleConfig.footer.nav1.title }}</h2>
              <nav class="footer-nav1">
                <ul>
                  <li 
                    class="footer-nav1__item" 
                    v-for="(item, index) in $themeLocaleConfig.footer.nav1.items" 
                    :key="`${item.label}-${index}`">
                    <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
                    <a v-if="item.link" :href="item.link" rel="noopener nofollow" target="_blank">{{ item.label }}</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div 
              v-if="$themeLocaleConfig.footer.nav2.items.length"
              class="column xs-50 sm-40 md-33 footer-nav__box footer-nav__box--2">
              <h2 class="meta-text title">{{ $themeLocaleConfig.footer.nav2.title }}</h2>
              <nav class="footer-nav2">
                <ul>
                  <li 
                    class="footer-nav2__item" 
                    v-for="(item, index) in $themeLocaleConfig.footer.nav2.items" 
                    :key="`${item.label}-${index}`">
                    <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
                    <a v-if="item.link" :href="item.link" rel="noopener nofollow" target="_blank">{{ item.label }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="column sm-100 footer-copy" v-html="$themeLocaleConfig.copy"></div>        
      </div>

      <span class="shapes shapes--circle" style="left: 3%; top: -20%"></span>
      <span class="shapes shapes--primary shapes--color3" style="left: 30%; top: -15%"></span>
      <span class="shapes shapes--primary" style="left: 13%; top: -80%; transform: rotate(45deg)"></span>
      <span class="shapes shapes--circle shapes--color4" style="left: 40%; top: 200px"></span>
      <span class="shapes shapes--primary" style="left: 15%; bottom: 10%; transform: rotate(75deg)"></span>
      <span class="shapes shapes--circle shapes--color3" style="right: 50%; top: 30%"></span>
      <span class="shapes shapes--primary" style="right: 20%; top: -100%"></span>
      <span class="shapes shapes--circle" style="right: 10%; top: -20%"></span>
      <span class="shapes shapes--color4" style="right: 35%; top: -20%; transform: rotate(45deg)"></span>
      <span class="shapes shapes--circle" style="left: 40%; top: -50%"></span>
      <span class="shapes shapes--color3" style="right: 30%; top: 20%"></span>
      <span class="shapes shapes--circle shapes--primary" style="right: 30%; bottom: 20%"></span>
    </section>    
  </footer>
</template>

<script>
  export default {
    name: 'Footer',

    components: {
      CardAuthor: () => import(/* webpackChunkName = "CardAuthor" */ '@theme/components/CardAuthor'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter'),
      LazyLoad: () => import(/* webpackChunkName = "LazyLoad" */ '@theme/components/lazy/load')
    },

    computed: {
      getAuthor () {
        return this.$authors.filter(author => {
          return author.frontmatter.lang === this.$localeConfig.lang
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.footer
  position: relative
  overflow: hidden

.footer-box__shape
  position: absolute
  bottom: 0
  left: 0

.footer-box1
  height: 175px
  top: 4px
  .footer-box__shape
    fill: $firstFooterColor

.footer-box2
  height: 250px
  background-color: $firstFooterColor
  bottom: -2px
  .footer-box__shape
    fill: $secondFooterColor

.footer-box3
  position: relative
  background-color: $secondFooterColor
  padding: 50px 0

.footer-box1, .footer-box2
  position: relative    

.footer-social
  
  &__list
    display: inline-block
    margin-top: 8%
    margin-left: 30px
    z-index: 2
    position: relative

  &__item
    display: inline
    margin-right: 16px
    color: white
    
  &__icon
    color: white
    font-size: $title1
    
.footer-newsletter
  position: relative
  width: 40%
  float: right
  margin-top: -10px
  margin-right: 12%
  z-index: 10

  .newsletter, .newsletter .meta-text
    color: white

.footer-card
  position: relative

.footer
  &__card-author
    position: relative
    z-index: 6
    margin-left: 8px
    margin-right: 8px

.watermark-logo
  position: absolute
  top: -150px
  left: -30px
  width: 472px
  height: 429px
  background-image: url('/watermark-logo.png')
  background-size: cover
  background-repeat: no-repeat
  z-index: 5

.footer-nav
  padding-right: 4vw !important
  z-index: 6

  &__box
    text-align: right

  .title
    color: white
    font-weight: bold
    font-size: $mediumText

.footer-nav1, .footer-nav2
  margin-top: 10px

  &__item
    font-size: $smallText
    color: white

    a
      float: right
      display: block
      width: 85%
      padding: 6px 4px 
      margin-bottom: 3px

      &:hover
        text-decoration: underline
        color: white

.footer-copy
  color: white
  font-size: 11px
  text-align: right
  padding-top: 50px
  padding-right: 4vw !important

  a:hover
    color: #3eaf7c

@media (max-width: $mobile)
  .footer-box2
    height: 110px

  .footer-card
    order: 2
    margin: 40px 0

  .footer-copy
    order: 3
    text-align: center
    padding-top: 10px
  
  .footer-nav
    order: 1

  .footer-nav__box--1.column
    text-align: left
    padding-left: 5vw !important
  
  .footer-nav__box--2.column
    padding-right: 5vw !important

  .footer-nav1__item a
    float: left

  .footer-social__list
    position: relative
    left: 50%
    margin-top: 5%
    transform: translateX(-50%)

  .footer-newsletter
    display: none


@media (max-width: $max-tablet)
  .footer-newsletter
    width: 50%
    margin-right: 8%

@media (min-width: $min-xlarge)
  .footer-box1
    height: 249px

</style>