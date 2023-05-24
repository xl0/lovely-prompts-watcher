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



// "model": "gpt-3.5-turbo",
// "temperature": 0.7

export function model_summary(meta:object) {
  let model = meta['model'];
  let temperature = meta['temperature'];
  if (temperature) {
    model = `${model} @ t=${temperature}`;
  }
  return model;
}

export function show_tok_stats(tok_in:number, tok_out:number, tok_max:number) {
  return `${tok_in + tok_out}/${tok_max} tokens` + ((tok_in+tok_out)?` (${tok_in} in, ${tok_out} out)`:``);
}
