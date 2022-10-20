<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
      hide-overlay
      :src="bg"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="isGrantedItem(item)"
            :key="item.label"
            ref="listGroup"
            v-model="item.model"
            :prepend-icon="prependIcon(item)"
            :append-icon="appendIcon(item)"
            @click="listItemClick(item)"
          >
            <template #activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(item.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-for="(child, i) in item.children">
              <v-list-item
                v-if="isGrantedItem(child)"
                :key="i"
                :class="{
                  'active-item': routeName(child.route) === activeRoute,
                }"
                @click="listItemClick(child)"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon right>
                    {{ child.icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(child.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
      :src="bg"
    >
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down mx-2">Inshop CRM</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="mx-2">{{ username }}</span>
      <v-btn icon @click="signOut">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <is-footer></is-footer>

    <modal-not-done-tasks
      :tasks="tasks"
      :dialog="dialog"
      @dialog-close="dialog = false"
    ></modal-not-done-tasks>
  </v-app>
</template>

<script>
import ModalNotDoneTasks from '@/components/layout/ModalNotDoneTasks'
import bg from '../assets/bg.png'

export default {
  name: 'MainSlot',
  components: { ModalNotDoneTasks },
  data() {
    return {
      bg,
      q: null,
      tasks: [],
      dialog: false,
      drawer: null,
      activeRoute: null,
      items: [
        {
          label: 'dashboard',
          icon: 'mdi-tablet-dashboard',
          route: '/dashboard',
          role: 'ROLE_USER_DASHBOARD',
        },
        {
          label: 'calendar',
          icon: 'mdi-calendar',
          route: '/calendar',
          role: 'ROLE_OTHER_CALENDAR',
        },
        {
          label: 'clients',
          icon: 'mdi-account-group',
          route: '/client',
          role: 'ROLE_CLIENT_LIST',
        },
        {
          label: 'projects',
          icon: 'mdi-folder-open',
          route: '/project',
          role: 'ROLE_PROJECT_LIST',
        },
        {
          label: 'tasks',
          icon: 'mdi-clock-outline',
          route: '/task',
          role: 'ROLE_TASK_LIST',
        },
        {
          label: 'documents',
          icon: 'mdi-bookmark',
          route: '/document',
          role: 'ROLE_DOCUMENT_LIST',
        },
        {
          label: 'contacts',
          icon: 'mdi-contacts',
          children: [
            {
              label: 'contacts',
              icon: 'mdi-local_phone',
              route: '/contact',
              role: 'ROLE_CONTACT_LIST',
            },
            {
              label: 'address',
              icon: 'mdi-my_location',
              route: '/address',
              role: 'ROLE_ADDRESS_LIST',
            },
          ],
        },
        {
          label: 'dictionaries',
          icon: 'mdi-list',
          children: [
            {
              label: 'country',
              icon: 'mdi-flag',
              route: '/country',
              role: 'ROLE_COUNTRY_LIST',
            },
            {
              label: 'language',
              icon: 'mdi-format_align_justify',
              route: '/language',
              role: 'ROLE_LANGUAGE_LIST',
            },
            {
              label: 'contact_type',
              icon: 'mdi-call_end',
              route: '/contact_type',
              role: 'ROLE_CONTACT_TYPE_LIST',
            },
            {
              label: 'project_type',
              icon: 'mdi-work',
              route: '/project_type',
              role: 'ROLE_PROJECT_TYPE_LIST',
            },
            {
              label: 'project_status',
              icon: 'mdi-web',
              route: '/project_status',
              role: 'ROLE_PROJECT_STATUS_LIST',
            },
            {
              label: 'task_status',
              icon: 'mdi-web_asset',
              route: '/task_status',
              role: 'ROLE_TASK_STATUS_LIST',
            },
            {
              label: 'label',
              icon: 'mdi-label',
              route: '/label',
              role: 'ROLE_LABEL_LIST',
            },
          ],
        },
        {
          label: 'users',
          icon: 'mdi-security',
          children: [
            {
              label: 'users',
              icon: 'mdi-account_box',
              route: '/user',
              role: 'ROLE_USER_LIST',
            },
            {
              label: 'groups',
              icon: 'mdi-people_outline',
              route: '/group',
              role: 'ROLE_GROUP_LIST',
            },
          ],
        },
        {
          label: 'maintenance',
          icon: 'mdi-cog',
          children: [
            {
              label: 'history',
              icon: 'mdi-timelapse',
              route: '/history',
              role: 'ROLE_HISTORY_LIST',
            },
          ],
        },
      ],
    }
  },
  computed: {
    username() {
      const jwt = this.$store.getters['auth/jwtDecoded']

      return jwt ? jwt.name : null
    },
  },
  watch: {
    $route(to, from) {
      this.activeRoute = this.routeName(to.name)
      this.initActiveMenuItem()
    },
  },
  created() {
    this.activeRoute = this.routeName(this.$route.name)
  },
  mounted() {
    if (this.isGranted('ROLE_TASK_LIST')) {
      this.getTasks()
    }

    this.initActiveMenuItem()
  },
  methods: {
    initActiveMenuItem() {
      this.items.forEach((i) => {
        if (i.children && i.children.length) {
          i.children.forEach((el) => {
            if (this.routeName(el.route) === this.activeRoute) {
              i.model = true
            }
          })
        } else if (this.routeName(i.route) === this.activeRoute) {
          i.model = true
        }
      })
    },
    routeName(route) {
      return route ? route.replace(/(List|Show|Create|Update)/, '') : ''
    },
    prependIcon(item) {
      if (item.icon) {
        return item.icon
      }
    },
    appendIcon(item) {
      if (item.children && item.children.length) {
        return 'mdi-chevron-down'
      }

      return null
    },
    listItemClick(item) {
      if (item.route) {
        this.$router.push(item.route)
      }
    },
    isGrantedItem(item) {
      if (item.role) {
        return this.isGranted(item.role)
      }

      if (item.children) {
        return item.children.some((child) => this.isGranted(child.role))
      }

      return false
    },
    signOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    getTasks() {
      const url = `${process.env.NUXT_ENV_API_URL}/tasks/deadline`

      this.$axios.get(url).then((response) => {
        this.tasks = response.data['hydra:member']

        if (this.tasks.length) {
          this.dialog = true
        }
      })
    },
  },
}
</script>

<style lang="scss">
.v-navigation-drawer {
  .v-list {
    &-group--active {
      .v-list-group__items {
        background: #142430;
      }
      .v-list-group__header {
        background: #142430;
      }
    }
    .theme--dark {
      .v-icon {
        color: #fff !important;
      }
    }
  }
}
.active-item {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3 !important;
    background-color: #fafafa !important;
  }
}
</style>
