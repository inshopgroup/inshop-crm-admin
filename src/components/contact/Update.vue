<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact.edit', {entity: item && item.value}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'contact'" :is-loading="isLoading"></item-errors>

          <ContactForm
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
import ContactForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ContactForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      item: 'contact/item',
      errors: 'contact/errors'
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
      getItem: 'contact/getItem',
      reset: 'contact/reset',
      update: 'contact/update',
    }),
    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ContactShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
