<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">
        <h1>Apple Store</h1>
      </router-link>
      
      <nav class="navigation">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/favorites" class="nav-link">Избранное</router-link>
      </nav>
      
      <div class="header-actions">
        <router-link to="/favorites" class="icon-button">
          <span class="icon">♥</span>
          <span v-if="favoritesCount > 0" class="badge">{{ favoritesCount }}</span>
        </router-link>
        
        <router-link to="/cart" class="icon-button">
          <span class="icon">🛒</span>
          <span v-if="cartItemsCount > 0" class="badge">{{ cartItemsCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('cart', ['totalItemsInCart']),
    ...mapGetters('favorites', ['favoritesCount']),
    
    cartItemsCount() {
      return this.totalItemsInCart
    }
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 80px;
}

.app-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
}

.logo h1 {
  color: #000;
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
}

.logo {
  text-decoration: none;
}

.navigation {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #007aff;
}

.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.icon {
  font-size: 20px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff3b30;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>