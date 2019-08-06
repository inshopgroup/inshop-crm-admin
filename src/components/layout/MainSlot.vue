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
              :prepend-icon="prependIcon(item)"
              :append-icon="appendIcon(item)"
              @click="listItemClick(item)"
              v-if="isGrantedItem(item)"
              v-model="item.model"
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
                  {{ $t(child.label) }}
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
        <v-layout align-start justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>

    <is-footer></is-footer>

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
import fecha from 'fecha'
import ModalNotDoneTasks from './ModalNotDoneTasks'
import axios from '../../interceptor'

export default {
  name: 'MainSlot',
  components: { ModalNotDoneTasks },
  data() {
    return {
      fecha,
      q: null,
      tasks: [],
      dialog: true,
      drawer: null,
      items: [
        { label: 'dashboard', icon: 'dashboard', route: 'Dashboard', role: 'ROLE_USER_DASHBOARD' },
        { label: 'calendar', icon: 'perm_contact_calendar', route: 'Calendar', role: 'ROLE_OTHER_CALENDAR' },
        { label: 'contacts', icon: 'people', children: [
            { label: 'clients', icon: 'people_outline', route: 'ClientList', role: 'ROLE_CLIENT_LIST' },
            { label: 'companies', icon: 'grade', route: 'CompanyList', role: 'ROLE_COMPANY_LIST' },
            { label: 'address', icon: 'my_location', route: 'AddressList', role: 'ROLE_ADDRESS_LIST' },
            { label: 'country', icon: 'flag', route: 'CountryList', role: 'ROLE_COUNTRY_LIST' },
            { label: 'city', icon: 'location_city', route: 'CityList', role: 'ROLE_CITY_LIST' },
            { label: 'contacts', icon: 'local_phone', route: 'ContactList', role: 'ROLE_CONTACT_LIST' },
        ]},
        { label: 'product', icon: 'store', children: [
            { label: 'category', icon: 'format_align_justify', route: 'CategoryList', role: 'ROLE_CATEGORY_LIST' },
            { label: 'product', icon: 'format_align_justify', route: 'ProductList', role: 'ROLE_PRODUCT_LIST' },
        ]},
        { label: 'cms', icon: 'mode_edit', children: [
            { label: 'text', icon: 'text_fields', route: 'TextList', role: 'ROLE_TEXT_LIST' },
        ]},
        { label: 'projects', icon: 'folder', children: [
            { label: 'projects', icon: 'folder_open', route: 'ProjectList', role: 'ROLE_PROJECT_LIST' },
            { label: 'tasks', icon: 'access_time', route: 'TaskList', role: 'ROLE_TASK_LIST' },
        ]},
        { label: 'documents', icon: 'insert_drive_file', children: [
            { label: 'documents', icon: 'turned_in', route: 'DocumentList', role: 'ROLE_DOCUMENT_LIST' },
            { label: 'templates', icon: 'turned_in_not', route: 'TemplateList', role: 'ROLE_TEMPLATE_LIST' },
            { label: 'template_types', icon: 'tune', route: 'TemplateTypeList', role: 'ROLE_TEMPLATE_TYPE_LIST' },
        ]},
        { label: 'order_header', icon: 'local_grocery_store', children: [
            { label: 'order_header', icon: 'assignment', route: 'OrderHeaderList', role: 'ROLE_ORDER_HEADER_LIST' },
            { label: 'order_status', icon: 'library_books', route: 'OrderStatusList', role: 'ROLE_ORDER_STATUS_LIST' },
            { label: 'order_line_status', icon: 'format_align_justify', route: 'OrderLineStatusList', role: 'ROLE_ORDER_LINE_STATUS_LIST' },
        ]},
        { label: 'invoice_header', icon: 'attach_money', children: [
            { label: 'invoice_header', icon: 'format_align_justify', route: 'InvoiceHeaderList', role: 'ROLE_INVOICE_HEADER_LIST' },
            { label: 'invoice_status', icon: 'format_align_justify', route: 'InvoiceStatusList', role: 'ROLE_INVOICE_STATUS_LIST' },
            { label: 'invoice_type', icon: 'format_align_justify', route: 'InvoiceTypeList', role: 'ROLE_INVOICE_TYPE_LIST' },
        ]},
        { label: 'dictionaries', icon: 'list', children: [
            { label: 'language', icon: 'format_align_justify', route: 'LanguageList', role: 'ROLE_LANGUAGE_LIST' },
            { label: 'vat', icon: 'format_align_justify', route: 'VatList', role: 'ROLE_VAT_LIST' },
            { label: 'currency', icon: 'format_align_justify', route: 'CurrencyList', role: 'ROLE_CURRENCY_LIST' },
            { label: 'contact_type', icon: 'format_align_justify', route: 'ContactTypeList', role: 'ROLE_CONTACT_TYPE_LIST' },
            { label: 'project_type', icon: 'format_align_justify', route: 'ProjectTypeList', role: 'ROLE_PROJECT_TYPE_LIST' },
            { label: 'project_status', icon: 'format_align_justify', route: 'ProjectStatusList', role: 'ROLE_PROJECT_STATUS_LIST' },
            { label: 'task_status', icon: 'format_align_justify', route: 'TaskStatusList', role: 'ROLE_TASK_STATUS_LIST' },
            { label: 'brand', icon: 'format_align_justify', route: 'BrandList', role: 'ROLE_BRAND_LIST' },
            { label: 'channel', icon: 'format_align_justify', route: 'ChannelList', role: 'ROLE_CHANNEL_LIST' },
            { label: 'label', icon: 'format_align_justify', route: 'LabelList', role: 'ROLE_LABEL_LIST' },
            { label: 'paymentType', icon: 'format_align_justify', route: 'PaymentTypeList', role: 'ROLE_PAYMENT_TYPE_LIST' },
            { label: 'shipmentMethod', icon: 'format_align_justify', route: 'ShipmentMethodList', role: 'ROLE_SHIPMENT_METHOD_LIST' },
        ]},
        { label: 'users', icon: 'security', children: [
            { label: 'users', icon: 'format_align_justify', route: 'UserList', role: 'ROLE_USER_LIST' },
            { label: 'groups', icon: 'format_align_justify', route: 'GroupList', role: 'ROLE_GROUP_LIST' },
          ]},
        { label: 'maintenance', icon: 'settings', children: [
            { label: 'backup', icon: 'format_align_justify', route: 'BackupList', role: 'ROLE_BACKUP_LIST' },
            { label: 'history', icon: 'watch', route: 'HistoryList', role: 'ROLE_HISTORY_LIST' },
          ]},
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
    prependIcon(item) {
      if (item.icon) {
        return item.icon
      }
    },
    appendIcon(item) {
      if (item.children && item.children.length) {
        return item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
      }

      return null
    },
    listItemClick(item) {
      if (item.route) {
        this.$router.push({
          name: item.route,
        })
      }
    },
    isGrantedItem(item) {
      if (item.role) {
        return this.isGranted(item.role)
      }

      if (item.children) {
        return item.children.some(child => {
          return this.isGranted(child.role)
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
