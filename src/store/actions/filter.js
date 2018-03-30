export const SHOW_WAITING = 'SHOW_WAITING'
export const SHOW_ONLY_LOADED = 'SHOW_ONLY_LOADED'
export const SHOW_ALL = 'SHOW_ALL'

export const showWainting = () => ({
  type: SHOW_WAITING
})

export const showOnlyLoaded = () => ({
  type: SHOW_ONLY_LOADED
})

export const showAll = () => ({
  type: SHOW_ALL
})
