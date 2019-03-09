import mappet from 'mappet'
import { getImagePost, getTime, getDate } from '@theme/services/utils'

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
  created_at: { path: 'frontmatter.created_at', modifier: getDate },
  updated_at: { path: 'frontmatter.updated_at', modifier: getDate },
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