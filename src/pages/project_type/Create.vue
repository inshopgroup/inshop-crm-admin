<template>
  <is-main-template title="project_type_add">
    <project-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectTypeForm from './Form'

export default {
  components: {
    ProjectTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'projectType/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'projectType/create',
      reset: 'projectType/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'ProjectTypeShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
