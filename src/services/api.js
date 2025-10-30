const API_BASE_URL = 'http://localhost:3001'

// Обертка для fetch с обработкой ошибок
async function request(url, options = {}) {
  try {
    const fullUrl = `${API_BASE_URL}${url}`
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Проверяем, есть ли контент для парсинга
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return data
    } else {
      return await response.text()
    }
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(`Failed to fetch: ${error.message}`)
  }
}

export const productService = {
  // Получить все товары с поддержкой фильтрации, поиска и сортировки
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/items${queryString ? `?${queryString}` : ''}`
    return await request(url)
  },

  // Получить один товар по ID
  async getProductById(id) {
    return await request(`/items/${id}`)
  },

  // Оформить заказ
  async createOrder(orderData) {
    return await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },

  // Поиск товаров
  async searchProducts(query) {
    const params = query ? { search: query } : {}
    const queryString = new URLSearchParams(params).toString()
    const url = `/items${queryString ? `?${queryString}` : ''}`
    return await request(url)
  },

  // Создать товар (для админки)
  async createProduct(productData) {
    return await request('/items', {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  },

  // Обновить товар
  async updateProduct(id, productData) {
    return await request(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  },

  // Удалить товар
  async deleteProduct(id) {
    return await request(`/items/${id}`, {
      method: 'DELETE',
    })
  }
}

// Для совместимости с существующим кодом
export default {
  request,
  productService
}