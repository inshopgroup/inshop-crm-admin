<script>
export default {
  methods: {
    translate(item) {
      let translationLocale = null
      let translationAny = null

      item.translations.forEach(translation => {
        if (translationAny === null) {
          translationAny = translation
        }

        if (translation.locale === this.$i18n.locale) {
          translationLocale = translation
        }
      })

      return translationLocale || translationAny || {}
    }
  }
}
</script>
