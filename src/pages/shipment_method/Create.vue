<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('shipment_method_add') }}</h1>
    </section>
    <ShipmentMethodForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'shipmentMethod/create'
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
