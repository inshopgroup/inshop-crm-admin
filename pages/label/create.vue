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
    LabelForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'label/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'label/create',
      reset: 'label/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'label-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
