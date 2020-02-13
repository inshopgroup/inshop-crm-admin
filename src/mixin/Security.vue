<script>
export default {
  methods: {
    isGranted(role) {
      const roles = this.$store.getters['auth/roles']

      return roles.indexOf(role) !== -1
    }
  }
}
</script>
