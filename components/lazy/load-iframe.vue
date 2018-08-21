<template>
  <iframe v-bind="getAttributes" />
</template>

<script>
  import LoadDataMixin from './mixin'
  
  export default {
    name: 'LazyLoadIFrame',
    
    mixins: [LoadDataMixin],

    data () {
      return {
        default: {
          width: '100%',
          height: '400',
          src: '',
          class: 'lazy-load-iframe',
          allowfullscreen: true,
          frameborder: 0
        }
      }
    }
  }
</script>
