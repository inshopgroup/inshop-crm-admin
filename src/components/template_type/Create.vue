<template>
  <div>
    <section class="content-header">
      <h1>{{$t('template_type.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template_type'" :is-loading="isLoading"></item-errors>

          <TemplateTypeForm
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

import TemplateTypeForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    TemplateTypeForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'template_type/item',
    isLoading: 'general/isLoading',
    errors: 'template_type/errors'
  }),
  methods: {
    ...mapActions({
      create: 'template_type/create',
      reset: 'template_type/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'TemplateTypeShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
