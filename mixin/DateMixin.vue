<script>
export default {
  methods: {
    crmDateFormat(date, format = 'DD-MM-YYYY') {
      if (date) {
        return this.$date(date).format(format)
      }
    },
  },
}
</script>
