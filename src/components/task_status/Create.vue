<template>
  <div>
    <section class="content-header">
      <h1>{{$t('task_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'task_status'" :is-loading="isLoading"></item-errors>

          <TaskStatusForm
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

import TaskStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    TaskStatusForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'task_status/item',
    isLoading: 'general/isLoading',
    errors: 'task_status/errors'
  }),
  methods: {
    ...mapActions({
      create: 'task_status/create',
      reset: 'task_status/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'TaskStatusShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
