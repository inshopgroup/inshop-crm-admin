<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status_edit', {entity: item && item.name}) }}</h1>
    </section>
    <OrderStatusForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'order_status/getItem',
      update: 'order_status/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'OrderStatusShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
