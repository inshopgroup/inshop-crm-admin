<template>
  <is-main-template title="vat_add">
    <vat-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VatForm from './Form'

export default {
  components: {
    VatForm
  },
  computed: {
    ...mapGetters({
      item: 'vat/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'vat/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'VatShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
