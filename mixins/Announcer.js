import Vue from 'vue'

export default {
  data () {
    return {
      announcerHasLoaded: false
    }
  },

  mounted () {
    import('vue-announcer').then(module => {
      Vue.use(module.default)
      this.announcerHasLoaded = true
    })
  
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.$announcer.set(document.title.trim() + ' ' + this.$t('has_loaded'))
      }, 2500)
    })
  }
}