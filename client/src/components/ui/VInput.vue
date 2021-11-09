<template>
  <input
    type="text"
    class="
      border border-gray-300
      rounded
      outline-none
      focus:border-gray-400
      px-2
      py-1
      w-auto
    "
    :value="value"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: {},
    placeholder: {
      type: String,
      default: 'Input a value...',
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
