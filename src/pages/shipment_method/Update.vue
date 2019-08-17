<template>
  <is-main-template
    title="shipment_method_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'shipmentMethod/getItem',
      update: 'shipmentMethod/update',
      reset: 'shipmentMethod/reset'
    }),
    onSendForm() {
      this.update()
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
