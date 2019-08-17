<template>
  <is-main-template
    title="payment_type_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'paymentType/getItem',
      update: 'paymentType/update',
      reset: 'paymentType/reset'
    }),
    onSendForm() {
      this.update()
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
