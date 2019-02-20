<template>
  <div>
    <section class="content-header">
      <h1>{{$t('invoice_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'invoice_status'" :is-loading="isLoading"></item-errors>

          <InvoiceStatusForm
            :handle-submit="onSendForm"

            :item="item"
            :errors="errors"

          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import InvoiceStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    InvoiceStatusForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'invoice_status/item',
    isLoading: 'general/isLoading',
    errors: 'invoice_status/errors'
  }),

  methods: {
    ...mapActions({
      create: 'invoice_status/create',
      reset: 'invoice_status/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'InvoiceStatusShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
