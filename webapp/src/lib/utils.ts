export function toggle_truncate(el:Event) {
    if (el.target instanceof Element) {
      el.target.classList.toggle('truncate');
    }
}