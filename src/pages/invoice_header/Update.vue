<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_header_edit', {entity: item && item.number}) }}</h1>
    </section>
    <InvoiceHeaderForm :handle-submit="onSendForm" :item="item"/>
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
      item: 'invoice_header/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'invoice_header/getItem',
      update: 'invoice_header/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'InvoiceHeaderShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
