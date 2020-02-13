<template>
  <v-row justify="center" justify-sm="space-between">
    <v-col cols="auto">
      <v-btn type="submit" large color="success">
        {{ $t('submit') }}
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <div class="">
        <v-btn
          v-if="btnBackToList && isGranted(role_list)"
          class="mx-1"
          large
          color="primary"
          @click="backToList"
        >
          {{ $t('back_to_list') }}
        </v-btn>
        <v-btn
          v-if="item.id && isGranted(role_show)"
          class="mx-1"
          large
          color="primary"
          @click="showItem"
        >
          {{ $t('show') }}
        </v-btn>
      </div>
    </v-col>
    <v-col cols="auto">
      <v-btn
        v-if="item.id && isGranted(role_delete)"
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
  name: 'ItemEditActions',
  props: {
    item: {
      type: Object,
      required: true
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
    role_show() {
      return `ROLE_${this.path.toUpperCase()}_SHOW`
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
    showItem() {
      this.$router.push({
        name: `${this.entity}Show`,
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
