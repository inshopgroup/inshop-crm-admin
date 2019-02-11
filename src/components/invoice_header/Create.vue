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



  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'InvoiceHeaderUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
