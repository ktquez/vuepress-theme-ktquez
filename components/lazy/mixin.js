
import getYouTubeID from 'get-youtube-id'

export default {
  props: {
    tag: String,
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    getAttributes () {
      const data = { ...this.default, ...this.data }
      data.src = this.youtubeEmbed(data.src) || data.src
      return data
    }
  },

  methods: {
    youtubeEmbed (src) {
      if (!src.includes('youtube.com') || this.tag !== 'iframe') return false
      const id = getYouTubeID(src)
      return `https://www.youtube.com/embed/${id}`
    }
  }
}
