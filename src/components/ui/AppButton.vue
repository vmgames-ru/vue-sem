<template>
  <button 
    :class="['app-button', `app-button--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.app-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.app-button--primary {
  background: #007aff;
  color: white;
}

.app-button--primary:hover:not(:disabled) {
  background: #0056cc;
}

.app-button--secondary {
  background: #f5f5f7;
  color: #000;
}

.app-button--secondary:hover:not(:disabled) {
  background: #e5e5e7;
}

.app-button--danger {
  background: #ff3b30;
  color: white;
}

.app-button--danger:hover:not(:disabled) {
  background: #d70015;
}

.app-button:disabled {
  background: #c7c7cc;
  color: #8e8e93;
  cursor: not-allowed;
}
</style>