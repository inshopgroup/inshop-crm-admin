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

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface ItemProps {
  id?: string
}

export default Vue.extend({
  name: 'ItemShowActions',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    } as PropOptions<ItemProps>,
    path: {
      type: String,
      required: true,
    } as PropOptions<string>,
    btnBackToList: {
      type: Boolean,
      default: true,
    } as PropOptions<boolean>,
    btnEdit: {
      type: Boolean,
      default: true,
    } as PropOptions<boolean>,
    btnDelete: {
      type: Boolean,
      default: true,
    } as PropOptions<boolean>,
  },
  computed: {
    role_update(): string {
      return `ROLE_${this.path.toUpperCase()}_UPDATE`
    },
    role_list(): string {
      return `ROLE_${this.path.toUpperCase()}_LIST`
    },
    role_delete(): string {
      return `ROLE_${this.path.toUpperCase()}_DELETE`
    },
  },
  methods: {
    backToList(): void {
      this.$router.push({ name: `${this.path}___en` })
    },
    editItem(): void {
      if (this.item.id) {
        this.$router.push({
          name: `${this.path}-id-update___en`,
          params: { id: this.item.id },
        })
      }
    },
    deleteItem(): void {
      if (this.item.id && window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store
          .dispatch(`${this.path}/remove`, this.item)
          .then(() => this.$router.push({ name: `${this.path}___en` }))
      }
    },
  },
})
</script>
