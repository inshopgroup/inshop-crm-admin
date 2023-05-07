<template>
  <is-main-template
    title="project_status_edit"
    :title-params="{ entity: item && item.name }"
  >
    <project-status-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectStatusForm from '../Form'

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
      item: 'project_status/item',
    }),
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'project_status/getItem',
      update: 'project_status/update',
      reset: 'project_status/reset',
    }),
    onSendForm() {
      this.update()
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
