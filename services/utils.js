import config from '@source/.vuepress/config'

export function getImagePost (path, source) {
  const slug = getSlug(path)
  const date = new Date(source.frontmatter.created_at)
  return config.themeConfig.cdn ? `${config.themeConfig.cdn}/${date.getFullYear()}/${date.getMonth() + 1}/${slug}` : `/images/posts/${date.getFullYear()}/${date.getMonth() + 1}/${slug}`
}

export function getSlug (path) {
  const [slug] = path.match(/[\w-(.html)]+$/g)
  return slug.replace('.html', '')
}

export function filterPages (pages, type) {
  return pages.filter(page => {
    return page.frontmatter.view === type
  })
}

export function sortArrayByProp (arr, prop, orderBy = 'asc') {
  const result = arr.sort((a, b) => {
    return a[prop] - b[prop] 
  })
  if (orderBy.toLowerCase() === 'desc') return result.reverse()
  return result
}

export function getTime (date) {
  return getDate(date).getTime()
}

export function getDate (date) {
  return (date instanceof Date ? date : new Date(date.replace(/\s+/g, 'T')))
}