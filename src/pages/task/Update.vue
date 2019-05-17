<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task_edit', {entity: item && item.name}) }}</h1>
    </section>
    <TaskForm :handle-submit="onSendForm" :item="item"/>
  </div>
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
  methods: {
    ...mapActions({
      getItem: 'task/getItem',
      update: 'task/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'TaskShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
