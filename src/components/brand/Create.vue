<template>
  <div>
    <section class="content-header">
      <h1>{{$t('brand.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'brand'" :is-loading="isLoading"></item-errors>

          <BrandForm
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

import BrandForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    BrandForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'brand/item',
    isLoading: 'general/isLoading',
    errors: 'brand/errors'
  }),
  methods: {
    ...mapActions({
      create: 'brand/create',
      reset: 'brand/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'BrandShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
