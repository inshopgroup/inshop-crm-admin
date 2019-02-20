<template>
  <div>
    <section class="content-header">
      <h1>{{$t('order_header.add')}}</h1>
    </section>

    <item-errors :entity="'order_header'" :is-loading="isLoading"></item-errors>

    <OrderHeaderForm
      :handle-submit="onSendForm"

      :item="item"
      :errors="errors"

    />
  </div>
</template>

<script>

import OrderHeaderForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    OrderHeaderForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  // data () {
  //   return {
  //     item: {
  //       lines: []
  //     }
  //   }
  // },

  computed: mapGetters({
    item: 'order_header/item',
    isLoading: 'general/isLoading',
    errors: 'order_header/errors'
  }),
  methods: {
    ...mapActions({
      create: 'order_header/create',
      reset: 'order_header/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'OrderHeaderShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
