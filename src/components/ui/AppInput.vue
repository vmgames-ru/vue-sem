<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :class="['app-input', { 'app-input--error': error }]"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.app-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  font-family: inherit;
}

.app-input:focus {
  outline: none;
  border-color: #007aff;
}

.app-input--error {
  border-color: #ff3b30;
}

.app-input::placeholder {
  color: #8e8e93;
}
</style>