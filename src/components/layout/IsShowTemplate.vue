<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent" show-arrows>
      <v-tab href="#general">{{ $t('tabs_general') }}</v-tab>

      <v-tab v-for="tab in tabs" :key="tab" :href="'#' + tab">{{
        $t(tab)
      }}</v-tab>

      <v-tab href="#history">{{ $t('tabs_history') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
        <is-key-table :item="item" :fields="allFields"></is-key-table>
      </v-tab-item>

      <v-tab-item v-for="tab in tabs" :key="tab" class="my-4" :value="tab">
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
import ItemShowActions from './ItemShowActions'
import History from '../History'
import decamelize from '../../utils/decamelize'

export default {
  name: 'IsShowTemplate',
  components: { ItemShowActions, History },
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
    }
  },
  data() {
    return {
      tab: null
    }
  },
  computed: {
    allFields() {
      return [
        ...this.fields,
        ...[
          {
            property: 'isActive',
            type: 'boolean'
          },
          {
            property: 'createdAt',
            type: 'datetime'
          },
          {
            property: 'updatedAt',
            type: 'datetime'
          },
          {
            property: 'updatedBy',
            type: 'string'
          }
        ]
      ]
    },
    path() {
      return decamelize(this.entity)
    },
    item() {
      return this.$store.getters[`${this.storeModule(this.entity)}/item`]
    }
  },
  watch: {
    historyKey() {
      this.getItem()
    }
  },
  created() {
    this.getItem()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    reset() {
      this.$store.dispatch(`${this.storeModule(this.entity)}/reset`)
    },
    getItem() {
      this.$store.dispatch(
        `${this.storeModule(this.entity)}/getItem`,
        this.$route.params.id
      )
    }
  }
}
</script>
