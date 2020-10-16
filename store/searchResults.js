export const state = () => ({
  list: null
})

export const mutations = {
  add (state, results) {
    state.list = results
  },
  remove (state) {
    state.list = null
  }
}
