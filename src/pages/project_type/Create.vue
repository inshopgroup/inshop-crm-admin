<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_type_add') }}</h1>
    </section>
    <ProjectTypeForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
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
  methods: {
    ...mapActions({
      create: 'projectType/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'ProjectTypeShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
