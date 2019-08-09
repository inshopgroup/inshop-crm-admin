<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent">
      <v-tab href="#general">{{ $t('tabs_general') }}</v-tab>

      <v-tab :href="'#' + tab" v-for="tab in tabs" :key="tab">{{ $t(tab) }}</v-tab>

      <v-tab href="#history">{{ $t('tabs_history') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
        <is-key-table :item="item" :fields="allFields"></is-key-table>
      </v-tab-item>

      <v-tab-item class="my-4" :value="tab" v-for="tab in tabs" :key="tab">
        <slot :item="item" :name="tab"></slot>
      </v-tab-item>

      <v-tab-item class="my-4" value="history">
        <history
          :id="parseInt($route.params.id)"
          :key="historyKey"
          :entity="entity"
        />
      </v-tab-item>
    </v-tabs-items>

    <item-show-actions :item="item" :entity="entity" :path="path" />
  </is-main-template>
</template>

<script>
import ItemShowActions from "./ItemShowActions"
import History from "../History"
import decamelize from "../../utils/decamelize"

export default {
  name: 'IsShowTemplate',
  components: {ItemShowActions, History },
  props: {
    fields: {
      type: Array,
      required: true
    },
    entity: {
      type: String,
      required: true
    },
    historyKey: {
      type: Number,
      default: 1
    },
    tabs: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    allFields() {
      return [
        ...this.fields,
        ...[
          {
            value: 'isActive',
            type: 'boolean',
          },
          {
            value: 'createdAt',
            type: 'datetime',
          },
          {
            value: 'updatedAt',
            type: 'datetime',
          },
          {
            value: 'updatedBy',
            type: 'string',
          }
        ]
      ]
    },
    path() {
      return decamelize(this.entity)
    },
    item() {
      return this.$store.getters[this.path + '/item']
    },
  },
  created() {
    this.getItem()
  },
  watch: {
    historyKey: function() {
      this.getItem()
    },
  },
  methods: {
    getItem() {
      this.$store.dispatch(this.path + '/getItem', this.$route.params.id)
    }
  }
}
</script>
