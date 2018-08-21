<script>
  const timeago = require('time-ago')

  export default {
    name: 'TimeProvider',

    props: {
      type: {
        type: String,
        required: true
      },
      date: {
        type: [Date, String],
        default () {
          return new Date()
        }
      },
      content: String,
      lang: String
    },

    data () {
      return {
        result: null
      }
    },

    created () {
      import(`@theme/components/Time/locales/${this.lang || this.$lang}.js`).then(module => {
        const data = this.content || (this.date instanceof Date ? this.date : new Date(this.date))
        this.result = this.translate(timeago[this.type](data), module.default)
      })
    },

    methods: {
      translate (result, translate) {
        Object.keys(translate).forEach(key => {
          result = result.replace(key, translate[key])
        })
        return result
      }
    },

    render () {
      return this.$scopedSlots.default({
        time: this.result
      })
    }
  }
</script>
