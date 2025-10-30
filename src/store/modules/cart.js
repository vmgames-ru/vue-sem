const state = {
  items: JSON.parse(localStorage.getItem('cart')) || []
}

const getters = {
  cartItems: (state) => state.items,
  
  totalItemsInCart: (state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
  
  cartTotalPrice: (state) => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  isInCart: (state) => (productId) => {
    return state.items.some(item => item.id === productId)
  }
}

const mutations = {
  ADD_TO_CART(state, product) {
    const existingItem = state.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      state.items.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  
  REMOVE_FROM_CART(state, productId) {
    state.items = state.items.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId)
      } else {
        item.quantity = quantity
      }
    }
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  
  CLEAR_CART(state) {
    state.items = []
    localStorage.removeItem('cart')
  },
  
  SET_CART_ITEMS(state, items) {
    state.items = items
    localStorage.setItem('cart', JSON.stringify(items))
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId)
  },
  
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}