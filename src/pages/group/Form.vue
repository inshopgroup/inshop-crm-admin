<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'group'" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            :property="'name'"
            label="name"
            @formUpdated="updateValue"
          />
          <div
            class="form-group"
            v-for="module in modules"
            :key="module.id"
          >
            <h2>{{ $t('module.' + module.name.replace(/\s+/g, '_').toLowerCase()) }}</h2>
            <span
              v-for="role in module.roles"
              style="margin-left: 20px;"
              :key="role.id"
            >
              <form-checkbox
                :id="role['@id']"
                :item="{value: item.roleIRIs.includes(role['@id'])}"
                :errors="errors"
                :property="'value'"
                :label="role.name.toLowerCase()"
                @formUpdated="updateRole"
              />
            </span>
          </div>
        </div>
      </div>
      <item-edit-actions
        :item="item"
        :entity="'Group'"
        :path="'group'"
      />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from "../../components/layout/errors/ItemErrors"

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
  beforeDestroy() {
    this.reset()
  },
  computed: {
    ...mapGetters({
      errors: 'group/errors'
    }),
    modules() {
      return this.$store.getters['module/items'] || []
    },
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
      this.$store.commit('group/GROUP_UPDATE_ITEM', {[property]: value})
    },
    updateRole(property, value, iri) {
      this.$store.commit('group/GROUP_UPDATE_ITEM_ROLES', {iri: iri, value: value})
    }
  }
}
</script>
