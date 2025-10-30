<template>
  <div :class="['app-card', `app-card--${shadow}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    shadow: {
      type: String,
      default: 'small',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  }
}
</script>

<style scoped>
.app-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.app-card--small {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-card--medium {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.app-card--large {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>