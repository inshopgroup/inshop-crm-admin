<script>
  import fecha from 'fecha'

  export default {
    methods: {
      dateFormat (date) {
        return fecha.format(fecha.parse(date, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm')
      }
    }
  }
</script>