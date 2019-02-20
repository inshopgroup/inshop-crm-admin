<template>
  <div>
    <section class="content-header">
      <h1>{{$t('order_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'order_status'" :is-loading="isLoading"></item-errors>

          <OrderStatusForm
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

import OrderStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    OrderStatusForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'order_status/item',
    isLoading: 'general/isLoading',
    errors: 'order_status/errors'
  }),
  methods: {
    ...mapActions({
      create: 'order_status/create',
      reset: 'order_status/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'OrderStatusShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
