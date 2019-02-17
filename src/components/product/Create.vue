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

            :item="item"
            :errors="errors"

          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import ProductForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ProductForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  // data () {
  //   return {
  //     item: {
  //       translations: []
  //     }
  //   }
  // },
  computed: mapGetters({
    item: 'product/item',
    isLoading: 'general/isLoading',
    errors: 'product/errors'
  }),
  methods: {
    ...mapActions({
      create: 'product/create',
      reset: 'product/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ProductShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
