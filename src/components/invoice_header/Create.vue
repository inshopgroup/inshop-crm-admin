<template>
  <div>
    <section class="content-header">
      <h1>{{$t('invoice_header.add')}}</h1>
    </section>

    <item-errors :entity="'invoice_header'" :is-loading="isLoading"></item-errors>

    <InvoiceHeaderForm
      :handle-submit="onSendForm"
      :item="item"
      :errors="errors"
    />
  </div>
</template>

<script>
import InvoiceHeaderForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    InvoiceHeaderForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'invoice_header/item',
    isLoading: 'general/isLoading',
    errors: 'invoice_header/errors'
  }),
  methods: {
    ...mapActions({
      create: 'invoice_header/create',
      reset: 'invoice_header/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'InvoiceHeaderShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
