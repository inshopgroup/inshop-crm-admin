<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('product.edit', {entity: item && item.ean}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'product'" :is-loading="isLoading"></item-errors>

          <ProductForm

            :handle-submit="onSendForm"

            :item="retrieved"
            :errors="errors" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ProductForm
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'product/item',
      errors: 'product/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'product/getItem',
      reset: 'product/reset',
      update: 'product/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ProductShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
