<script>
export default {
  methods: {
    storeModule(entity) {
      return entity.charAt(0).toLowerCase() + entity.slice(1)
    }
  }
}
</script>
