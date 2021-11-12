<template>
  <table class="w-full table-auto mt-8">
    <thead>
      <tr>
        <th v-for="(title, index) in headers" :key="index">
          {{ title.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in rows"
        :key="row._id"
        class="transition-colors hover:bg-blue-300 border border-blue-300"
        :class="[{ 'bg-blue-200': rowIndex % 2 === 0 }]"
      >
        <td
          class="border border-blue-300"
          v-for="(cell, cellIndex) in headers"
          :key="`${rowIndex}-${cellIndex}`"
        >
          {{ getCellValue(row, cell) }}
        </td>
        <td class="flex justify-center my-2">
          <v-button @click.native="selectRow(row)">Edit</v-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import VButton from './ui/VButton.vue';

export default {
  name: 'VTable',
  components: {
    VButton,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getCellValue(row, column) {
      const value = row[column.value];
      if (column.format) {
        return column.format(value);
      }
      return value;
    },
    selectRow(row) {
      this.$emit('select-row', row);
    },
  },
};
</script>

<style>
</style>
