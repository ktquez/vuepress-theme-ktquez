export default [
  {
    active: true,
    name: 'facebook',
    label: 'Facebook',
    link () {
      return '#'
    },
    meta (title, link, image, description, caption) {
      return {
        name: encodeURI(title),
        link: encodeURI(link),
        picture: encodeURI(image),
        caption: encodeURI(caption),
        description: encodeURI(description)
      }
    }
  },
  {
    active: true,
    name: 'twitter',
    label: 'Twitter',
    link (title, link, image, description, via) {
      return encodeURI(`https://twitter.com/intent/tweet?url=${link}&amp;text=${title}&amp;via=${via}`)
    },
    target: '_blank'
  },
  {
    active: false,
    name: 'linkedin',
    label: 'linkedin',
    link (title, link, image, description) {
      return encodeURI(`https://www.linkedin.com/shareArticle?mini=true&amp;url=${link}&amp;title=${title}&amp;summary=${description}&amp;source=`)
    },
    target: '_blank'
  },
  {
    active: true,
    name: 'google',
    label: 'Google plus',
    link (title, link) {
      return encodeURI(`https://plus.google.com/share?url=${link}`)
    },
    target: '_blank'
  }
]
