<template>
  <div>
    <section class="content-header">
      <h1>{{$t('invoice_type.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'invoice_type'" :is-loading="isLoading"></item-errors>

          <InvoiceTypeForm
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

import InvoiceTypeForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    InvoiceTypeForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'invoice_type/item',
    isLoading: 'general/isLoading',
    errors: 'invoice_type/errors'
  }),

  methods: {
    ...mapActions({
      create: 'invoice_type/create',
      reset: 'invoice_type/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'InvoiceTypeShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
