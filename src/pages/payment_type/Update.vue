<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type_edit', { entity: item && item.name }) }}</h1>
    </section>
    <PaymentTypeForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      getItem: 'paymentType/getItem',
      update: 'paymentType/update'
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
