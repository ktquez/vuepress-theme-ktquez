export default {
  data () {
    return {
      contentElement: ''
    }
  },

  mounted () {
    [this.contentElement] = this.$refs.content.children
  },

  methods: {
    getContent (type) {
      return this.contentElement[type]
    }
  }
}
