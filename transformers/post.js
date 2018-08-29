import mappet from 'mappet'
import { getImagePost, getTime } from '@theme/services/utils'

const schema = {
  title: 'title',
  key: 'key',
  path: 'path',
  lang: 'frontmatter.lang',
  demo: 'frontmatter.demo',
  audio: 'frontmatter.audio',
  author: 'frontmatter.author',
  excerpt: 'frontmatter.excerpt',
  categories: 'frontmatter.categories',
  tags: 'frontmatter.tags',
  created_at: 'frontmatter.created_at',
  updated_at: 'frontmatter.updated_at',
  cover: 'frontmatter.cover',
  coverExt: 'frontmatter.coverExt',
  coverAlt: 'frontmatter.coverAlt',
  video: 'frontmatter.video',
  coverName: { path: 'path', modifier: getImagePost },
  created_time: { path: 'frontmatter.created_at', modifier: getTime }
}

export function post (data) {
  const mapper = mappet(schema)
  return data.map(item => {
    return mapper(item)
  })
}