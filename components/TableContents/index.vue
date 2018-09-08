<template>
  <div class="table-contents">
    <h3 id="table-of-content" class="table-contents__title">{{ $t('table_content') }}</h3>
    <nav>
      <ol class="table-contents__list">
        <li 
          class="table-contents__item" 
          v-for="header in headers" 
          :key="header.slug"
          v-if="header.level < 3">
          <a 
            class="table-contents__link" 
            :href="`#${header.slug}`" 
            @click.prevent="scrollToHeader(`${header.slug}`)" 
            :title="header.title">
              <span>{{ header.title }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'TableContents',

    props: {
      headers: {
        type: Array,
        required: true
      }
    },

    methods: {
      scrollToHeader (selector) {
        const el = document.getElementById(selector)
        let i = window.scrollY;
        let int = setInterval(() => {
          window.requestAnimationFrame(() => {
            window.scrollTo({ top: i })
          })
          i += 50;
          if (i >= (el.offsetTop - 40)) clearInterval(int);
        }, 1)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.table-contents
  width: 100%

  @media (max-width: $mobile)
    max-width: 300px

  &__title
    font-size: $title1
    line-height: 1em
    margin-bottom: 30px

  &__item
    counter-increment: a
    margin-bottom: 10px

    &:before
      content: counter(a)
      border-radius: 5px
      margin-right: 4px
      background-color: $primaryColor
      color: white
      width: 25px
      padding: 4px 0      
      text-align: center
      display: inline-block
      font-weight: 700

  &__link
    color: $textColor
    text-transform: uppercase
    font-size: $mediumText
    font-weight: bold
    padding: 10px

    &:hover
      text-decoration: underline

</style>
