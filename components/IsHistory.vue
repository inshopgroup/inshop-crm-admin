<template>
  <is-table :headers="headers" :items="items"></is-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapActions, mapGetters } from 'vuex'

import type { IDataTableHeader } from '~/types/DataTable'

export default Vue.extend({
  name: 'IsHistory',
  props: {
    id: {
      type: Number,
      required: true,
    } as PropOptions<number>,
    entity: {
      type: String,
      required: true,
    } as PropOptions<string>,
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('id'),
          value: 'id',
        },
        {
          text: this.$t('action'),
          value: 'action',
        },
        {
          text: this.$t('username'),
          value: 'username',
        },
        {
          text: this.$t('logged_at'),
          value: 'loggedAt',
          type: 'datetime',
        },
        {
          text: this.$t('changes'),
          value: 'changes',
          type: 'list',
        },
      ] as IDataTableHeader[],
    }
  },
  computed: {
    ...mapGetters({
      items: 'history/items',
    }),
  },
  mounted() {
    this.getItems({
      entity: this.entity,
      id: this.id,
    })
  },
  methods: {
    ...mapActions({
      getItems: 'history/getItems',
    }),
  },
})
</script>
