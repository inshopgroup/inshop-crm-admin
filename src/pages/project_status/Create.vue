<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_status_add') }}</h1>
    </section>
    <ProjectStatusForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectStatusForm from './Form'

export default {
  components: {
    ProjectStatusForm
  },
  computed: {
    ...mapGetters({
      item: 'projectStatus/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'projectStatus/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'ProjectStatusShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
