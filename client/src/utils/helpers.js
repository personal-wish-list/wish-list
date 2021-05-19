export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function formatUrl(url) {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split("/")[0]
    .split("?")[0];
}

