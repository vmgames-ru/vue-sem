import { productService } from '@/services/api'
import { mockProducts } from '@/services/mockData'

const state = {
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: { min: 0, max: 100000 },
    inStock: false
  },
  sortBy: 'name'
}

const getters = {
  allProducts: (state) => state.products,
  productsLoading: (state) => state.loading,
  productsError: (state) => state.error,
  searchQuery: (state) => state.searchQuery,
  
  filteredProducts: (state) => {
    let filtered = [...state.products]
    
    // Поиск
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      )
    }
    
    // Фильтрация по категории
    if (state.filters.category) {
      filtered = filtered.filter(product => 
        product.category === state.filters.category
      )
    }
    
    // Фильтрация по цене
    filtered = filtered.filter(product => 
      product.price >= state.filters.priceRange.min &&
      product.price <= state.filters.priceRange.max
    )
    
    // Фильтрация по наличию
    if (state.filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }
    
    // Сортировка
    switch (state.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    return filtered
  },
  
  categories: (state) => {
    const categories = new Set(state.products.map(product => product.category))
    return Array.from(categories)
  }
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  
  SET_ERROR(state, error) {
    state.error = error
  },
  
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  },
  
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters }
  },
  
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  },
  
  CLEAR_FILTERS(state) {
    state.filters = {
      category: '',
      priceRange: { min: 0, max: 100000 },
      inStock: false
    }
    state.searchQuery = ''
    state.sortBy = 'name'
  },
  
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },
  
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct)
    }
  },
  
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter(p => p.id !== productId)
  }
}

const actions = {
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      // Пытаемся получить данные с API
      const products = await productService.getProducts()
      commit('SET_PRODUCTS', products)
    } catch (error) {
      console.log('API недоступен, используем моковые данные:', error.message)
      // Если API недоступно, используем моковые данные
      commit('SET_PRODUCTS', mockProducts)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async searchProducts({ commit }, query) {
    commit('SET_SEARCH_QUERY', query)
    
    // Если нужно делать поиск на сервере:
    // try {
    //   const products = await productService.searchProducts(query)
    //   commit('SET_PRODUCTS', products)
    // } catch (error) {
    //   commit('SET_ERROR', error.message)
    // }
  },
  
  updateFilters({ commit }, filters) {
    commit('SET_FILTERS', filters)
  },
  
  updateSortBy({ commit }, sortBy) {
    commit('SET_SORT_BY', sortBy)
  },
  
  clearFilters({ commit }) {
    commit('CLEAR_FILTERS')
  },
  
  async addProduct({ commit }, product) {
    try {
      // Если бэкенд доступен, сохраняем там
      const newProduct = await productService.createProduct(product)
      commit('ADD_PRODUCT', newProduct)
      return newProduct
    } catch (error) {
      // Локальное добавление для демо
      const newProduct = {
        ...product,
        id: Date.now() // Временный ID
      }
      commit('ADD_PRODUCT', newProduct)
      return newProduct
    }
  },
  
  async updateProduct({ commit }, product) {
    try {
      const updatedProduct = await productService.updateProduct(product.id, product)
      commit('UPDATE_PRODUCT', updatedProduct)
      return updatedProduct
    } catch (error) {
      // Локальное обновление для демо
      commit('UPDATE_PRODUCT', product)
      return product
    }
  },
  
  async deleteProduct({ commit }, productId) {
    try {
      await productService.deleteProduct(productId)
      commit('DELETE_PRODUCT', productId)
    } catch (error) {
      // Локальное удаление для демо
      commit('DELETE_PRODUCT', productId)
    }
  },
  
  // Действие для сброса состояния
  resetProductsState({ commit }) {
    commit('SET_PRODUCTS', [])
    commit('SET_LOADING', false)
    commit('SET_ERROR', null)
    commit('SET_SEARCH_QUERY', '')
    commit('CLEAR_FILTERS')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}