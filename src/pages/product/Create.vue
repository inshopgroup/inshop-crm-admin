<template>
  <is-main-template title="product_add">
    <product-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductForm from './Form'

export default {
  components: {
    ProductForm
  },
  computed: {
    ...mapGetters({
      item: 'product/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'product/create',
      reset: 'product/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'ProductShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
