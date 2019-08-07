<template>
  <is-main-template title="task_add">
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
  methods: {
    ...mapActions({
      create: 'task/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'TaskShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
