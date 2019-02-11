<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'project_type'" :is-loading="isLoading"></item-errors>

          <ProjectTypeForm

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
import ProjectTypeForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ProjectTypeForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'project_type/item',
      errors: 'project_type/errors'
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
      getItem: 'project_type/getItem',
      reset: 'project_type/reset',
      update: 'project_type/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
