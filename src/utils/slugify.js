export const slugify = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single
}

export const unslugify = (slug) => {
  if (!slug) return ''
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
