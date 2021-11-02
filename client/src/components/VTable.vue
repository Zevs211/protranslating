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
        @click="selectRow(row)"
        class="transition-colors hover:bg-blue-300 cursor-pointer"
        :class="[{ 'bg-blue-200': rowIndex % 2 === 0 }]"
      >
        <td
          class="border border-blue-300 px-4 py-1"
          v-for="(cell, cellIndex) in headers"
          :key="`${rowIndex}-${cellIndex}`"
        >
          {{ getCellValue(row, cell) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    headers: {
      type: Array,
      default: [],
    },
    rows: {
      type: Array,
      default: [],
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