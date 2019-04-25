<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task_status_edit', {entity: item && item.name}) }}</h1>
    </section>

    <TaskStatusForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskStatusForm from './Form'

export default {
  components: {
    TaskStatusForm
  },
  computed: {
    ...mapGetters({
      item: 'task_status/item',
    })
  },
  created () {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'task_status/getItem',
      update: 'task_status/update',
    }),
    onSendForm () {
      this.update().then(item => {
        this.$router.push({name: 'TaskStatusShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
