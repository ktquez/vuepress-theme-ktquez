import config from '@source/.vuepress/config'

export function cdn (value) {
  const getImgPath = getImagePath(value)
  return config.themeConfig.cdn ? `${config.themeConfig.cdn}${getImgPath}` : '/images' + getImgPath
}

export function getImagePath (value) {
  return value.replace('.html', '')
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
  return new Date(date).getTime()
}
