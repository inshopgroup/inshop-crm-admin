<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-footer="hideDefaultFooter"
  >
    <template
      v-slot:[name(header)]="{ item, header, value }"
      v-for="header in headers"
    >
      <template v-if="(item.type || header.type) === 'boolean'">
        {{ itemObject(item, header) ? $t('yes') : $t('no') }}
      </template>
      <template v-else-if="(item.type || header.type) === 'datetime'">
        {{ crmDateFormat(itemObject(item, header)) }}
      </template>
      <template v-else-if="(item.type || header.type) === 'list'">
        <ul :key="header.value" class="my-2">
          <li v-for="(val, key) in item.data" :key="key">
            <b>{{ $t(key) }}:</b> {{ val }}
          </li>
        </ul>
      </template>
      <template v-else>
        {{ itemObject(item, header) }}
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
    hideDefaultFooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    name(header) {
      return 'item.' + header.value
    },
    itemObject(item, header) {
      return this.$dot.pick(item.key || header.value, item)
    }
  }
}
</script>
