<template>
  <is-main-template
    title="invoice_status_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'invoiceStatus/getItem',
      update: 'invoiceStatus/update',
      reset: 'invoiceStatus/reset'
    }),
    onSendForm() {
      this.update()
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
