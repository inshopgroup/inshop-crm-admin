<template>
  <is-main-template title="language_add">
    <language-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LanguageForm from './Form'

export default {
  components: {
    LanguageForm
  },
  computed: {
    ...mapGetters({
      item: 'language/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'language/create',
      reset: 'language/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'LanguageShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
