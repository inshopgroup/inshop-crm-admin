<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('currency_add') }}</h1>
    </section>
    <CurrencyForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'currency/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'CurrencyShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
