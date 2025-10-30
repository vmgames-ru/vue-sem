<template>
  <div class="cart-view">
    <div class="container">
      <h1 class="page-title">Корзина</h1>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Ваша корзина пуста</p>
        <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
            @update-quantity="updateQuantity"
            @remove-item="removeFromCart"
          />
        </div>
        
        <div class="cart-summary">
          <div class="summary-card">
            <h3>Итого</h3>
            <div class="summary-row">
              <span>Товары ({{ totalItems }})</span>
              <span>${{ cartTotalPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Общая сумма</span>
              <span>${{ cartTotalPrice.toFixed(2) }}</span>
            </div>
            <button class="checkout-button" @click="checkout">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from '@/components/features/CartItem.vue'
import { productService } from '@/services/api'

export default {
  name: 'CartView',
  components: {
    CartItem
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotalPrice', 'totalItemsInCart']),
    
    totalItems() {
      return this.totalItemsInCart
    }
  },
  methods: {
    ...mapActions('cart', ['updateQuantity', 'removeFromCart', 'clearCart']),
    
    async checkout() {
      try {
        const orderData = {
          items: this.cartItems,
          total: this.cartTotalPrice,
          timestamp: new Date().toISOString()
        }
        
        await productService.createOrder(orderData)
        
        // Очищаем корзину после успешного заказа
        this.clearCart()
        
        alert('Заказ успешно оформлен!')
        this.$router.push('/')
      } catch (error) {
        alert('Ошибка при оформлении заказа: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.cart-view {
  padding: 40px 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.empty-cart p {
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

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-summary {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.summary-card h3 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.summary-row.total {
  border-bottom: none;
  font-weight: 700;
  font-size: 18px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #f0f0f0;
}

.checkout-button {
  width: 100%;
  padding: 15px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
}

.checkout-button:hover {
  background: #0056cc;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-summary {
    position: static;
  }
}
</style>