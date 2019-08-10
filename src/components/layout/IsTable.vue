<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-footer="hideDefaultFooter"
      :items-per-page="itemsPerPage"
  >
    <template
      v-slot:[name(header)]="{ item, header }"
      v-for="header in headers"
    >
      <template v-if="type(item, header) === 'boolean'">
        <v-chip
            :color="value(item, header) ? 'green' : 'red'"
            text-color="white"
        >
          {{ value(item, header) ? $t('yes') : $t('no') }}
        </v-chip>
      </template>

      <template v-else-if="type(item, header) === 'datetime'">
        {{ crmDateFormat(value(item, header)) }}
      </template>

      <template v-else-if="type(item, header) === 'collection'">
        <v-chip
            color="gray"
            v-for="(obj, key) in value(item, header)" :key="key"
        >
          {{ pick(collectionPath(item, header), obj) }}
        </v-chip>
      </template>

      <template v-else-if="type(item, header) === 'list'">
        <ul class="my-2">
          <li v-for="(val, key) in item.data" :key="key">
            <b>{{ $t(key) }}:</b> {{ val }}
          </li>
        </ul>
      </template>

      <template v-else>
        {{ value(item, header) }}
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
    },
    itemsPerPage: {
      type: Number,
      default: 50
    }
  },
  methods: {
    type(item, header) {
      return item.type || header.type
    },
    path(item, header) {
      return item.path || header.value
    },
    collectionPath(item, header) {
      return item.collectionPath || header.collectionPath || 'name'
    },
    name(header) {
      return 'item.' + header.value
    },
    value(item, header) {
      return this.pick(this.path(item, header), item)
    },
    pick(key, item) {
      return this.$dot.pick(key, item)
    }
  }
}
</script>
