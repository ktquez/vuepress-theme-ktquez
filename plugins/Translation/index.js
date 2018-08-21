export default function translation (Vue) {
  const langs = {
    "pt-br": require('./locales/pt-br.js'),
    en: require('./locales/en.js')
  }

  Vue.mixin({
    computed: {
      getTranslation () {
        return {...langs[this.$lang], ...this.$themeLocaleConfig.translation}
      }
    },
    methods: {
      $t (key) {
        return this.getTranslation[key] || key
      }
    }
  })
}