<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_line_status_add') }}</h1>
    </section>
    <OrderLineStatusForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'orderLineStatus/create'
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
