<template>
  <is-main-template
    title="task_status_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'taskStatus/getItem',
      update: 'taskStatus/update',
      reset: 'taskStatus/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'TaskStatusShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
