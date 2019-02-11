<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_line_status.edit', {entity: item && item.name}) }}</h1>
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
import { mapActions, mapGetters } from 'vuex'
import OrderLineStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    OrderLineStatusForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'order_line_status/item',
      errors: 'order_line_status/errors'
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
      getItem: 'order_line_status/getItem',
      reset: 'order_line_status/reset',
      update: 'order_line_status/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
