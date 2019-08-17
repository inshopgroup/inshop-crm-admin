<template>
  <is-show-template
    :fields="fields"
    entity="Company"
    :tabs="['contacts', 'addresses']"
    :history-key="historyKey"
  >
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
import ClientContacts from '../client/ClientContacts'
import ClientAddresses from '../client/ClientAddresses'

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
          property: 'name',
          type: 'string'
        },
        {
          property: 'fullName',
          type: 'string'
        },
        {
          property: 'description',
          type: 'string'
        },
        {
          property: 'contactPerson',
          type: 'string'
        },
        {
          property: 'description',
          type: 'string'
        },
        {
          property: 'bankName',
          type: 'string'
        },
        {
          property: 'bankAccountNumber',
          type: 'string'
        },
        {
          property: 'krs',
          type: 'string'
        },
        {
          property: 'nip',
          type: 'string'
        },
        {
          property: 'isVat',
          type: 'boolean'
        },
        {
          property: 'labels',
          type: 'collection'
        },
        {
          property: 'vatComment',
          type: 'string'
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
