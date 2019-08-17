<template>
  <is-main-template
    title="invoice_type_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'invoiceType/getItem',
      update: 'invoiceType/update',
      reset: 'invoiceType/reset'
    }),
    onSendForm() {
      this.update()
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
