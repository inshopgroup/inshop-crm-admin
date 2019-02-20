<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address.edit', {entity: item && item.id}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'address'" :is-loading="isLoading"></item-errors>

          <AddressForm
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
import AddressForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    AddressForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      item: 'address/item',
      errors: 'address/errors'
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
      getItem: 'address/getItem',
      reset: 'address/reset',
      update: 'address/update',
    }),
    onSendForm() {
      this.update().then(() => {
        this.$router.push({name: 'AddressShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
