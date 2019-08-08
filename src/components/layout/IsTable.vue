<template>
  <v-data-table
      :headers="headers"
      :items="items"
  >
    <template
      v-slot:[name(header)]="{ item, header, value }"
      v-for="header in headers"
    >
      <template v-if="header.type === 'boolean'">
        {{ value ? $t('yes') : $t('no') }}
      </template>
      <template v-else-if="header.type === 'datetime'">
        {{ crmDateFormat(value) }}
      </template>
      <template v-else-if="header.type === 'object'">
        {{ itemObject(item, header) }}
      </template>
      <template v-else-if="header.type === 'list'">
        <ul :key="header.value" class="my-2">
          <li v-for="(val, key) in item.data" :key="key">
            <b>{{ $t(key) }}:</b> {{ val }}
          </li>
        </ul>
      </template>
      <template v-else>
        {{ value }}
      </template>
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
    itemObject(item, header) {
      return this.$dot.pick(header.value, item)
    }
  }
}
</script>
