<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('city.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'city'" :is-loading="isLoading"></item-errors>

          <CityForm

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
import CityForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    CityForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'city/item',
      errors: 'city/errors'
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
      getItem: 'city/getItem',
      reset: 'city/reset',
      update: 'city/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'CityShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
