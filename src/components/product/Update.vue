<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('product.edit', {entity: retrieved && retrieved.ean}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'product'" :is-loading="isLoading"></item-errors>

          <ProductForm
            v-if="!isLoading"
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :item="retrieved"
            :errors="violations" />
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
      deleted: 'product/del/deleted',
      retrieved: 'product/update/retrieved',
      violations: 'product/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'ProductList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'product/create/reset',
      delReset: 'product/del/reset',
      retrieve: 'product/update/retrieve',
      updateReset: 'product/update/reset',
      update: 'product/update/update',
      updateRetrieved: 'product/update/updateRetrieved'
    }),

    reset () {
      this.updateReset()
      this.delReset()
      this.createReset()
    },

    onSendForm () {
      this.update()
    },

    updateField (field, value) {
      this.updateRetrieved({ [field]: value })
    }
  }
}
</script>
