<template>
  <is-show-template
    :fields="fields"
    entity="Group"
    :tabs="['roles']"
    :history-key="historyKey"
  >
    <template v-slot:roles="{ item }">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="module in modules"
            :key="module.id"
            cols="12"
            lg="2"
            md="2"
            sm="6"
            class="pa-2"
          >
            <v-card outlined>
              <v-toolbar color="primary" dark dense>
                <v-toolbar-title>
                  {{ $t(module.name.replace(/\s+/g, '_').toLowerCase()) }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <ul v-if="item && item.roles">
                  <li v-for="role in roles(module)" :key="role.id">
                    {{ $t(role.name.toLowerCase()) }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </is-show-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
          type: 'string'
        }
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
  }
}
</script>
