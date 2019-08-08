<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="group" />
      <div class="box box-primary">
        <div class="box-body">
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

          <v-item-group multiple>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  v-for="module in modules" 
                  :key="module.id"
                  xs12
                  md2
                >
                  <v-card outlined>
                    <v-card-title 
                      class="justify-space-between fill-height"
                    >
                      {{ $t(module.name.replace(/\s+/g, '_').toLowerCase()) }}
                      <form-checkbox
                        :item="item"
                        :errors="errors"
                        label="All"
                        @formUpdated="selectAll"
                      />
                    </v-card-title>
                    <v-card-text>
                      <span
                        v-for="role in module.roles"
                        :key="role.id"
                      >
                        <form-checkbox
                          :id="role['@id']"
                          :item="{ value: item.roleIRIs.includes(role['@id']) }"
                          :errors="errors"
                          property="value"
                          :label="role.name.toLowerCase()"
                          @formUpdated="updateRole"
                        />
                      </span>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-item-group>

        </div>
      </div>
      <item-edit-actions :item="item" entity="Group" path="group" />
    </section>
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
    selectAll() {
      
    },
    updateValue(property, value) {
      this.$store.commit('group/GROUP_UPDATE_ITEM', { [property]: value })
    },
    updateRole(property, value, iri) {
      this.$store.commit('group/GROUP_UPDATE_ITEM_ROLES', {
        iri: iri,
        value: value
      })
    }
  }
}
</script>
