<template>
  <is-main-template title="address_add">
    <address-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddressForm from './Form'

export default {
  components: {
    AddressForm
  },
  computed: {
    ...mapGetters({
      item: 'address/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'address/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'AddressShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
