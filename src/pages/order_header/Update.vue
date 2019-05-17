<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_header_edit', {entity: item && item.number}) }}</h1>
    </section>
    <OrderHeaderForm :handle-submit="onSendForm" :item="item"/>
  </div>
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
      item: 'order_header/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'order_header/getItem',
      update: 'order_header/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'OrderHeaderShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
