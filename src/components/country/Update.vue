<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('country.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'country'" :is-loading="isLoading"></item-errors>

          <CountryForm

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
import CountryForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    CountryForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'country/item',
      errors: 'country/errors'
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
      getItem: 'country/getItem',
      reset: 'country/reset',
      update: 'country/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
