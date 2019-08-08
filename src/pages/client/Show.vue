<template>
  <is-main-template :title="item.name">
    <v-tabs v-model="tab" background-color="transparent">
      <v-tab href="#general">{{ $t('tabs_general') }}</v-tab>
      <v-tab href="#contacts">{{ $t('tabs_contacts') }}</v-tab>
      <v-tab href="#addresses">{{ $t('tabs_addresses') }}</v-tab>
      <v-tab href="#history">{{ $t('tabs_history') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item class="my-4" value="general">
        <client-info :item="item"></client-info>
      </v-tab-item>
      <v-tab-item class="my-4" value="contacts">
        <client-contacts
          :contacts="item.contacts"
          :parent="{ clients: [item] }"
          @contactsChanged="loadItem"
        ></client-contacts>
      </v-tab-item>
      <v-tab-item class="my-4" value="addresses">
        <client-addresses
          :addresses="item.addresses"
          :parent="{ clients: [item] }"
          @addressesChanged="loadItem"
        ></client-addresses>
      </v-tab-item>
      <v-tab-item class="my-4" value="history">
        <history
          :id="parseInt($route.params.id)"
          :key="historyKey"
          entity="Client"
          path="client"
        ></history>
      </v-tab-item>
    </v-tabs-items>

    <item-show-actions :item="item" entity="Client" path="client" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientContacts from './ClientContacts'
import ClientAddresses from './ClientAddresses'
import ClientInfo from './ClientInfo'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'

export default {
  components: {
    History,
    ItemErrors,
    ClientContacts,
    ClientAddresses,
    ClientInfo,
    ItemShowActions
  },
  data() {
    return {
      tab: null,
      historyKey: 1
    }
  },
  computed: {
    ...mapGetters({
      item: 'client/item'
    })
  },
  created() {
    this.loadItem()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'client/getItem',
      reset: 'client/reset'
    }),
    loadItem() {
      this.getItem(this.$route.params.id)
    }
  }
}
</script>
