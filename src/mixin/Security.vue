<script>
export default {
  methods: {
    isGranted (role) {
      let roles = this.$store.getters['auth/roles']
      
      return (roles.indexOf(role) !== -1)
    }
  }
}
</script>
