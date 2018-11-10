<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('city.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'city'" :is-loading="isLoading"></item-update-errors>

          <CityForm
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
import CityForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    CityForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'city/update/isLoading',
      deleted: 'city/del/deleted',
      retrieved: 'city/update/retrieved',
      violations: 'city/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'CityList' })
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
      createReset: 'city/create/reset',
      delReset: 'city/del/reset',
      retrieve: 'city/update/retrieve',
      updateReset: 'city/update/reset',
      update: 'city/update/update',
      updateRetrieved: 'city/update/updateRetrieved'
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
