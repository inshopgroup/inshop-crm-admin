<template>
  <div>
    <section class="content-header">
      <h1>{{$t('product.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'product'" :is-loading="isLoading"></item-errors>

          <ProductForm
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :item="item"
            :errors="violations"
            v-if="!isLoading"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ProductForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('product/create')

export default {
  components: {
    ProductForm,
    ItemErrors
  },

  data () {
    return {
      item: {
        translations: []
      }
    }
  },

  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'ProductUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
