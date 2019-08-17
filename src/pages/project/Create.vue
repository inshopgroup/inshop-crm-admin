<template>
  <is-main-template title="project_add">
    <project-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectForm from './Form'

export default {
  components: {
    ProjectForm
  },
  computed: {
    ...mapGetters({
      item: 'project/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'project/create',
      reset: 'project/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'ProjectShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
