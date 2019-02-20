<template>
  <div>
    <section class="content-header">
      <h1>{{$t('label.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'label'" :is-loading="isLoading"></item-errors>

          <LabelForm
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

import LabelForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    LabelForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'label/item',
    isLoading: 'general/isLoading',
    errors: 'label/errors'
  }),

  methods: {
    ...mapActions({
      create: 'label/create',
      reset: 'label/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'LabelShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
