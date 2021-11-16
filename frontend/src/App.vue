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
        <div class="text-2xl text-blue-400">Client</div>
        <v-button @click.native="modalOpen">New Client</v-button>
      </div>
    </div>
    <div class="px-4">
      <v-table @select-row="selectRow" :headers="headers" :rows="clients" />
    </div>
    <v-modal
      class="w-full"
      v-if="isModalOpened"
      :options="{
        delete: !isClientNew,
        action: isClientNew ? 'create' : 'update'
      }"
      @on-modal-close="onModalClose"
      @on-create="onCreate"
      @on-update="onUpdate"
      @on-remove="onRemove"
    >
      <template v-slot:header>{{ modalHeader }}</template>
      <div>
        <div class="w-full flex items-center px-4">
          <span class="w-1/6 text-right mr-4">Name</span>
          <v-input
            class="w-5/6"
            v-model="client.name"
          />
        </div>
        <div class="w-full flex items-center mt-2 px-4">
          <span class="w-1/6 text-right mr-4">E-mail</span>
          <v-input
            class="w-5/6"
            v-model="client.email"
          />
        </div>
        <div class="w-full flex items-center mt-2 px-4">
          <span class="w-1/6 text-right mr-4">Phone</span>
          <v-input
            class="w-5/6"
            v-model="client.phone"
          />
        </div>
        <div class="w-full flex items-center justify-between mt-2 px-4">
          <span class="w-1/6 text-right mr-4">Providers</span>
          <div class="flex w-5/6">
            <v-input
              v-model="newProviderName"
            />
            <v-button class="ml-2" @click.native="createProvider">Add</v-button>
          </div>
        </div>
        <v-checkbox-list
          :providers="providers"
          @on-providers-update="onProvidersUpdate"
          v-model="client.providers"
        />
      </div>
    </v-modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import VButton from './components/ui/VButton.vue';
import VModal from './components/ui/VModal.vue';
import VTable from './components/VTable.vue';
import VInput from './components/ui/VInput.vue';
import {
  getClients,
  postClient,
  updateClient,
  deleteClient,
} from './api/clients';
import { 
  getProviders,
  postProvider,
} from './api/providers';
import VCheckboxList from './components/VCheckboxList.vue';

export default {
  components: {
    VTable,
    VModal,
    VButton,
    VInput,
    VCheckboxList,
  },
  data() {
    return {
      isModalOpened: false,
      isClientNew: true,
      client: {
        _id: '',
        name: '',
        email: '',
        phone: '',
        providers: [],
      },
      headers: [
        {
          title: 'Name',
          value: 'name',
        },
        {
          title: 'E-mail',
          value: 'email',
        },
        {
          title: 'Phone',
          value: 'phone',
        },
        {
          title: 'Providers',
          value: 'providers',
          format: (p) => p.map((item) => item.name).join(', '),
        },
      ],
      clients: [],
      providers: [],
      newProviderName: '',
      header: '',
    };
  },
  computed: {
    modalHeader() {
      return this.isClientNew ? 'New Client' : 'Edit Client';
    },
  },
  async mounted() {
    this.clients = await getClients();
    this.providers = await getProviders();
  },
  methods: {
    async onProvidersUpdate() {
      this.providers = await getProviders();
      this.clients = await getClients();
      this.newProviderName = '';
    },
    async onCreate() {
      this.onAction(async () => postClient(this.client));
    },
    async onUpdate() {
      this.onAction(async () => updateClient(this.client._id, this.client));
    },
    async onRemove() {
      this.onAction(async () => deleteClient(this.client._id));
    },
    async onAction(fn) {
      await fn();
      this.clients = await getClients();
      this.onModalClose();
    },
    selectRow(row) {
      this.isClientNew = false;
      const client = this.clients.find((c) => c._id === row._id);
      this.client = cloneDeep(client);
      this.isModalOpened = true;
    },
    modalOpen() {
      this.isClientNew = true;
      this.isModalOpened = true;
    },
    onModalClose() {
      this.isModalOpened = false;
      this.newProviderName = '';
      this.client = {
        _id: '',
        name: '',
        email: '',
        phone: '',
        providers: [],
      };
    },
    async createProvider() {
      await postProvider({
        name: this.newProviderName,
      });
      this.newProviderName = '';
      this.providers = await getProviders();
    },
  },
};
</script>
