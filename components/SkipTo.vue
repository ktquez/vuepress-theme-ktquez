<template>
  <a class="vue-skip-to" :href="to" v-text="text"></a>
</template>

<script>
export default {
  name: 'VueSkipTo',
  
  props: {
    text: {
      type: String,
      default: 'Skip to main content'
    },
    to: {
      type: String,
      default: '#main'
    }
  },
  
  mounted () {
    this.init()
  },

  destroyed () {
    window.removeEventListener('hashchange', this.makeFocus, false)
  },
  
  methods: {
    init () {
      window.addEventListener('hashchange', this.makeFocus, false)
      if (location.hash && location.hash.substring(1)) this.makeFocus()
    },

    makeFocus () {
      this.focusElement(location.hash.substring(1))
    },

    focusElement (id) {
      if (!id) return
      let element = window.document.getElementById(id)
      if (element) {
        if (!/^(a|select|input|button|textarea)/i.test(element.tagName.toLowerCase())) {
          element.setAttribute('tabindex', -1)
        }
        element.focus()
      }
    }
  }
}
</script>

<style>
.vue-skip-to {
  position: absolute;
  left: -10000px;
  top: 0;
  z-index: 1000;
  min-width: 1px;
  min-height: 1px;
  overflow: hidden;
  padding: 8px 10px;
  color: #fff
}
.vue-skip-to:focus {
  background-color: #800000;
  left: 0;
}
</style>

