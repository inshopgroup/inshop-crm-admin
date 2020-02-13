<template>
  <is-show-template
    :fields="fields"
    entity="Client"
    :tabs="['contacts', 'addresses']"
    :history-key="historyKey"
  >
    <template v-slot:contacts="{ item }">
      <client-contacts
        :contacts="item.contacts"
        :parent="{ clients: [item] }"
        @changed="changed"
      ></client-contacts>
    </template>

    <template v-slot:addresses="{ item }">
      <client-addresses
        :addresses="item.addresses"
        :parent="{ clients: [item] }"
        @changed="changed"
      ></client-addresses>
    </template>
  </is-show-template>
</template>

<script>
import ClientContacts from './ClientContacts'
import ClientAddresses from './ClientAddresses'

export default {
  components: {
    ClientAddresses,
    ClientContacts
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'username',
          type: 'string'
        },
        {
          property: 'name',
          type: 'string'
        },
        {
          property: 'description',
          type: 'string'
        },
        {
          property: 'labels',
          type: 'collection'
        }
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
