export function toggle_truncate(el:Event) {
    if (el.target instanceof Element) {
      el.target.classList.toggle('truncate');
    }
}

export function show_meta(meta:object) {
  // Just list all k:v for now
  let meta_str = "<ul>"
  for (const [key, value] of Object.entries(meta)) {
    meta_str += `<li>${key}: ${value}</li>\n`
  }
  return meta_str + "</ul>"
}