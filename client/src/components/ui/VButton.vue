<template>
  <div
    type="button"
    class="
      flex
      items-center
      rounded-md
      shadow-md
      w-min
      whitespace-nowrap
      h-8
      px-5
      cursor-pointer
      select-none
    "
    :class="buttonColor"
  >
    <slot />
  </div>
</template>

<script>
const typeMap = {
  primary: 'bg-gray-200 hover:bg-gray-400 active:bg-gray-300',
  danger: 'bg-red-300 text-white hover:bg-red-400 active:bg-red-300',
};

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    buttonColor() {
      return typeMap[this.type];
    },
  },
};
</script>