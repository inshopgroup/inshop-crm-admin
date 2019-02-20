<template>
  <div>
    <section class="content-header">
      <h1>{{$t('order_line_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'order_line_status'" :is-loading="isLoading"></item-errors>

          <OrderLineStatusForm
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

import OrderLineStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    OrderLineStatusForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'order_line_status/item',
    isLoading: 'general/isLoading',
    errors: 'order_line_status/errors'
  }),

  methods: {
    ...mapActions({
      create: 'order_line_status/create',
      reset: 'order_line_status/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'OrderLineStatusShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
