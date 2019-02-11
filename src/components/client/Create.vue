<template>
  <div>
    <section class="content-header">
      <h1>{{$t('client.add')}}</h1>
    </section>

    <item-errors :entity="'client'" :is-loading="isLoading"></item-errors>

    <ClientForm
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      v-if="!isLoading"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ClientForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('client/create')

export default {
  components: {
    ItemErrors,
    ClientForm
  },

  data () {
    return {
      item: {
        contacts: [],
        projects: []
      }
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

      this.$router.push({ name: 'ClientUpdate', params: { id: created['@id'] } })
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
