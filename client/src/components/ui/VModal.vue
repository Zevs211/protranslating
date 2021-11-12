<template>
  <div
    class="
      fixed
      inset-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-25
    "
    @click.self="closeModal"
  >
    <div
      class="
        flex flex-col
        max-w-xl
        w-auto
        justify-between
        bg-white
        border-solid border-2 border-gray-300
      "
    >
      <div
        class="
          flex
          justify-centre
          items-center
          w-full
          px-4
          py-2
          text-2xl text-blue-400
          border-b
        "
      >
        <slot name="header"></slot>
      </div>
      <div class="py-6">
        <slot />
      </div>
      <div class="flex justify-between items-center w-full py-2 px-4 border-t">
        <v-button v-if="options.delete" @click.native="onRemove" type="danger"
          >delete</v-button
        >
        <div class="w-full flex justify-end items-center">
          <v-button @click.native="onSave" class="mr-4">save</v-button>
          <v-button @click.native="onCancel">cancel</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from './VButton.vue';

export default {
  name: 'VModal',
  components: {
    VButton,
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        delete: false,
        action: 'create',
      }),
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeModal() {
      this.$emit('on-modal-close');
    },
    onSave() {
      this.$emit(`on-${this.options.action}`);
    },
    onCancel() {
      this.$emit('on-modal-close');
    },
    onRemove() {
      this.$emit('on-remove');
    },
  },
};
</script>
