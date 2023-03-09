<script lang="ts">
export default {
  methods: {
    translate(item: any): object {
      let translationLocale = null
      let translationAny: null | object = null

      item.translations.forEach((translation) => {
        if (translationAny === null) {
          translationAny = translation
        }

        if (translation.locale === this.$i18n.locale) {
          translationLocale = translation
        }
      })

      return translationLocale || translationAny || {}
    },
  },
}
</script>
