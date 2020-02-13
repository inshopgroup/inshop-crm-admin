<template>
  <form @submit.prevent="handleSubmit(item)">
    <v-container fluid>
      <item-errors entity="group" />
      <form-input
        :item="item"
        :errors="errors"
        property="name"
        label="name"
        @formUpdated="updateValue"
      />
      <form-checkbox
        :item="item"
        :errors="errors"
        property="isActive"
        label="isActive"
        @formUpdated="updateValue"
      />

      <v-row>
        <v-col
          v-for="module in modules"
          :key="module.id"
          cols="12"
          lg="2"
          md="3"
          sm="4"
          class="pa-1"
        >
          <v-card outlined>
            <v-toolbar color="primary" dark dense>
              <v-toolbar-title>
                {{ $t(module.name.replace(/\s+/g, '_').toLowerCase()) }}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <form-checkbox
                v-for="role in module.roles"
                :id="role['@id']"
                :key="role.id"
                :item="{ value: item.roleIRIs.includes(role['@id']) }"
                :errors="errors"
                property="value"
                :label="role.name.toLowerCase()"
                @formUpdated="updateRole"
              />
            </v-card-text>

            <v-card-actions>
              <v-btn fab x-small color="primary" @click="select(module)">
                <v-icon>
                  check_box
                </v-icon>
              </v-btn>
              <v-btn fab x-small color="primary" @click="deselect(module)">
                <v-icon>
                  check_box_outline_blank
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <item-edit-actions :item="item" entity="Group" path="group" />
    </v-container>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ItemEditActions
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      errors: 'group/errors'
    }),
    modules() {
      return this.$store.getters['module/items'] || []
    }
  },
  beforeDestroy() {
    this.reset()
  },
  created() {
    this.getModules({
      itemsPerPage: 500
    })
  },
  methods: {
    ...mapActions({
      reset: 'group/reset',
      getModules: 'module/getItems'
    }),
    updateValue(property, value) {
      this.$store.commit('group/GROUP_UPDATE_ITEM', { [property]: value })
    },
    updateRole(property, value, iri) {
      this.$store.commit('group/GROUP_UPDATE_ITEM_ROLES', {
        iri,
        value
      })
    },
    batchChange(module, value) {
      module.roles.forEach(role => {
        this.updateRole('value', value, role['@id'])
      })
    },
    select(module) {
      this.batchChange(module, true)
    },
    deselect(module) {
      this.batchChange(module, false)
    }
  }
}
</script>
