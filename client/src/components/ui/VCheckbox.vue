<template>
  <div>
    <input
      :id="id"
      type="checkbox"
      class="form-checkbox cursor-pointer"
      v-model="checked"
    />
  </div>
</template>

<script>
export default {
  name: 'VCheckbox',
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {},
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', { _id: this.id, value });
      },
    },
  },
};
</script>
