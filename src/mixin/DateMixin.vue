<script>
import fecha from 'fecha'

export default {
  methods: {
    crmDateFormat(date, format = 'DD-MM-YYYY HH:mm') {
      if (date) {
        return fecha.format(fecha.parse(date, 'YYYY-MM-DDTHH:mm:ss'), format)
      }
    }
  }
}
</script>
