<template>
  <is-main-template
    title="order_status_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'orderStatus/getItem',
      update: 'orderStatus/update',
      reset: 'orderStatus/reset'
    }),
    onSendForm() {
      this.update()
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
