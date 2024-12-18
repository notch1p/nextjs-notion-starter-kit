import { type Block } from 'notion-types'

// import { defaultMapImageUrl } from 'react-notion-x'
import { defaultPageCover, defaultPageIcon } from './config'

const defaultMapImageUrl = (url, block) => {
  if (!url) {
    return null
  }
  if (url.startsWith('data:')) {
    return url
  }
  if (
    url.startsWith('https://flexio.blob.core.windows.net') ||
    url.startsWith('https://r2.notch1p.xyz') ||
    url.startsWith('https://images.unsplash.com') ||
    url.startsWith('https://www.gravatar.com') ||
    url.startsWith('https://notch1p.xyz')
  )
    return url
  try {
    const u = new URL(url)
    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com')
    ) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        return url
      }
    }
  } catch {
    /* empty */
  }
  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`
  }
  url = `https://www.notion.so${
    url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
  }`
  const notionImageUrlV2 = new URL(url)
  let table = block.parent_table === 'space' ? 'block' : block.parent_table
  if (table === 'collection' || table === 'team') {
    table = 'block'
  }
  notionImageUrlV2.searchParams.set('table', table)
  notionImageUrlV2.searchParams.set('id', block.id)
  notionImageUrlV2.searchParams.set('cache', 'v2')
  url = notionImageUrlV2.toString()
  return url
}

export const mapImageUrl = (url: string, block: Block) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  return defaultMapImageUrl(url, block)
}
