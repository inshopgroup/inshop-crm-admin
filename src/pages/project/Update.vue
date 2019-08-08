<template>
  <is-main-template
    title="project_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'project/getItem',
      update: 'project/update'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'ProjectShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
