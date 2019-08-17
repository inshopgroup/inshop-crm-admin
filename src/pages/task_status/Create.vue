<template>
  <is-main-template title="task_status_add">
    <task-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
      item: 'taskStatus/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'taskStatus/create',
      reset: 'taskStatus/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'TaskStatusShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
