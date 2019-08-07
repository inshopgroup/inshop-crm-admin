<template>
  <is-main-template title="order_status_add">
    <order-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
      item: 'orderStatus/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'orderStatus/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'OrderStatusShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
