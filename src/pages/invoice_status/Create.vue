<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_status_add') }}</h1>
    </section>
    <InvoiceStatusForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
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
  methods: {
    ...mapActions({
      create: 'invoiceStatus/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'InvoiceStatusShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
