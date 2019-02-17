<template>
  <div>
    <section class="content-header">
      <h1>{{$t('category.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'category'" :is-loading="isLoading"></item-errors>

          <CategoryForm
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

import CategoryForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    CategoryForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  data () {
    return {
      item: {
        translations: []
      }
    }
  },
  computed: mapGetters({
    item: 'category/item',
    isLoading: 'general/isLoading',
    errors: 'category/errors'
  }),

  methods: {
    ...mapActions({
      create: 'category/create',
      reset: 'category/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'CategoryShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
