<template>
  <is-main-template
    title="order_header_edit"
    :title-params="{ entity: item && item.number }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'orderHeader/getItem',
      update: 'orderHeader/update',
      reset: 'orderHeader/reset'
    }),
    onSendForm() {
      this.update()
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
