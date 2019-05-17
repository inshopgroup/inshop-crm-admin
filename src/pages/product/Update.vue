<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('product_edit', {entity: item && item.ean}) }}</h1>
    </section>
    <ProductForm :handle-submit="onSendForm" :item="item"/>
  </div>
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
      this.update().then(item => {
        this.$router.push({name: 'ProductShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
