<template>
  <div>
    <section class="content-header">
      <h1>{{$t('category.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-create-errors :entity="'category'" :is-loading="isLoading"></item-create-errors>

          <CategoryForm
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :item="item"
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
import CategoryForm from './Form'
import ItemCreateErrors from '../layout/errors/ItemCreateErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('category/create')

export default {
  components: {
    CategoryForm,
    ItemCreateErrors
  },

  data () {
    return {
      item: {
        translations: []
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

      this.$router.push({ name: 'CategoryUpdate', params: { id: created['@id'] } })
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
