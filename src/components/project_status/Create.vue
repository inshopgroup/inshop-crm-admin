<template>
  <div>
    <section class="content-header">
      <h1>{{$t('project_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'project_status'" :is-loading="isLoading"></item-errors>

          <ProjectStatusForm
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

import ProjectStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ProjectStatusForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'project_status/item',
    isLoading: 'general/isLoading',
    errors: 'project_status/errors'
  }),
  methods: {
    ...mapActions({
      create: 'project_status/create',
      reset: 'project_status/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ProjectStatusShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
