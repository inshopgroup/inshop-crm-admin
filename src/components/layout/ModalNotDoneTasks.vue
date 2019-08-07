<template>
  <v-layout justify-center>
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
          <v-data-table :headers="headers" :items="tasks" :items-per-page="10">
            <template v-slot:item.id="{ item }">
              {{ item.id }}
            </template>
            <template v-slot:item.client="{ item }">
              {{ item.project.name }}
            </template>
            <template v-slot:item.assignee="{ item }">
              {{ item.assignee.name }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status.name }}
            </template>
            <template v-slot:item.deadline="{ item }">
              {{ crmDateFormat(item.deadline) }}
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ crmDateFormat(item.createdAt) }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon class="mr-2" color="success" @click="goto(item)">
                remove_red_eye
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
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
        { text: this.$t('client'), value: 'client', sortable: false },
        { text: this.$t('assignee_name'), value: 'assignee', sortable: false },
        { text: this.$t('status_name'), value: 'status', sortable: false },
        { text: this.$t('deadline'), value: 'deadline', sortable: false },
        { text: this.$t('createdAt'), value: 'createdAt', sortable: false },
        { text: '', value: 'action', sortable: false }
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
