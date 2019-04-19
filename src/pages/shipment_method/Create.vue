<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('add') }}</h1>
    </section>

    <ShipmentMethodForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ShipmentMethodForm from './Form'

  export default {
    components: {
      ShipmentMethodForm,
    },
    computed: {
      ...mapGetters({
        item: 'shipment_method/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'shipment_method/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'ShipmentMethodShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
