<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    
    <div class="item-details">
      <h4 class="item-name">{{ item.name }}</h4>
      <p class="item-price">${{ item.price }}</p>
    </div>
    
    <div class="quantity-controls">
      <button 
        class="quantity-btn"
        @click="decreaseQuantity"
        :disabled="item.quantity <= 1"
      >
        -
      </button>
      <span class="quantity">{{ item.quantity }}</span>
      <button 
        class="quantity-btn"
        @click="increaseQuantity"
      >
        +
      </button>
    </div>
    
    <div class="item-total">
      ${{ (item.price * item.quantity).toFixed(2) }}
    </div>
    
    <button class="remove-btn" @click="$emit('remove-item', item.id)">
      ×
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['update-quantity', 'remove-item'],
  methods: {
    increaseQuantity() {
      this.$emit('update-quantity', {
        productId: this.item.id,
        quantity: this.item.quantity + 1
      })
    },
    
    decreaseQuantity() {
      this.$emit('update-quantity', {
        productId: this.item.id,
        quantity: this.item.quantity - 1
      })
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 16px;
}

.item-price {
  color: #666;
  font-size: 14px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f7;
  border-radius: 8px;
  padding: 5px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: 700;
  font-size: 16px;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #ff3b30;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: rgba(255, 59, 48, 0.1);
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .item-details {
    min-width: 150px;
  }
  
  .quantity-controls {
    order: 1;
  }
  
  .item-total {
    order: 2;
    margin-left: auto;
  }
  
  .remove-btn {
    order: 3;
  }
}
</style>