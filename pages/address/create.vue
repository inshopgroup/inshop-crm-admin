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
    AddressForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'address/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'address/create',
      reset: 'address/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'address-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
