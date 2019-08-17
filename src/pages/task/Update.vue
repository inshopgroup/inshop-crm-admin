<template>
  <is-main-template
    title="task_edit"
    :title-params="{ entity: item && item.name }"
  >
    <task-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskForm from './Form'

export default {
  components: {
    TaskForm
  },
  computed: {
    ...mapGetters({
      item: 'task/item'
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
      getItem: 'task/getItem',
      update: 'task/update',
      reset: 'task/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'TaskShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
