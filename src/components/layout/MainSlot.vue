<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
              :key="item.label"
              :prepend-icon="item.icon"
              append-icon=""
              @click="listItemClick(item)"
              v-if="isGrantedItem(item)"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(item.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                @click="listItemClick(child)"
                v-if="isGrantedItem(child)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        dark
    >
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down mx-2">Inshop CRM</span>
      </v-toolbar-title>

      <v-layout column>
        <v-form
            v-if="isGranted('ROLE_OTHER_SEARCH')"
            method="get"
            @submit.prevent="search"
            class="hidden-sm-and-down"
        >
          <v-text-field
              flat
              hide-details
              solo-inverted
              prepend-inner-icon="search"
              label="Search"
              v-model="q"
          ></v-text-field>
        </v-form>
      </v-layout>

      <v-spacer></v-spacer>
      <span class="mx-2">{{ username }}</span>
      <v-btn icon @click="signOut">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>

    <footer-slot></footer-slot>

<!--    <v-dialog-->
<!--        v-model="dialog"-->
<!--        width="800px"-->
<!--    >-->
<!--      <v-card>-->
<!--        <v-card-title class="grey darken-2">-->
<!--          Create contact-->
<!--        </v-card-title>-->
<!--        <v-container grid-list-sm>-->
<!--          <v-layout-->
<!--              wrap-->
<!--          >-->
<!--            <v-flex-->
<!--                xs12-->
<!--                align-center-->
<!--                justify-space-between-->
<!--            >-->
<!--              <v-layout align-center>-->
<!--                <v-avatar-->
<!--                    size="40px"-->
<!--                    class="mr-4"-->
<!--                >-->
<!--                  <img-->
<!--                      src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"-->
<!--                      alt=""-->
<!--                  >-->
<!--                </v-avatar>-->
<!--                <v-text-field-->
<!--                    placeholder="Name"-->
<!--                ></v-text-field>-->
<!--              </v-layout>-->
<!--            </v-flex>-->
<!--            <v-flex xs6>-->
<!--              <v-text-field-->
<!--                  prepend-icon="business"-->
<!--                  placeholder="Company"-->
<!--              ></v-text-field>-->
<!--            </v-flex>-->
<!--            <v-flex xs6>-->
<!--              <v-text-field-->
<!--                  placeholder="Job title"-->
<!--              ></v-text-field>-->
<!--            </v-flex>-->
<!--            <v-flex xs12>-->
<!--              <v-text-field-->
<!--                  prepend-icon="mail"-->
<!--                  placeholder="Email"-->
<!--              ></v-text-field>-->
<!--            </v-flex>-->
<!--            <v-flex xs12>-->
<!--              <v-text-field-->
<!--                  type="tel"-->
<!--                  prepend-icon="phone"-->
<!--                  placeholder="(000) 000 - 0000"-->
<!--              ></v-text-field>-->
<!--            </v-flex>-->
<!--            <v-flex xs12>-->
<!--              <v-text-field-->
<!--                  prepend-icon="notes"-->
<!--                  placeholder="Notes"-->
<!--              ></v-text-field>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-container>-->
<!--        <v-card-actions>-->
<!--          <v-btn-->
<!--              text-->
<!--              color="primary"-->
<!--          >More</v-btn>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn-->
<!--              text-->
<!--              color="primary"-->
<!--              @click="dialog = false"-->
<!--          >Cancel</v-btn>-->
<!--          <v-btn-->
<!--              text-->
<!--              @click="dialog = false"-->
<!--          >Save</v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
  </v-app>


<!--  <div class="wrapper">-->
<!--    <header class="main-header">-->
<!--      <a href="/" class="logo">-->
<!--        <span class="logo-lg">{{ $t('title') }}</span>-->
<!--      </a>-->

<!--      <header-slot />-->
<!--    </header>-->

<!--    <left-sidebar-slot />-->

<!--    <div class="content-wrapper">-->
<!--      <section class="content container-fluid">-->
<!--        <router-view />-->
<!--      </section>-->
<!--    </div>-->

<!--    <footer-slot />-->

<!--    <div class="control-sidebar-bg" />-->

<!--    <modal-not-done-tasks :tasks="tasks" />-->
<!--  </div>-->

</template>

<script>
// import Header from '../../components/layout/Header'
import fecha from 'fecha'
import FooterSlot from '../../components/layout/FooterSlot'
// import LeftSidebarSlot from '../../components/layout/LeftSidebarSlot'
import ModalNotDoneTasks from './ModalNotDoneTasks'
import axios from '../../interceptor'

export default {
  name: 'MainSlot',
  components: { ModalNotDoneTasks, FooterSlot
    // , LeftSidebarSlot, HeaderSlot
  },
  data() {
    return {
      fecha,
      q: null,
      tasks: [],
      dialog: true,
      drawer: null,
      // source: '',
      items: [
        { label: 'dashboard', route: 'Dashboard', icon: 'keyboard', role: 'ROLE_USER_DASHBOARD' },
        { label: 'calendar', route: 'Calendar', icon: 'keyboard', role: 'ROLE_OTHER_CALENDAR' },
        { label: 'contacts', icon: 'keyboard', children: [
            { label: 'clients', route: 'ClientList', icon: 'keyboard', role: 'ROLE_CLIENT_LIST' },
          ] },
        // { icon: 'history', text: 'Frequently contacted' },
        // { icon: 'content_copy', text: 'Duplicates' },
        // {
        //   icon: 'keyboard_arrow_up',
        //   // 'icon-alt': 'keyboard_arrow_down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'add', text: 'Create label' },
        //   ],
        // },
        // {
        //   icon: 'keyboard_arrow_up',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
        // { icon: 'settings', text: 'Settings' },
        // { icon: 'chat_bubble', text: 'Send feedback' },
        // { icon: 'help', text: 'Help' },
        // { icon: 'phonelink', text: 'App downloads' },
        // { icon: 'keyboard', text: 'Go to the old version' },
      ],
    }
  },
  mounted() {
    if (this.isGranted('ROLE_TASK_LIST')) {
      this.getTasks()
    }
  },
  computed: {
    username() {
      return this.$store.getters['auth/jwtDecoded']['name']
    }
  },
  methods: {
    listItemClick(item) {
      // console.log(item)
      if (item.route) {
        this.$router.push({
          name: item.route,
          // params: { id: this.item.id }
        })
      }
    },
    isGrantedItem(item) {
      if (item.role) {
        return this.isGranted(item.role)
      }

      if (item.children) {
        item.children.forEach(child => {

        })
      }

      return false
    },
    search() {
      this.$router.push({ name: 'Search', query: { q: this.q } })
    },
    signOut() {
      this.$store.dispatch('auth/logout')
    },
    getTasks() {
      let url = process.env.VUE_APP_API_URL + '/tasks/deadline'

      axios.get(url).then(response => {
        this.tasks = response.data['hydra:member']

        if (this.tasks.length) {
          window.$('#modal-not-done-tasks').modal('show')
        }
      })
    }
  }
}
</script>
