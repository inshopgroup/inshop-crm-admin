<template>
  <div>
    <section class="content-header">
      <h1>{{$t('city.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'city'" :is-loading="isLoading"></item-errors>

          <CityForm
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :values="item"
            :errors="violations"
            v-if="!isLoading"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CityForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('city/create')

export default {
  components: {
    CityForm,
    ItemErrors
  },

  data () {
    return {
      item: {}
    }
  },

  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'CityUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
