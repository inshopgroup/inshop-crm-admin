<template>
  <div>
    <section class="content-header">
      <h1>{{$t('currency.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'currency'" :is-loading="isLoading"></item-errors>

          <CurrencyForm
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

import CurrencyForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    CurrencyForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'currency/item',
    isLoading: 'general/isLoading',
    errors: 'currency/errors'
  }),

  methods: {
    ...mapActions({
      create: 'currency/create',
      reset: 'currency/reset'
    }),

    onSendForm () {
      this.create(this.item)
    }
  }
}
</script>
