<template>
  <is-show-template :fields="fields" entity="Group" :tabs="['roles']">
    <template v-slot:roles="{ item }">

      <div v-for="module in modules" :key="module.id">
        <h2>{{ $t(module.name.replace(/\s+/g, '_').toLowerCase()) }}</h2>
        <ul v-if="item && item.roles">
          <li v-for="role in roles(module)" :key="role.id">
            {{ $t(role.name.toLowerCase()) }}
          </li>
        </ul>
      </div>
      
    </template>
  </is-show-template>
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      item: 'group/item'
    }),
    modules() {
      return this.$store.getters['module/items'] || []
    }
  },
  created() {
    this.getItem(this.$route.params.id)
    this.getModules({
      itemsPerPage: 500
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'group/getItem',
      reset: 'group/reset',
      getModules: 'module/getItems'
    }),
    roles(module) {
      return this.item.roles.filter(role => role.module.id === module.id)
    }
  },
}
</script>
