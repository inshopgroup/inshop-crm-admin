<template>
  <is-main-template title="payment_type_add">
    <payment-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PaymentTypeForm from './Form'

export default {
  components: {
    PaymentTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'paymentType/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'paymentType/create',
      reset: 'paymentType/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'PaymentTypeShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
