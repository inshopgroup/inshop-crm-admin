<template>
  <is-main-template
    title="order_line_status_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'orderLineStatus/getItem',
      update: 'orderLineStatus/update'
    }),
    onSendForm() {
      this.update()
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
