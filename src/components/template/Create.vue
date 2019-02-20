<template>
  <div>
    <section class="content-header">
      <h1>{{$t('template.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

          <TemplateForm
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

import TemplateForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    TemplateForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'template/item',
    isLoading: 'general/isLoading',
    errors: 'template/errors'
  }),
  methods: {
    ...mapActions({
      create: 'template/create',
      reset: 'template/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'TemplateShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
