<template>
  <is-main-template title="project_status_add">
    <project-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectStatusForm from './Form'

export default {
  components: {
    ProjectStatusForm,
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
      item: 'projectStatus/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'projectStatus/create',
      reset: 'projectStatus/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'project_status-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
