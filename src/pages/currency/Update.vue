<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('currency_edit', {entity: item && item.name}) }}</h1>
    </section>
    <CurrencyForm :handle-submit="onSendForm" :item="item"/>
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'currency/getItem',
      update: 'currency/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'CurrencyShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
