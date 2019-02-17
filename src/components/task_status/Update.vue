<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task_status.edit', {entity: item && item.name}) }}</h1>
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
import { mapActions, mapGetters } from 'vuex'
import TaskStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    TaskStatusForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'task_status/item',
      errors: 'task_status/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'task_status/getItem',
      reset: 'task_status/reset',
      update: 'task_status/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'TaskStatusShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
