import { createStore } from 'vuex'
import cart from './modules/cart'
import favorites from './modules/favorites'
import products from './modules/products'

export default createStore({
  modules: {
    cart,
    favorites,
    products
  }
})