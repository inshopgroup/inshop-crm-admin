<template>
  <is-main-template
    title="invoice_header_edit"
    :title-params="{ entity: item && item.number }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'invoiceHeader/getItem',
      update: 'invoiceHeader/update',
      reset: 'invoiceHeader/reset'
    }),
    onSendForm() {
      this.update()
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
