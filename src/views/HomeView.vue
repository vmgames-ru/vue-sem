<template>
  <div class="home-view">
    <div class="container">
      <!-- Поиск и фильтры -->
      <div class="filters-section">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск товаров..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        
        <div class="filters-row">
          <select v-model="selectedCategory" class="filter-select">
            <option value="">Все категории</option>
            <option value="iphone">iPhone</option>
            <option value="ipad">iPad</option>
            <option value="macbook">MacBook</option>
            <option value="watch">Apple Watch</option>
          </select>
          
          <select v-model="sortBy" class="filter-select">
            <option value="name">По названию</option>
            <option value="price-asc">По цене (возр.)</option>
            <option value="price-desc">По цене (убыв.)</option>
          </select>
          
          <label class="checkbox-label">
            <input v-model="inStockOnly" type="checkbox" />
            Только в наличии
          </label>
        </div>
      </div>

      <!-- Состояние загрузки -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Загружаем товары...</p>
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="error" class="error-state">
        <p>Ошибка: {{ error }}</p>
        <button @click="fetchProducts" class="retry-button">Попробовать снова</button>
      </div>

      <!-- Список товаров -->
      <div v-else class="products-section">
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <p>Товары не найдены</p>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ProductCard from '@/components/features/ProductCard.vue'

export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      inStockOnly: false,
      searchTimeout: null
    }
  },
  computed: {
    ...mapState('products', ['loading', 'error']),
    ...mapGetters('products', ['filteredProducts']),
    
    filters() {
      return {
        category: this.selectedCategory,
        inStock: this.inStockOnly
      }
    }
  },
  watch: {
    selectedCategory() {
      this.updateFilters()
    },
    inStockOnly() {
      this.updateFilters()
    },
    sortBy() {
      this.updateSortBy()
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'updateFilters', 'updateSortBy', 'searchProducts']),
    ...mapActions('cart', ['addToCart']),
    ...mapActions('favorites', ['toggleFavorite']),
    
    handleSearch() {
      // Дебаунс поиска
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.searchProducts(this.searchQuery)
      }, 300)
    },
    
    updateFilters() {
      this.updateFilters(this.filters)
    },
    
    updateSortBy() {
      this.updateSortBy(this.sortBy)
    }
  }
}
</script>

<style scoped>
.home-view {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.filters-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #007aff;
}

.filters-row {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  font-size: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  padding: 10px 20px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.retry-button:hover {
  background: #0056cc;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>