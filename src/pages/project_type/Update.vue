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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'projectType/getItem',
      update: 'projectType/update'
    }),
    onSendForm() {
      this.update()
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
