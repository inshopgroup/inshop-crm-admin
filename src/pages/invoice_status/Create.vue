<template>
  <is-main-template title="invoice_status_add">
    <invoice-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InvoiceStatusForm from './Form'

export default {
  components: {
    InvoiceStatusForm
  },
  computed: {
    ...mapGetters({
      item: 'invoiceStatus/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'invoiceStatus/create',
      reset: 'invoiceStatus/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'InvoiceStatusShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
