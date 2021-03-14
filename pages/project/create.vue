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
    ProjectForm,
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
      item: 'project/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'project/create',
      reset: 'project/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'project-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
