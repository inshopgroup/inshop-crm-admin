<template>
  <is-main-template title="invoice_type_add">
    <invoice-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InvoiceTypeForm from './Form'

export default {
  components: {
    InvoiceTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'invoiceType/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'invoiceType/create',
      reset: 'invoiceType/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'InvoiceTypeShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
