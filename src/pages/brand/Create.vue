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
  methods: {
    ...mapActions({
      create: 'brand/create'
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
