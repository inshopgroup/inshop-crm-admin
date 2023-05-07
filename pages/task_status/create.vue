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
    TaskStatusForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'task_status/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'task_status/create',
      reset: 'task_status/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'task_status-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
