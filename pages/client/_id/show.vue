<template>
  <is-show-template
    :fields="fields"
    entity="Client"
    :tabs="['contacts', 'addresses']"
    :history-key="historyKey"
  >
    <template #contacts="{ item }">
      <client-contacts
        :contacts="item.contacts"
        :parent="{ clients: [item] }"
        @changed="changed"
      ></client-contacts>
    </template>

    <template #addresses="{ item }">
      <client-addresses
        :addresses="item.addresses"
        :parent="{ clients: [item] }"
        @changed="changed"
      ></client-addresses>
    </template>
  </is-show-template>
</template>

<script>
import ClientContacts from '../ClientContacts'
import ClientAddresses from '../ClientAddresses'

export default {
  components: {
    ClientAddresses,
    ClientContacts,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'username',
          type: 'string',
        },
        {
          property: 'name',
          type: 'string',
        },
        {
          property: 'description',
          type: 'string',
        },
        {
          property: 'labels',
          type: 'collection',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Homepage title',
    }
  },
  methods: {
    changed() {
      this.historyKey++
    },
  },
}
</script>
