<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'contact_type'" :is-loading="isLoading"></item-errors>

          <ContactTypeForm

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
import ContactTypeForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ContactTypeForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'contact_type/item',
      errors: 'contact_type/errors'
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
      getItem: 'contact_type/getItem',
      reset: 'contact_type/reset',
      update: 'contact_type/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ContactTypeShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
