<template>
  <div>
    <section class="content-header">
      <h1>{{$t('company.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-create-errors :entity="'template'" :is-loading="isLoading"></item-create-errors>

          <CompanyForm
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
import CompanyForm from './Form'
import ItemCreateErrors from '../layout/errors/ItemCreateErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('company/create')

export default {
  components: {
    ItemCreateErrors,
    CompanyForm
  },

  data () {
    return {
      item: {}
    }
  },

  mounted () {
    this.getLast()
      .then((data) => {
        if (!this.item) {
          return 1
        }

        this.item.code = data.code + 1
      })
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

      this.$router.push({ name: 'CompanyUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create',
      'getLast',
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
