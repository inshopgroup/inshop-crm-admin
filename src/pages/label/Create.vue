<template>
  <is-main-template title="label_add">
    <label-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LabelForm from './Form'

export default {
  components: {
    LabelForm
  },
  computed: {
    ...mapGetters({
      item: 'label/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'label/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'LabelShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
