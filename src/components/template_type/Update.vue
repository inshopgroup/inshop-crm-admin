<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_type.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'template_type'" :is-loading="isLoading"></item-update-errors>

          <TemplateTypeForm
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
import TemplateTypeForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    TemplateTypeForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'template_type/update/isLoading',
      deleted: 'template_type/del/deleted',
      retrieved: 'template_type/update/retrieved',
      violations: 'template_type/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'TemplateTypeList' })
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
      createReset: 'template_type/create/reset',
      delReset: 'template_type/del/reset',
      retrieve: 'template_type/update/retrieve',
      updateReset: 'template_type/update/reset',
      update: 'template_type/update/update',
      updateRetrieved: 'template_type/update/updateRetrieved'
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
