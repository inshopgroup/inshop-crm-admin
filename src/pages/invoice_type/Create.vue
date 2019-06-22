<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_type_add') }}</h1>
    </section>
    <InvoiceTypeForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'invoiceType/create'
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
