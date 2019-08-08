<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent">
      <v-tab href="#general">{{ $t('tabs_general') }}</v-tab>
      <v-tab href="#history">{{ $t('tabs_history') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
                <is-table :headers="headers" :items="items"></is-table>
<!--        <div v-if="item" class="table-responsive">-->
<!--          <table class="table table-striped table-hover">-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th width="20%">-->
<!--                {{ $t('field') }}-->
<!--              </th>-->
<!--              <th>{{ $t('value') }}</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr>-->
<!--              <td>{{ $t('name') }}</td>-->
<!--              <td>{{ item.name }}</td>-->
<!--            </tr>-->

<!--            <show-row-is-active :item="item" />-->
<!--            <show-row-created-at :item="item" />-->
<!--            <show-row-updated-at :item="item" />-->
<!--            <show-row-updated-by :item="item" />-->
<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->
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

    <item-show-actions :item="item" entity="Address" path="address" />
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
      headers: [
        {
          text: this.$t('field'),
          value: 'key',
        },
        {
          text: this.$t('value'),
          value: 'val',
        }
      ],
      fields: [
        {
          value: 'name',
          type: 'string',
        },
        {
          value: 'isActive',
          type: 'boolean',
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      item: 'brand/item'
    }),
    items() {
      let arr = []

      this.fields.forEach(field => {
        arr.push({
          key: this.$t(field.value),
          val: this.item[field.value],
          type: field.type
        })
      })

      return arr
    }
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
