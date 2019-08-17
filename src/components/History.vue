<template>
  <is-table :headers="headers" :items="items"></is-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'History',
  components: {},
  props: {
    id: {
      type: Number,
      required: true
    },
    entity: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('id'),
          value: 'id',
          type: 'string'
        },
        {
          text: this.$t('action'),
          value: 'action',
          type: 'string'
        },
        {
          text: this.$t('username'),
          value: 'username',
          type: 'string'
        },
        {
          text: this.$t('logged_at'),
          value: 'loggedAt',
          type: 'datetime'
        },
        {
          text: this.$t('changes'),
          value: 'changes',
          type: 'list'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      items: 'history/items'
    })
  },
  mounted() {
    this.getItems({
      entity: this.entity,
      id: this.id
    })
  },
  methods: {
    ...mapActions({
      getItems: 'history/getItems'
    })
  }
}
</script>
