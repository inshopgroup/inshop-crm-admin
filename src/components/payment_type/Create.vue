<template>
  <div>
    <section class="content-header">
      <h1>{{$t('payment_type.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'payment_type'" :is-loading="isLoading"></item-errors>

          <PaymentTypeForm
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

import PaymentTypeForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    PaymentTypeForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'payment_type/item',
    isLoading: 'general/isLoading',
    errors: 'payment_type/errors'
  }),

  methods: {
    ...mapActions({
      create: 'payment_type/create',
      reset: 'payment_type/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'PaymentTypeShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
