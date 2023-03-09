<template>
  <is-show-template
    :fields="fields"
    entity="Label"
    :history-key="historyKey"
  ></is-show-template>
</template>

<script lang="ts">
import Vue from 'vue'

import type { Route } from 'vue-router/types'
import type { IDataTableField } from '~/types/DataTable'

export default Vue.extend({
  layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
          type: 'string',
        },
      ] as IDataTableField[],
    }
  },
  head() {
    return {
      title: 'Homepage title',
    }
  },
})
</script>
