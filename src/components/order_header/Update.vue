<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_header.edit', {entity: item && item.number}) }}</h1>
    </section>

    <item-errors :entity="'order_header'" :is-loading="isLoading"></item-errors>

    <OrderHeaderForm

      :handle-submit="onSendForm"

      :item="item"
      :errors="errors"
      />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderHeaderForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    OrderHeaderForm
  },

  data () {
    return {
      item: {
        lines: []
      }
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'order_header/item',
      errors: 'order_header/errors'
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
      getItem: 'order_header/getItem',
      reset: 'order_header/reset',
      update: 'order_header/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'OrderHeaderShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
