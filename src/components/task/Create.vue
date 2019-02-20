<template>
  <div>
    <section class="content-header">
      <h1>{{$t('task.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

          <TaskForm
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

import TaskForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    TaskForm
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'task/item',
    isLoading: 'general/isLoading',
    errors: 'task/errors'
  }),
  methods: {
    ...mapActions({
      create: 'task/create',
      reset: 'task/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'TaskShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
