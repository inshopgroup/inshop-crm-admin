<template>
  <is-main-template
    title="label_edit"
    :title-params="{ entity: item && item.name }"
  >
    <label-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LabelForm from '../Form'

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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'label/getItem',
      update: 'label/update',
      reset: 'label/reset',
    }),
    onSendForm() {
      this.update()
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
