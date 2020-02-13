<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :hide-default-footer="hideDefaultFooter"
    :items-per-page="itemsPerPage"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 25, 50, 100]
    }"
  >
    <template
      v-for="(header, h) in headers"
      v-slot:[name(header)]="{ item, header }"
    >
      <template v-if="type(item, header) === 'boolean'">
        <v-chip
          :key="h"
          :color="value(item, header) ? 'green' : 'red'"
          text-color="white"
        >
          {{ value(item, header) ? $t('yes') : $t('no') }}
        </v-chip>
      </template>

      <template v-else-if="type(item, header) === 'datetime'">
        {{ crmDateFormat(value(item, header)) }}
      </template>

      <template v-else-if="type(item, header) === 'image'">
        <img
          :src="value(item, header)"
          alt=""
          :width="item.params.width"
          class="mt-2"
        />
      </template>

      <template v-else-if="type(item, header) === 'collection'">
        <span v-for="(obj, key) in value(item, header)" :key="key" class="mr-3">
          <template v-if="item.link || header.link">
            <v-btn
              :to="{
                name: routeName(item, header),
                params: { id: pick(routeParam(item, header), obj) }
              }"
              class="px-1"
              color="primary"
              text
            >
              {{ pick(collectionPath(item, header), obj) }}
            </v-btn>
          </template>
          <template v-else>
            <v-chip color="gray">
              {{ pick(collectionPath(item, header), obj) }}
            </v-chip>
          </template>
        </span>
      </template>

      <template v-else-if="type(item, header) === 'list'">
        <ul :key="h" class="my-2">
          <li v-for="(val, key) in item.data" :key="key">
            <b>{{ $t(key) }}:</b> {{ val }}
          </li>
        </ul>
      </template>

      <template v-else>
        <template v-if="item.link || header.link">
          <v-btn
            v-if="value(item, header)"
            :key="h"
            :to="{
              name: routeName(item, header),
              params: { id: pick(routeParam(item, header), item) }
            }"
            class="px-1"
            color="primary"
            text
          >
            {{ value(item, header) }}
          </v-btn>
        </template>
        <template v-else>
          {{ value(item, header) }}
        </template>
      </template>
    </template>

    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
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
      return item.propertyType || header.type
    },
    path(item, header) {
      return item.path || header.value
    },
    collectionPath(item, header) {
      return item.collectionPath || header.collectionPath || 'name'
    },
    routeName(item, header) {
      if (item.link && item.link.route) {
        return item.link.route
      }

      if (header.link && header.link.route) {
        return header.link.route
      }
    },
    routeParam(item, header) {
      let param = 'id'

      if (item.link && item.link.param) {
        param = item.link.param
      }

      if (header.link && header.link.param) {
        param = header.link.param
      }

      return param
    },
    name(header) {
      return `item.${header.value}`
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
