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

export function twitterWidgetApi () {
  window.twttr = ((d, s, id) => {
    var fjs = d.getElementsByTagName(s)[0]
    var t = window.twttr || {}
    if (d.getElementById(id)) return t
    let js = d.createElement(s)
    js.id = id
    js.src = 'https://platform.twitter.com/widgets.js'
    fjs.parentNode.insertBefore(js, fjs)
    t._e = []
    t.ready = (f) => {
      t._e.push(f)
    }
    return t
  })(document, 'script', 'twitter-wjs')
}
