<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template_type'" :is-loading="isLoading"></item-errors>

          <TemplateTypeForm

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
import TemplateTypeForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    TemplateTypeForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'template_type/item',
      errors: 'template_type/errors'
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
      getItem: 'template_type/getItem',
      reset: 'template_type/reset',
      update: 'template_type/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'TemplateTypeShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
