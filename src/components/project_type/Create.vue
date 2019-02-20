<template>
  <div>
    <section class="content-header">
      <h1>{{$t('project_type.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'project_type'" :is-loading="isLoading"></item-errors>

          <ProjectTypeForm
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

import ProjectTypeForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ProjectTypeForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'project_type/item',
    isLoading: 'general/isLoading',
    errors: 'project_type/errors'
  }),
  methods: {
    ...mapActions({
      create: 'project_type/create',
      reset: 'project_type/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ProjectTypeShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
