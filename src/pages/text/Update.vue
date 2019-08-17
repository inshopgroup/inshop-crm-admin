<template>
  <is-main-template
    title="text_edit"
    :title-params="{ entity: item && translate(item).title }"
  >
    <text-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TextForm from './Form'

export default {
  components: {
    TextForm
  },
  computed: {
    ...mapGetters({
      item: 'text/item'
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
      getItem: 'text/getItem',
      update: 'text/update',
      reset: 'text/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'TextShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
