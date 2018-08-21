<template>
  <img v-bind="getAttributes" />
</template>

<script>
  import LoadDataMixin from './mixin'

  export default {
    name: 'LazyLoadImage',

    mixins: [LoadDataMixin],

    data () {
      return {
        default: {
          class: 'lazy-load-image',
          src: '',
          alt: ''
        }
      }
    }
  }
</script>
