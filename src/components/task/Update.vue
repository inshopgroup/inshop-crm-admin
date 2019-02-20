<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'task'" :is-loading="isLoading"></item-errors>

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
import { mapActions, mapGetters } from 'vuex'
import TaskForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    TaskForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'task/item',
      errors: 'task/errors'
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
      getItem: 'task/getItem',
      reset: 'task/reset',
      update: 'task/update',
    }),
    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'TaskShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
