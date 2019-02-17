<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_status.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'project_status'" :is-loading="isLoading"></item-errors>

          <ProjectStatusForm

            :handle-submit="onSendForm"

            :item="item"
            :errors="errors"
            />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ProjectStatusForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'project_status/item',
      errors: 'project_status/errors'
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
      getItem: 'project_status/getItem',
      reset: 'project_status/reset',
      update: 'project_status/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ProjectStatusShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
