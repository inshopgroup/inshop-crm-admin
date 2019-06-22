<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task_status_add') }}</h1>
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
      item: 'taskStatus/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'taskStatus/create'
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
