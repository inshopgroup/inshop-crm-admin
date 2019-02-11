<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('brand.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'brand'" :is-loading="isLoading"></item-errors>

          <BrandForm
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
import BrandForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    BrandForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'brand/del/deleted',
      retrieved: 'brand/update/retrieved',
      violations: 'brand/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'BrandList' })
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
      createReset: 'brand/create/reset',
      delReset: 'brand/del/reset',
      retrieve: 'brand/update/retrieve',
      updateReset: 'brand/update/reset',
      update: 'brand/update/update',
      updateRetrieved: 'brand/update/updateRetrieved'
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
