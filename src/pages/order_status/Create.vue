<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status_add') }}</h1>
    </section>
    <OrderStatusForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderStatusForm from './Form'

export default {
  components: {
    OrderStatusForm
  },
  computed: {
    ...mapGetters({
      item: 'order_status/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'order_status/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'OrderStatusShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
