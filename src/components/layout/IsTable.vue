<template>
  <v-data-table
      :headers="headers"
      :items="items"
  >
    <template v-slot:[name(header)]="{ item, header, value }" v-for="header in headers">
      {{ itemValue(item, header, value) }}
    </template>

    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>
  </v-data-table>
</template>

<script>
export default {
  name: 'IsTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
  },
  methods: {
    name(header) {
      return 'item.' + header.value
    },
    itemValue(item, header, value) {
      if (!header.type) {
        return value
      }

      switch (header.type) {
        case 'boolean':
          return value ? $t('yes') : $t('no')

        case 'datetime':
          return this.crmDateFormat(value)

        default:
          return value
      }
    },
  }
}
</script>
