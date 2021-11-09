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
    <v-modal
      class="w-full"
      v-if="isModalOpened"
      :is-new="isNew"
      @on-modal-close="modalClose"
      @on-create="onCreate"
      @on-update="onUpdate"
      @on-remove="onRemove"
    >
      <template v-slot:header>{{ modalHeader }}</template>
      <div class="flex flex-col items-center">
        <div class="grid grid-flow-col grid-cols-5 grid-rows-4 gap-4 px-12">
          <span class="grid col-start-1 items-center col-end-2 bold">Name</span>
          <span class="grid col-start-1 items-center col-end-2 bold"
            >E-mail</span
          >
          <span class="grid col-start-1 items-center col-end-2 bold"
            >Phone</span
          >
          <span class="grid col-start-1 items-center col-end-2 bold"
            >Providers</span
          >

          <v-input
            class="grid col-start-2 col-end-6 ml-4 w-full"
            v-model="client.name"
          />
          <v-input
            class="grid col-start-2 col-end-6 ml-4 w-full"
            v-model="client.email"
          />
          <v-input
            class="grid col-start-2 col-end-6 ml-4 w-full"
            v-model="client.phone"
          />
          <v-input
            class="grid col-start-2 col-end-5 ml-4"
            v-model="provider.name"
          />
          <div class="grid row-start-4 col-start-5 col-end-7 ml-4">
            <v-button @click.native="createProvider">Add</v-button>
          </div>
        </div>
        <div
          v-if="providers.length > 0"
          class="w-270 h-auto border-solid border-2 ml-4 mt-2 px-4"
        >
          <div
            class="flex justify-between"
            v-for="(provider, index) in providers"
            :key="index"
          >
            <v-checkbox
              @change="selectClientProviders"
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
      </div>
        <v-modal-provider 
        v-if="isModalProviderOpened"
        @on-modal-close="modalCloseProvider"
        @on-update-provider="onUpdateProvider"
        >
          <template v-slot:header>Provider</template>
          <v-input v-model="newProviderName.name" class="mx-4"/>
        </v-modal-provider>
      </v-modal>
    <div class="px-4">
      <v-table @select-row="selectRow" :headers="headers" :rows="clients" />
    </div>
  </div>
</template>

<script>
import VButton from './components/ui/VButton.vue';
import VModal from './components/VModal.vue';
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
  updateProvider, 
  deleteProvider 
} from './api/providers';
import VCheckbox from './components/ui/VCheckbox.vue';
import IconDelete from './components/icons/IconDelete.vue';
import IconEdit from './components/icons/IconEdit.vue';
import VModalProvider from './components/VModalProvider.vue';

const DEFAULT_PROVIDER = {
  _id: '',
  name: '',
};

export default {
  components: {
    VTable,
    VModal,
    VButton,
    VInput,
    VCheckbox,
    IconDelete,
    IconEdit,
    VModalProvider,
  },
  data() {
    return {
      isModalProviderOpened: false,
      isModalOpened: false,
      isNew: true,
      client: { _id: '', name: '', email: '', phone: '', providers: [] },
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
      provider: DEFAULT_PROVIDER,
      newProviderName: '',
      header: '',
    };
  },
  computed: {
    modalHeader() {
      return this.isNew ? 'New Client' : 'Edit Client';
    },
  },
  async mounted() {
    await this.fetchClients();
    await this.fetchProviders();
  },
  methods: {
    async fetchClients() {
      this.clients = await getClients();
    },
    async fetchProviders() {
      const providers = await getProviders();
      this.providers = providers.map((p) => ({
        _id: p._id,
        name: p.name,
        checked: false,
      }));
    },
    resetFields() {
      Object.keys(this.client).forEach((key) => {
        if (Array.isArray(this.client[key])) {
          this.client[key] = [];
          return;
        }
        this.client[key] = '';
      });
    },
    async onCreate() {
      const payload = {};
      Object.entries(this.client).forEach((entry) => {
        payload[entry[0]] = entry[1];
      });
      delete payload._id;
      await postClient(payload);
      this.fetchClients();
      this.resetFields();
      this.modalClose();
      this.fetchClients();
    },
    async onUpdate() {
      const payload = {};
      Object.entries(this.client).forEach((entry) => {
        payload[entry[0]] = entry[1];
      });
      await updateClient(payload);
      this.fetchClients();
      this.resetFields();
      this.modalClose();
    },
    selectRow(row) {
      this.isNew = false;
      Object.entries(row).forEach((entry) => {
        this.client[entry[0]] = row[entry[0]];
      });
      this.providers.forEach((p) => {
        p.checked = this.client.providers.some(
          (clientProvider) => clientProvider._id === p._id
        );
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
    modalCloseProvider(){
      this.isModalProviderOpened = false;
      this.newProviderName = '';
    },
    async onRemove() {
      await deleteClient(this.client._id);
      this.fetchClients();
      this.resetFields();
      this.modalClose();
    },
    async createProvider() {
      await postProvider({
        name: this.provider.name,
      });
      this.provider.name = '';
      this.fetchProviders();
    },
    async selectClientProviders({ _id, value }) {
      if (value) {
        const providerExists = this.client.providers.some((p) => p._id === _id);
        if (providerExists) return;
        const provider = this.providers.find((p) => p._id === _id);
        this.client.providers.push(provider);
      } else {
        this.client.providers = this.client.providers.filter(
          (provider) => provider._id !== _id
        );
      }
    },
    async onRemoveProvider(id) {
      await deleteProvider(id);
      this.fetchProviders();
    },
     async onOpenModalProvider(id) {
      this.isModalProviderOpened = !this.isModalProviderOpened
      const providers = await getProviders();
      this.newProviderName  = providers.find((provider) => provider._id === id)
    },
    async onUpdateProvider(){
      const payload = {};
      Object.entries(this.newProviderName).forEach((entry) => {
        const [key, value] = entry;
        payload[key] = value;
      });
      await updateProvider(payload);
      this.fetchProviders();
      this.newProviderName = '';
      this.modalCloseProvider();
    }
  },
};
</script>

