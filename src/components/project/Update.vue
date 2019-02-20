<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project.edit', {entity: item && item.name}) }}</h1>
    </section>

    <item-errors :entity="'project'" :is-loading="isLoading"></item-errors>

    <ProjectForm

      :handle-submit="onSendForm"

      :item="item"
      :errors="errors"
      />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ProjectForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'project/item',
      errors: 'project/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'project/getItem',
      reset: 'project/reset',
      update: 'project/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ProjectShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
