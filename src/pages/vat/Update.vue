<template>
  <is-main-template
    title="vat_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'vat/getItem',
      update: 'vat/update',
      reset: 'vat/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'VatShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
