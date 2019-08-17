<template>
  <is-main-template title="order_header_add">
    <order-header-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderHeaderForm from './Form'

export default {
  components: {
    OrderHeaderForm
  },
  computed: {
    ...mapGetters({
      item: 'orderHeader/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'orderHeader/create',
      reset: 'orderHeader/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'OrderHeaderShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
