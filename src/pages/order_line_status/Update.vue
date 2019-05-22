<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_line_status_edit', {entity: item && item.name}) }}</h1>
    </section>

    <OrderLineStatusForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
  created () {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'orderLineStatus/getItem',
      update: 'orderLineStatus/update'
    }),
    onSendForm () {
      this.update().then(item => {
        this.$router.push({name: 'OrderLineStatusShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
