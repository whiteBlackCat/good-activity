export default (num = 1) => {
  let pages = getCurrentPages()
  return pages[pages.length - num - 1]
}