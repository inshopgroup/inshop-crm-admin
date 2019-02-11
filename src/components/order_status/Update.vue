<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status.edit', {entity: item && item.name}) }}</h1>
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
import { mapActions, mapGetters } from 'vuex'
import OrderStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    OrderStatusForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'order_status/item',
      errors: 'order_status/errors'
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
      getItem: 'order_status/getItem',
      reset: 'order_status/reset',
      update: 'order_status/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
