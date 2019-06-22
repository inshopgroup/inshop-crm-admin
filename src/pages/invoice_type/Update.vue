<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_type_edit', { entity: item && item.name }) }}</h1>
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'invoiceType/getItem',
      update: 'invoiceType/update'
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
