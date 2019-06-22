<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_header_add') }}</h1>
    </section>
    <InvoiceHeaderForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'invoiceHeader/create'
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
