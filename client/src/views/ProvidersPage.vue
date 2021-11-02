<template>
  <div class="flex flex-col w-full h-screen relative">
    <div class="flex flex-col justify-center items-center">
      <div
        class="
          flex flex-row
          justify-between
          items-center
          w-full
          h-16
          px-10
          bg-blue-100
        "
      >
        <div class="text-2xl text-blue-400">
          <router-link :to="{ name: 'clients' }">Client</router-link> |
          <router-link :to="{ name: 'providers' }">Providers</router-link>
        </div>
        <v-button @click.native="modalOpen">New Provider</v-button>
      </div>
      <v-modal
        class="w-full"
        v-if="isModalOpened"
        @on-modal-close="modalClose"
        @on-create="onCreate"
        @on-update="onUpdate"
        @on-remove="onRemove"
        :is-new="isNew"
      >
        <template v-slot:header>{{ modalHeader }}</template>
        <div>
          <div class="flex items-center px-12">
            <span class="bold w-24">Name</span>
            <v-input class="ml-4" v-model="provider.name" />
          </div>
        </div>
      </v-modal>
      <div class="w-full px-4">
        <v-table @select-row="selectRow" :headers="headers" :rows="providers" />
      </div>
    </div>
  </div>
</template>

<script>
import VModal from '../components/VModal.vue';
import VInput from '../components/ui/VInput.vue';
import VButton from '../components/ui/VButton.vue';
import {
  getProviders,
  postProvider,
  updateProvider,
  deleteProvider,
} from '../api/providers';
import VTable from '../components/VTable.vue';

export default {
  components: {
    VButton,
    VTable,
    VModal,
    VInput,
  },
  data() {
    return {
      headers: [
        { title: 'ID', value: '_id' },
        { title: 'Name', value: 'name' },
      ],
      provider: { id: '', name: '' },
      providers: [],
      isModalOpened: false,
      isNew: true,
    };
  },
  computed: {
    modalHeader() {
      return this.isNew ? 'New Provider' : 'Edit Provider';
    },
  },
  mounted() {
    this.fetchProviders();
  },
  methods: {
    async fetchProviders() {
      this.providers = await getProviders();
    },
    resetFields() {
      Object.keys(this.provider).forEach((key) => {
        this.provider[key] = '';
      });
    },
    async onCreate() {
      const payload = {};
      Object.entries(this.provider).forEach((entry) => {
        payload[entry[0]] = entry[1];
      });
      delete payload._id;
      await postProvider(payload);
      this.fetchProviders();
      this.resetFields();
      this.modalClose();
    },
    async onUpdate() {
      const payload = {};
      Object.entries(this.provider).forEach((entry) => {
        payload[entry[0]] = entry[1];
      });
      await updateProvider(payload);
      this.fetchProviders();
      this.resetFields();
      this.modalClose();
    },
    selectRow(row) {
      this.isNew = false;
      Object.entries(row).forEach((entry) => {
        this.provider[entry[0]] = row[entry[0]];
      });
      this.isModalOpened = true;
    },
    modalOpen() {
      this.isNew = true;
      this.isModalOpened = true;
    },
    modalClose() {
      this.isModalOpened = false;
      this.resetFields();
    },
    async onRemove() {
      await deleteProvider(this.provider._id);
      this.fetchProviders();
      this.resetFields();
      this.modalClose();
    },
  },
};
</script>

<style>
</style>