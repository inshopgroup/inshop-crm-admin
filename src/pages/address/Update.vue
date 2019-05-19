<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address_edit', {entity: item && item.id}) }}</h1>
    </section>
    <AddressForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddressForm from './Form'

export default {
  components: {
    AddressForm
  },
  computed: {
    ...mapGetters({
      item: 'address/item'
    })
  },
  created () {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'address/getItem',
      update: 'address/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'AddressShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
