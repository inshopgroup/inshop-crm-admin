<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('shipment_method.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'shipment_method'" :is-loading="isLoading"></item-errors>

          <ShipmentMethodForm

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
import ShipmentMethodForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ShipmentMethodForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'shipment_method/item',
      errors: 'shipment_method/errors'
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
      getItem: 'shipment_method/getItem',
      reset: 'shipment_method/reset',
      update: 'shipment_method/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
