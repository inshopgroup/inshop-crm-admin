<template>
  <is-main-template
    title="product_edit"
    :title-params="{ entity: item && item.ean }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'product/getItem',
      update: 'product/update'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'ProductShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
