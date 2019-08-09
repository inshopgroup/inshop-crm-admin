<template>
  <is-show-template :fields="fields" entity="Company" :tabs="['contacts', 'addresses']" :history-key="historyKey">
    <template v-slot:contacts="{ item }">
      <client-contacts
        :contacts="item.contacts"
        :parent="{ companies: [item] }"
        @contactsChanged="loadItem"
      ></client-contacts>
    </template>
    
    <template v-slot:addresses="{ item }">
      <client-addresses
        :addresses="item.addresses"
        :parent="{ companies: [item] }"
        @addressesChanged="loadItem"
      ></client-addresses>
    </template>
  </is-show-template>
</template>

<script>
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
  methods: {
     changed() {
      this.historyKey++
    }
  }
}
</script>
