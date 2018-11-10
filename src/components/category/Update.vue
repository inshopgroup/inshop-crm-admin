<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'category'" :is-loading="isLoading"></item-update-errors>

          <CategoryForm
            v-if="!isLoading"
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :item="retrieved"
            :errors="violations" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    CategoryForm
  },

  computed: {
    ...mapGetters({
      isLoading: 'category/update/isLoading',
      deleted: 'category/del/deleted',
      retrieved: 'category/update/retrieved',
      violations: 'category/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'CategoryList' })
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
      createReset: 'category/create/reset',
      delReset: 'category/del/reset',
      retrieve: 'category/update/retrieve',
      updateReset: 'category/update/reset',
      update: 'category/update/update',
      updateRetrieved: 'category/update/updateRetrieved'
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
