<template>
  <div class="user-groups">
    <is-main-template :class="{ 'd-none': isLoading }" title="group_add">
      <group-form :handle-submit="onSendForm" :item="item" />
    </is-main-template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GroupForm from './Form'

export default {
  components: {
    GroupForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'group/item',
    }),
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'group/create',
      reset: 'group/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'group-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
