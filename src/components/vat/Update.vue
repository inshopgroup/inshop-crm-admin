<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('vat.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'vat'" :is-loading="isLoading"></item-errors>

          <VatForm
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
import VatForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    VatForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'vat/item',
      errors: 'vat/errors'
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
      getItem: 'vat/getItem',
      reset: 'vat/reset',
      update: 'vat/update',
    }),
    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'VatShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
