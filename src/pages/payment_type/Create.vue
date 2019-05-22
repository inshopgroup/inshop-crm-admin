<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type_add') }}</h1>
    </section>
    <PaymentTypeForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
  methods: {
    ...mapActions({
      create: 'paymentType/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'PaymentTypeShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
