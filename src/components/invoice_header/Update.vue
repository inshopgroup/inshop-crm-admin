<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_header.edit', {entity: item && item.number}) }}</h1>
    </section>

    <item-errors :entity="'invoice_header'" :is-loading="isLoading"></item-errors>

    <InvoiceHeaderForm
      :handle-submit="onSendForm"

      :errors="errors"
      />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InvoiceHeaderForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    InvoiceHeaderForm
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'invoice_header/item',
      errors: 'invoice_header/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'invoice_header/getItem',
      reset: 'invoice_header/reset',
      update: 'invoice_header/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'InvoiceHeaderShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
