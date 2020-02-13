<template>
  <v-row justify="center" justify-sm="space-between">
    <v-col cols="auto">
      <v-btn
        v-if="btnEdit && isGranted(role_update)"
        large
        color="primary"
        @click="editItem"
      >
        {{ $t('edit') }}
      </v-btn>
    </v-col>

    <v-col cols="auto">
      <v-btn
        v-if="btnBackToList && isGranted(role_list)"
        large
        color="primary"
        @click="backToList"
      >
        {{ $t('back_to_list') }}
      </v-btn>
    </v-col>

    <v-col cols="auto">
      <v-btn
        v-if="btnDelete && isGranted(role_delete)"
        large
        color="error"
        @click="deleteItem"
      >
        {{ $t('delete') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ItemShowActions',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    entity: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    btnBackToList: {
      type: Boolean,
      default: true
    },
    btnEdit: {
      type: Boolean,
      default: true
    },
    btnDelete: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    role_update() {
      return `ROLE_${this.path.toUpperCase()}_UPDATE`
    },
    role_list() {
      return `ROLE_${this.path.toUpperCase()}_LIST`
    },
    role_delete() {
      return `ROLE_${this.path.toUpperCase()}_DELETE`
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: `${this.entity}List` })
    },
    editItem() {
      this.$router.push({
        name: `${this.entity}Update`,
        params: { id: this.item.id }
      })
    },
    deleteItem() {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store
          .dispatch(`${this.storeModule(this.path)}/remove`, this.item)
          .then(() => this.$router.push({ name: `${this.entity}List` }))
      }
    }
  }
}
</script>
