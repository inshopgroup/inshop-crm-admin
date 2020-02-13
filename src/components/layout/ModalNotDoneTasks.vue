<template>
  <v-dialog :value="dialog" max-width="1200">
    <v-card>
      <v-card-title class="headline">
        {{ $t('notification_deadline') }}
        <v-spacer></v-spacer>
        <v-icon class="mr-2" @click="dialogClose">
          close
        </v-icon>
      </v-card-title>

      <v-card-text>
        <is-table :headers="headers" :items="tasks" :items-per-page="10">
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" color="primary" @click="goto(item)">
              remove_red_eye
            </v-icon>
          </template>
        </is-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalNotDoneTasks',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('name'), value: 'name' },
        {
          text: this.$t('client'),
          value: 'project.name',
          type: 'object',
          sortable: false
        },
        {
          text: this.$t('assignee_name'),
          value: 'assignee.name',
          type: 'object',
          sortable: false
        },
        {
          text: this.$t('status_name'),
          value: 'status.name',
          type: 'object',
          sortable: false
        },
        {
          text: this.$t('deadline'),
          value: 'deadline',
          type: 'datetime',
          sortable: false
        },
        {
          text: this.$t('createdAt'),
          value: 'createdAt',
          type: 'datetime',
          sortable: false
        },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    goto(task) {
      this.dialogClose()
      this.$router.push({ name: 'TaskShow', params: { id: task.id } })
    },
    dialogClose() {
      this.$emit('dialog-close')
    }
  }
}
</script>
