<script>
import fecha from 'fecha'

export default {
  methods: {
    dateFormat(date, format = 'DD-MM-YYYY HH:mm') {
      return fecha.format(fecha.parse(date, 'YYYY-MM-DDTHH:mm:ss'), format)
    }
  }
}
</script>