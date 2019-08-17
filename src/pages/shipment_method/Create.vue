<template>
  <is-main-template title="shipment_method_add">
    <shipment-method-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShipmentMethodForm from './Form'

export default {
  components: {
    ShipmentMethodForm
  },
  computed: {
    ...mapGetters({
      item: 'shipmentMethod/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'shipmentMethod/create',
      reset: 'shipmentMethod/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'ShipmentMethodShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
