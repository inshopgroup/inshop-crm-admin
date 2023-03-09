<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent" show-arrows>
      <v-tab href="#general">
        {{ $t('tabs_general') }}
      </v-tab>

      <v-tab v-for="tab in tabs" :key="tab" :href="'#' + tab">
        {{ $t(tab) }}
      </v-tab>

      <v-tab href="#history">
        {{ $t('tabs_history') }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
        <is-key-table :item="item" :fields="allFields"></is-key-table>
      </v-tab-item>

      <v-tab-item v-for="tab in tabs" :key="tab" class="my-4" :value="tab">
        <slot :item="item" :name="tab" />
      </v-tab-item>

      <v-tab-item class="my-4" value="history">
        <is-history
          :id="parseInt($route.params.id)"
          :key="historyKey"
          :entity="entity"
        ></is-history>
      </v-tab-item>
    </v-tabs-items>

    <item-show-actions
      :item="item"
      :entity="entity"
      :path="path"
    ></item-show-actions>
  </is-main-template>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import decamelize from '../../utils/decamelize'
import ItemShowActions from './ItemShowActions.vue'
import IsHistory from '~/components/IsHistory.vue'

import type { ILabel } from '~/store/label'
import type { IDataTableField } from '~/types/DataTable'

export default Vue.extend({
  name: 'IsShowTemplate',
  components: { ItemShowActions, IsHistory },
  props: {
    fields: {
      type: Array,
      required: true,
    } as PropOptions<IDataTableField[]>,
    entity: {
      type: String,
      required: true,
    } as PropOptions<string>,
    historyKey: {
      type: Number,
      default: 1,
    } as PropOptions<number>,
    tabs: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<string>>,
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    allFields(): IDataTableField[] {
      return this.fields.slice().concat([
        {
          property: 'isActive',
          type: 'boolean',
        },
        {
          property: 'createdAt',
          type: 'datetime',
        },
        {
          property: 'updatedAt',
          type: 'datetime',
        },
        {
          property: 'updatedBy',
          type: 'string',
        },
      ])
    },
    path(): string {
      return decamelize(this.entity)
    },
    item(): ILabel {
      return this.$store.getters[`${this.path}/item`]
    },
  },
  watch: {
    historyKey() {
      this.getItem()
    },
  },
  created() {
    this.getItem()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    reset(): void {
      this.$store.dispatch(`${this.path}/reset`)
    },
    getItem(): void {
      this.$store.dispatch(`${this.path}/getItem`, this.$route.params.id)
    },
  },
})
</script>
