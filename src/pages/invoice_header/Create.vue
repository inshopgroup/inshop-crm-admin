<template>
  <is-main-template title="invoice_header_add">
    <invoice-header-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InvoiceHeaderForm from './Form'

export default {
  components: {
    InvoiceHeaderForm
  },
  computed: {
    ...mapGetters({
      item: 'invoiceHeader/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'invoiceHeader/create',
      reset: 'invoiceHeader/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'InvoiceHeaderShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
