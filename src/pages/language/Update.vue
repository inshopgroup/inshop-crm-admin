<template>
  <is-main-template
    title="language_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'language/getItem',
      update: 'language/update'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'LanguageShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
