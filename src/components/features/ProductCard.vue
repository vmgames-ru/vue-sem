<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <button 
        class="favorite-button"
        :class="{ active: isFavorite }"
        @click="$emit('toggle-favorite', product)"
      >
        ♥
      </button>
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-details">
        <span class="product-price">${{ product.price }}</span>
        <span class="product-stock" :class="{ 'out-of-stock': !product.inStock }">
          {{ product.inStock ? 'В наличии' : 'Нет в наличии' }}
        </span>
      </div>
      
      <button 
        class="add-to-cart-button"
        :disabled="!product.inStock"
        @click="$emit('add-to-cart', product)"
      >
        {{ product.inStock ? 'В корзину' : 'Нет в наличии' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFavorite() {
      return this.$store.getters['favorites/isFavorite'](this.product.id)
    }
  },
  emits: ['add-to-cart', 'toggle-favorite']
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f5f5f7;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
}

.favorite-button:hover,
.favorite-button.active {
  background: #ff3b30;
  color: white;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.product-stock {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background: #34c759;
  color: white;
}

.product-stock.out-of-stock {
  background: #ff3b30;
}

.add-to-cart-button {
  width: 100%;
  padding: 12px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-button:hover:not(:disabled) {
  background: #0056cc;
}

.add-to-cart-button:disabled {
  background: #c7c7cc;
  cursor: not-allowed;
}
</style>