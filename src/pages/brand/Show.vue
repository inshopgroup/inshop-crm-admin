<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent">
      <v-tab href="#general">{{ $t('tabs_general') }}</v-tab>
      <v-tab href="#history">{{ $t('tabs_history') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
        <is-key-table :item="item" :fields="fields"></is-key-table>
      </v-tab-item>
      <v-tab-item class="my-4" value="history">
        <history
          :id="parseInt($route.params.id)"
          :key="historyKey"
          entity="Brand"
          path="brand"
        />
      </v-tab-item>
    </v-tabs-items>

    <item-show-actions :item="item" entity="Brand" path="brand" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'

export default {
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive,
    History,
    ItemErrors,
    ItemShowActions
  },
  data() {
    return {
      tab: null,
      historyKey: 1,
      fields: [
        {
          value: 'name',
          type: 'string',
        },
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
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      item: 'brand/item'
    }),
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'brand/getItem',
      reset: 'brand/reset'
    })
  }
}
</script>
