<template>
  <vue-event-calendar
    :events="tasksPrepared"
    @month-changed="load($event)"
  >
    <template slot-scope="props">
      <div
        v-for="(task, index) in props.showEvents"
        class="event-item"
        :key="task.id"
      >
        <h3 class="title">
          <router-link :to="{name: 'TaskShow', params: { id: task.id }}">
            {{ index + 1 }}. {{ task.name }}
          </router-link>
        </h3>
        <p class="time">
          {{ moment(task.deadline).format('DD-MM-YYYY') }}
        </p>
        <p>
          {{ $t('client') }}:
          <router-link :to="{name: 'ClientShow', params: { id: task.project.client.id }}">
            {{ task.project.client.name }}
          </router-link>
        </p>
        <p>
          {{ $t('assignee_name') }}:
          <router-link
            :to="{name: 'UserShow', params: { id: task.assignee.id }}"
            v-if="task && task['assignee']"
          >
            {{ task.assignee.name }}
          </router-link>
        </p>
        <p class="desc">
          <router-link :to="{ name: 'TaskShow', params: { id: task.id } }">
            {{ task.description }}
          </router-link>
        </p>
      </div>
    </template>
  </vue-event-calendar>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
import Vue from 'vue'

Vue.prototype.moment = moment

export default {
  computed: {
    ...mapGetters({
      tasks: 'task/items',
    }),
    tasksPrepared() {
      this.tasks.forEach(task => {
        task.date = moment(task.deadline).format('YYYY/M/D')
        task.title = task.name
      })

      return this.tasks
    }
  },
  created() {
    this.load(moment().format('M/Y'));
  },
  methods: {
    ...mapActions({
      getTasks: 'task/getItems'
    }),
    load(date) {
      this.getTasks({
        'deadline[after]=': moment(date, 'M/Y').format('DD-MM-YYYY'),
        'deadline[before]=': moment(date, 'M/Y').endOf('month').add(1, 'day').format('DD-MM-YYYY'),
        'order[deadline]': 'asc',
        'status.id[]': '1',
        'itemsPerPage': '500'
        }
      )
    }
  }
}
</script>

<style scoped>
  p.desc {
    width: 370px;
  }

  p.desc a {
    color: #9b9b9b;
    font-size: 14px;
  }

  h3.title a {
    color: #323232;
    font-size: 14px;
  }
</style>
