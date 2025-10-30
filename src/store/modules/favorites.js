const state = {
  items: JSON.parse(localStorage.getItem('favorites')) || []
}

const getters = {
  favoriteItems: (state) => state.items,
  
  favoritesCount: (state) => state.items.length,
  
  isFavorite: (state) => (productId) => {
    return state.items.some(item => item.id === productId)
  }
}

const mutations = {
  ADD_TO_FAVORITES(state, product) {
    if (!state.items.some(item => item.id === product.id)) {
      state.items.push(product)
      localStorage.setItem('favorites', JSON.stringify(state.items))
    }
  },
  
  REMOVE_FROM_FAVORITES(state, productId) {
    state.items = state.items.filter(item => item.id !== productId)
    localStorage.setItem('favorites', JSON.stringify(state.items))
  },
  
  TOGGLE_FAVORITE(state, product) {
    const index = state.items.findIndex(item => item.id === product.id)
    if (index > -1) {
      state.items.splice(index, 1)
    } else {
      state.items.push(product)
    }
    localStorage.setItem('favorites', JSON.stringify(state.items))
  }
}

const actions = {
  toggleFavorite({ commit }, product) {
    commit('TOGGLE_FAVORITE', product)
  },
  
  addToFavorites({ commit }, product) {
    commit('ADD_TO_FAVORITES', product)
  },
  
  removeFromFavorites({ commit }, productId) {
    commit('REMOVE_FROM_FAVORITES', productId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}