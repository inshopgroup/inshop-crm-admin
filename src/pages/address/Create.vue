<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address_add') }}</h1>
    </section>
    <AddressForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
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
  methods: {
    ...mapActions({
      create: 'address/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'AddressShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
