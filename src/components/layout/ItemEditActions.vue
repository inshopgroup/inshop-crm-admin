<template>
  <v-container fluid row>
    <v-layout row>
      <v-flex md4 sm12>
        <v-btn class="mx-1" type="submit" large color="success">{{
          $t('submit')
        }}</v-btn>
      </v-flex>
      <v-flex md4 sm12 text-center>
        <v-btn
          v-if="btnBackToList && isGranted(role_list)"
          class="mx-1"
          large
          color="info"
          @click="backToList()"
        >
          {{ $t('back_to_list') }}
        </v-btn>
        <v-btn
          v-if="item.id && isGranted(role_show)"
          class="mx-1"
          large
          color="primary"
          @click="showItem()"
        >
          {{ $t('show') }}
        </v-btn>
      </v-flex>
      <v-flex md4 sm12 text-right>
        <v-btn
          v-if="btnBackToList && isGranted(role_delete)"
          class="mx-1"
          large
          color="error"
          @click="deleteItem()"
        >
          {{ $t('delete') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
      return 'ROLE_' + this.path.toUpperCase() + '_SHOW'
    },
    role_list() {
      return 'ROLE_' + this.path.toUpperCase() + '_LIST'
    },
    role_delete() {
      return 'ROLE_' + this.path.toUpperCase() + '_DELETE'
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: this.entity + 'List' })
    },
    showItem() {
      this.$router.push({
        name: this.entity + 'Show',
        params: { id: this.item.id }
      })
    },
    deleteItem() {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store
          .dispatch(this.path + '/remove', this.item)
          .then(() => this.$router.push({ name: this.entity + 'List' }))
      }
    }
  }
}
</script>
