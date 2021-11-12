<template>
  <div>
    <div 
      v-if="checkboxProviders.length > 0"
      class="w-270 max-h-40 overflow-auto border-solid border-2 ml-24 mt-2 px-4">
      <div
        class="flex justify-between"
        v-for="(provider, index) in checkboxProviders"
        :key="index"
      >
        <v-checkbox
          @change="onClientProviderSelect"
          :id="provider._id"
          :value="provider.checked"
        />
        <div class="w-full truncate px-2">{{ provider.name }}</div>
        <div class="flex flex-end">
          <icon-edit
            class="cursor-pointer"
            @click.native="onOpenModalProvider(provider._id)"
          />
          <icon-delete
            class="cursor-pointer"
            @click.native="onRemoveProvider(provider._id)"
          />
        </div>
      </div>
    </div>
    <v-modal 
      v-if="isModalProviderOpened"
      :options="{ delete: false, action: 'update' }"
      @on-modal-close="isModalProviderOpened = false"
      @on-update="onUpdateProvider"
    >
      <template v-slot:header>Provider</template>
      <v-input v-model="provider.name" class="mx-4"/>
    </v-modal>
  </div>
</template>

<script>
import VCheckbox from './ui/VCheckbox.vue';
import IconDelete from './icons/IconDelete.vue';
import IconEdit from './icons/IconEdit.vue';
import VModal from './ui/VModal.vue';
import VInput from './ui/VInput.vue';
import { updateProvider, deleteProvider } from '../api/providers';

const DEFAULT_PROVIDER = {
  _id: '',
  name: '',
};

export default {
  name: 'VCheckboxList',
  components: {
    VCheckbox,
    IconDelete,
    IconEdit,
    VModal,
    VInput,
  },
  props: {
    providers: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isModalProviderOpened: false,
    provider: DEFAULT_PROVIDER,
  }),
  computed: {
    checkboxProviders() {
      return this.providers.map((p) => ({
        _id: p._id,
        name: p.name,
        checked: this.value.some((provider) => provider._id === p._id),
      }));
    },
  },
  methods: {
    async onClientProviderSelect({ _id, value }) {
      if (value) {
        const providerExists = this.value.some((p) => p._id === _id);
        if (providerExists) return;
        const provider = this.providers.find((p) => p._id === _id);
        this.$emit('input', [...this.value, provider]);
      } else {
        const filteredProviders = this.value.filter(
          (provider) => provider._id !== _id,
        );
        this.$emit('input', filteredProviders);
      }
    },
    async onOpenModalProvider(_id) {
      this.isModalProviderOpened = true;
      this.provider = this.providers.find((provider) => provider._id === _id);
    },
    async onUpdateProvider() {
      await updateProvider(this.provider._id, this.provider);
      this.$emit('on-providers-update');
      this.provider = DEFAULT_PROVIDER;
      this.isModalProviderOpened = false;
    },
    async onRemoveProvider(id) {
      await deleteProvider(id);
      this.$emit('on-providers-update');
    },
  },
};
</script>
