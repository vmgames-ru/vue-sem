<template>
  <div class="favorites-view">
    <div class="container">
      <h1 class="page-title">Избранное</h1>
      
      <div v-if="favoriteItems.length === 0" class="empty-favorites">
        <p>В избранном пока ничего нет</p>
        <router-link to="/" class="continue-shopping">Найти товары</router-link>
      </div>
      
      <div v-else class="favorites-grid">
        <ProductCard
          v-for="product in favoriteItems"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from '@/components/features/ProductCard.vue'

export default {
  name: 'FavoritesView',
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters('favorites', ['favoriteItems'])
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    ...mapActions('favorites', ['toggleFavorite'])
  }
}
</script>

<style scoped>
.favorites-view {
  padding: 40px 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.empty-favorites {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.empty-favorites p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  padding: 12px 24px;
  background: #007aff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.continue-shopping:hover {
  background: #0056cc;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>