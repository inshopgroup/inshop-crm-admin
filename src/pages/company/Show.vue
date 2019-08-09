<template>
  <is-show-template :fields="fields" entity="Company" :tabs="['contacts', 'addresses']" :history-key="historyKey">
    <template v-slot:contacts="{ item }">
      <client-contacts
        :contacts="item.contacts"
        :parent="{ companies: [item] }"
        @changed="changed"
      ></client-contacts>
    </template>

    <template v-slot:addresses="{ item }">
      <client-addresses
        :addresses="item.addresses"
        :parent="{ companies: [item] }"
        @changed="changed"
      ></client-addresses>
    </template>
  </is-show-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientContacts from '../client/ClientContacts'
import ClientAddresses from '../client/ClientAddresses'

export default {
  components: {
    ClientAddresses,
    ClientContacts,
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          value: 'username',
          type: 'string',
        },
        {
          value: 'name',
          type: 'string',
        },
        {
          value: 'description',
          type: 'string',
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'company/item'
  }),
  created() {
    this.loadItem()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'company/getItem',
      reset: 'company/reset'
    }),
    loadItem() {
      this.getItem(this.$route.params.id)
    },
    changed() {
      this.historyKey++
    }
  }
}
</script>
