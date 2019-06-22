<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status_edit', { entity: item && item.name }) }}</h1>
    </section>
    <OrderStatusForm :handle-submit="onSendForm" :item="item" />
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
      item: 'orderStatus/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'orderStatus/getItem',
      update: 'orderStatus/update'
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
