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
    TaskForm,
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
      item: 'task/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'task/create',
      reset: 'task/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'task-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
