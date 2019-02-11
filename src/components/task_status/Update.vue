<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('task_status.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'task_status'" :is-loading="isLoading"></item-errors>

          <TaskStatusForm
            v-if="item && !isLoading"
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :values="item"
            :errors="violations"
            :initial-values="retrieved" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    TaskStatusForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'task_status/del/deleted',
      retrieved: 'task_status/update/retrieved',
      violations: 'task_status/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'TaskStatusList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'task_status/create/reset',
      delReset: 'task_status/del/reset',
      retrieve: 'task_status/update/retrieve',
      updateReset: 'task_status/update/reset',
      update: 'task_status/update/update',
      updateRetrieved: 'task_status/update/updateRetrieved'
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
