<template>
  <is-main-template title="currency_add">
    <currency-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CurrencyForm from './Form'

export default {
  components: {
    CurrencyForm
  },
  computed: {
    ...mapGetters({
      item: 'currency/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'currency/create',
      reset: 'currency/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CurrencyShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
