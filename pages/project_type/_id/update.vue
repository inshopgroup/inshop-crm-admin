<template>
  <is-main-template
    title="project_type_edit"
    :title-params="{ entity: item && item.name }"
  >
    <project-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectTypeForm from '../Form'

export default {
  components: {
    ProjectTypeForm,
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
      item: 'project_type/item',
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
      getItem: 'project_type/getItem',
      update: 'project_type/update',
      reset: 'project_type/reset',
    }),
    onSendForm() {
      this.update()
        .then((item) => {
          this.$router.push({
            name: 'project_type-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
