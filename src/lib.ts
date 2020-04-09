export function get(selector: string, parentElement?: HTMLElement) {
  const _parent = parentElement || document

  const elements = Array.from(_parent.querySelectorAll(selector)) as HTMLInputElement[]

  return {
    first: elements[0],
    all: elements,
  }
}

export function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
