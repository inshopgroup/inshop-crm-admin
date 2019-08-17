<template>
  <is-main-template title="brand_add">
    <brand-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BrandForm from './Form'

export default {
  components: {
    BrandForm
  },
  computed: {
    ...mapGetters({
      item: 'brand/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'brand/create',
      reset: 'brand/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'BrandShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
