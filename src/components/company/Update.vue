<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('company.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'company'" :is-loading="isLoading"></item-errors>

          <CompanyForm

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
import CompanyForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    CompanyForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'company/item',
      errors: 'company/errors'
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
      getItem: 'company/getItem',
      reset: 'company/reset',
      update: 'company/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
