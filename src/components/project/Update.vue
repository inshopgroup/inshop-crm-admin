<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <item-errors :entity="'project'" :is-loading="isLoading"></item-errors>

    <ProjectForm
      v-if="item && !isLoading"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />
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

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'project/update/isLoading',
      deleted: 'project/del/deleted',
      retrieved: 'project/update/retrieved',
      violations: 'project/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'ProjectList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'project/create/reset',
      delReset: 'project/del/reset',
      retrieve: 'project/update/retrieve',
      updateReset: 'project/update/reset',
      update: 'project/update/update',
      updateRetrieved: 'project/update/updateRetrieved'
    }),

    reset () {
      this.updateReset()
      this.delReset()
      this.createReset()
    },

    onSendForm () {
      this.update()
    },

    updateField (field, value) {
      this.updateRetrieved({ [field]: value })
    }
  }
}
</script>
