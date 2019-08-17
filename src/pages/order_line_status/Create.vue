<template>
  <is-main-template title="order_line_status_add">
    <order-line-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderLineStatusForm from './Form'

export default {
  components: {
    OrderLineStatusForm
  },
  computed: {
    ...mapGetters({
      item: 'orderLineStatus/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'orderLineStatus/create',
      reset: 'orderLineStatus/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'OrderLineStatusShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
