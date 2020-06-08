<script>
export default {
  methods: {
    crmDateFormat(date, format = 'DD-MM-YYYY HH:mm') {
      const value = date || undefined

      return this.$dayjs(value).local().format(format)
    },
  },
}
</script>
