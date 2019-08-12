<template>
  <is-show-template :fields="fields" entity="Channel" />  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      fields: [
        {
          value: 'name',
          type: 'string',
        },
        {
          value: 'currency',
          type: 'object',
        },
      ]
    }
  },
}
</script>
