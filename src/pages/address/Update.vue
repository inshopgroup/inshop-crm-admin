<template>
  <is-main-template
    title="address_edit"
    :title-params="{ entity: item && item.id }"
  >
    <address-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'address/getItem',
      update: 'address/update',
      reset: 'address/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'AddressShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
