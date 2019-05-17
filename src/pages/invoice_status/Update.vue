<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_status_edit', {entity: item && item.name}) }}</h1>
    </section>
    <InvoiceStatusForm :handle-submit="onSendForm" :item="item"/>
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
      item: 'invoice_status/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'invoice_status/getItem',
      update: 'invoice_status/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'InvoiceStatusShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
