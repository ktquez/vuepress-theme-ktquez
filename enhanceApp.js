import { filterPages, sortArrayByProp } from '@theme/services/utils'
import { post as PostTransformer } from '@theme/transformers/post'
import Translation from '@theme/plugins/Translation'

export default ({ Vue, siteData }) => {
  Vue.prototype.$themeConfig = siteData.themeConfig
  Vue.prototype.$posts = getPosts(siteData.pages)
  Vue.prototype.$categories = getCategories(siteData.pages)
  Vue.prototype.$authors = getAuthors(siteData.pages)

  Vue.use(Translation)

  // Global components to use in markdown
  Vue.component('lazy-load', () => import('@theme/components/lazy/load'))
}

function getPosts (pages) {
  const posts = filterPages(pages, 'post', true)
  return sortArrayByProp(PostTransformer(posts), 'created_time', 'desc')
}

function getAuthors (pages) {
  return filterPages(pages, 'author')
}

function getCategories (pages) {
  return filterPages(pages, 'category')
}
