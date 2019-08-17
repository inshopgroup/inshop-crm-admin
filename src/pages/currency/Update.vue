<template>
  <is-main-template
    title="currency_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'currency/getItem',
      update: 'currency/update',
      reset: 'currency/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'CurrencyShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
