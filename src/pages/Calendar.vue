<template>
  <is-main-template title="calendar">
    <v-row>
      <v-col cols="12">
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn class="mr-4" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small class="mx-1" @click="prev">
              <v-icon small>arrow_back_ios</v-icon>
            </v-btn>
            <v-btn fab text small class="mx-1" @click="next">
              <v-icon small>arrow_forward_ios</v-icon>
            </v-btn>
            <v-toolbar-title class="ml-4">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>arrow_drop_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :event-margin-bottom="3"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            full-width
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn
                  icon
                  :to="{ name: 'TaskUpdate', params: { id: selectedEvent.id } }"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p>{{ crmDateFormat(selectedEvent.deadline, 'YYYY-MM-DD') }}</p>
                <p>{{ selectedEvent.description }}</p>
                <p>
                  {{ $t('client') }}:
                  <router-link
                    v-if="
                      selectedEvent &&
                        selectedEvent.project &&
                        selectedEvent.project.client
                    "
                    :to="{
                      name: 'ClientShow',
                      params: { id: selectedEvent.project.client.id }
                    }"
                  >
                    {{ selectedEvent.project.client.name }}
                  </router-link>
                </p>
                <p>
                  {{ $t('assignee_name') }}:
                  <router-link
                    v-if="selectedEvent && selectedEvent.assignee"
                    :to="{
                      name: 'UserShow',
                      params: { id: selectedEvent.assignee.id }
                    }"
                  >
                    {{ selectedEvent.assignee.name }}
                  </router-link>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="success"
                  :to="{ name: 'TaskShow', params: { id: selectedEvent.id } }"
                >
                  More details
                </v-btn>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      today: window.moment().format('YYYY-MM-DD'),
      focus: window.moment().format('YYYY-MM-DD'),
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'task/items'
    }),
    events() {
      this.tasks.forEach(task => {
        task.start = this.crmDateFormat(task.deadline, 'YYYY-MM-DD')
        task.end = this.crmDateFormat(task.deadline, 'YYYY-MM-DD')
        task.color = 'primary'
      })

      return this.tasks
    },
    title() {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const startYear = start.year
      const startDay = start.day

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long'
      })
    }
  },
  created() {
    this.load(window.moment().format('M/Y'))
  },
  methods: {
    ...mapActions({
      getTasks: 'task/getItems'
    }),
    load(date) {
      this.getTasks({
        'deadline[after]': window.moment(date, 'M/Y').format('DD-MM-YYYY'),
        'deadline[before]': window.moment(date, 'M/Y')
          .endOf('month')
          .add(1, 'day')
          .format('DD-MM-YYYY'),
        'order[deadline]': 'asc',
        'status.id[]': '1',
        itemsPerPage: '500'
      })
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      this.load(window.moment(start.date).format('M/Y'))
      this.start = start
      this.end = end
    }
  }
}
</script>

<style lang="scss">
.theme--light {
  .v-calendar {
    &-weekly {
      &__day-label {
        margin: 4px 0 !important;
      }
      &__head-weekday {
        flex: 1 0 0;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        &:first-child {
          border-left: 1px solid #e0e0e0;
        }
      }
      &__day {
        &:first-child {
          border-left: 1px solid #e0e0e0;
        }
      }
    }
    .v-event {
      &-end {
        margin: 0 auto;
      }
    }
  }
}
</style>
