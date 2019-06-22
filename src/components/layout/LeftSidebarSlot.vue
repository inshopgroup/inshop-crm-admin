<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <!--<div class="user-panel">-->
      <!--&lt;!&ndash;<div class="pull-left image">&ndash;&gt;-->
      <!--&lt;!&ndash;<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div >-->
      <!--<p>Alexander Pierce</p>-->
      <!--&lt;!&ndash; Status &ndash;&gt;-->
      <!--&lt;!&ndash;<a href="#"><i class="fa fa-circle text-success"></i> Online</a>&ndash;&gt;-->
      <!--</div>-->
      <!--</div>-->

      <!-- search form (Optional) -->
      <form
        v-if="isGranted('ROLE_OTHER_SEARCH')"
        method="get"
        class="sidebar-form"
        @submit.prevent="search"
      >
        <div class="input-group">
          <input
            v-model="q"
            type="text"
            name="q"
            class="form-control"
            placeholder="Search..."
          />
          <span class="input-group-btn">
            <button
              id="search-btn"
              type="submit"
              name="search"
              class="btn btn-flat"
            >
              <i class="fa fa-search" />
            </button>
          </span>
        </div>
      </form>
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">
          {{ $t('title') }}
        </li>

        <li v-if="isGranted('ROLE_USER_DASHBOARD')">
          <router-link :to="{ name: 'Dashboard' }">
            <i class="fa fa-dashboard" /> <span>{{ $t('dashboard') }}</span>
          </router-link>
        </li>
        <li v-if="isGranted('ROLE_OTHER_CALENDAR')">
          <router-link :to="{ name: 'Calendar' }">
            <i class="fa fa-calendar" /> <span>{{ $t('calendar') }}</span>
          </router-link>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-users" /> <span>{{ $t('contacts') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_CLIENT_LIST')">
              <router-link :to="{ name: 'ClientList' }">
                <i class="fa fa-users" /> <span>{{ $t('clients') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_COMPANY_LIST')">
              <router-link :to="{ name: 'CompanyList' }">
                <i class="fa fa-star" /> <span>{{ $t('companies') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_ADDRESS_LIST')">
              <router-link :to="{ name: 'AddressList' }">
                <i class="fa fa-address-book" />
                <span>{{ $t('address') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_COUNTRY_LIST')">
              <router-link :to="{ name: 'CountryList' }">
                <i class="fa fa-flag" /> <span>{{ $t('country') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_CITY_LIST')">
              <router-link :to="{ name: 'CityList' }">
                <i class="fa fa-building" /> <span>{{ $t('city') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_CONTACT_LIST')">
              <router-link :to="{ name: 'ContactList' }">
                <i class="fa fa-phone" /> <span>{{ $t('contacts') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="
            isGranted('ROLE_CATEGORY_LIST') || isGranted('ROLE_PRODUCT_LIST')
          "
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-product-hunt" /> <span>{{ $t('product') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_CATEGORY_LIST')">
              <router-link :to="{ name: 'CategoryList' }">
                <i class="fa fa-list" /> <span>{{ $t('category') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_PRODUCT_LIST')">
              <router-link :to="{ name: 'ProductList' }">
                <i class="fa fa-product-hunt" />
                <span>{{ $t('product') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="isGranted('ROLE_TEXT_LIST')" class="treeview">
          <a href="#">
            <i class="fa fa-edit" /> <span>{{ $t('cms') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_TEXT_LIST')">
              <router-link :to="{ name: 'TextList' }">
                <i class="fa fa-file-text-o" /> <span>{{ $t('text') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="isGranted('ROLE_PROJECT_LIST') || isGranted('ROLE_TASK_LIST')"
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-folder-open" /> <span>{{ $t('projects') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_PROJECT_LIST')">
              <router-link :to="{ name: 'ProjectList' }">
                <i class="fa  fa-folder-open" />
                <span>{{ $t('projects') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_TASK_LIST')">
              <router-link :to="{ name: 'TaskList' }">
                <i class="fa fa-clock-o" /> <span>{{ $t('tasks') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="
            isGranted('ROLE_DOCUMENT_LIST') ||
              isGranted('ROLE_TEMPLATE_LIST') ||
              isGranted('ROLE_TEMPLATE_TYPE_LIST')
          "
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-file-o" /> <span>{{ $t('documents') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_DOCUMENT_LIST')">
              <router-link :to="{ name: 'DocumentList' }">
                <i class="fa fa-file-o" /> <span>{{ $t('documents') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_TEMPLATE_LIST')">
              <router-link :to="{ name: 'TemplateList' }">
                <i class="fa fa-file" /> <span>{{ $t('templates') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_TEMPLATE_TYPE_LIST')">
              <router-link :to="{ name: 'TemplateTypeList' }">
                <i class="fa fa-file" /> <span>{{ $t('template_types') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="
            isGranted('ROLE_ORDER_HEADER_LIST') ||
              isGranted('ROLE_ORDER_STATUS_LIST') ||
              isGranted('ROLE_ORDER_LINE_STATUS_LIST')
          "
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-dashboard" /> <span>{{ $t('order_header') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_ORDER_HEADER_LIST')">
              <router-link :to="{ name: 'OrderHeaderList' }">
                <i class="fa fa-list" /> <span>{{ $t('order_header') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_ORDER_STATUS_LIST')">
              <router-link :to="{ name: 'OrderStatusList' }">
                <i class="fa fa-list" /> <span>{{ $t('order_status') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_ORDER_LINE_STATUS_LIST')">
              <router-link :to="{ name: 'OrderLineStatusList' }">
                <i class="fa fa-list" />
                <span>{{ $t('order_line_status') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="
            isGranted('ROLE_INVOICE_HEADER_LIST') ||
              isGranted('ROLE_INVOICE_STATUS_LIST') ||
              isGranted('ROLE_INVOICE_TYPE_LIST')
          "
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-dashboard" />
            <span>{{ $t('invoice_header') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_INVOICE_HEADER_LIST')">
              <router-link :to="{ name: 'InvoiceHeaderList' }">
                <i class="fa fa-list" /> <span>{{ $t('invoice_header') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_INVOICE_STATUS_LIST')">
              <router-link :to="{ name: 'InvoiceStatusList' }">
                <i class="fa fa-list" /> <span>{{ $t('invoice_status') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_INVOICE_TYPE_LIST')">
              <router-link :to="{ name: 'InvoiceTypeList' }">
                <i class="fa fa-list" /> <span>{{ $t('invoice_type') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="
            isGranted('ROLE_LANGUAGE_LIST') ||
              isGranted('ROLE_VAT_LIST') ||
              isGranted('ROLE_CURRENCY_LIST') ||
              isGranted('ROLE_CONTACT_TYPE_LIST') ||
              isGranted('ROLE_PROJECT_TYPE_LIST') ||
              isGranted('ROLE_PROJECT_STATUS_LIST') ||
              isGranted('ROLE_TASK_STATUS_LIST') ||
              isGranted('ROLE_BRAND_LIST') ||
              isGranted('ROLE_CHANNEL_LIST') ||
              isGranted('ROLE_LABEL_LIST') ||
              isGranted('ROLE_PAYMENT_TYPE_LIST') ||
              isGranted('ROLE_SHIPMENT_METHOD_LIST')
          "
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-list" /> <span>{{ $t('dictionaries') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_LANGUAGE_LIST')">
              <router-link :to="{ name: 'LanguageList' }">
                <i class="fa fa-language" /> <span>{{ $t('language') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_VAT_LIST')">
              <router-link :to="{ name: 'VatList' }">
                <i class="fa fa-list" /> <span>{{ $t('vat') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_CURRENCY_LIST')">
              <router-link :to="{ name: 'CurrencyList' }">
                <i class="fa fa-eur" /> <span>{{ $t('currency') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_CONTACT_TYPE_LIST')">
              <router-link :to="{ name: 'ContactTypeList' }">
                <i class="fa fa-list" /> <span>{{ $t('contact_type') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_PROJECT_TYPE_LIST')">
              <router-link :to="{ name: 'ProjectTypeList' }">
                <i class="fa fa-list" /> <span>{{ $t('project_type') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_PROJECT_STATUS_LIST')">
              <router-link :to="{ name: 'ProjectStatusList' }">
                <i class="fa fa-list" /> <span>{{ $t('project_status') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_TASK_STATUS_LIST')">
              <router-link :to="{ name: 'TaskStatusList' }">
                <i class="fa fa-list" /> <span>{{ $t('task_status') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_BRAND_LIST')">
              <router-link :to="{ name: 'BrandList' }">
                <i class="fa fa-list" /> <span>{{ $t('brand') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_CHANNEL_LIST')">
              <router-link :to="{ name: 'ChannelList' }">
                <i class="fa fa-list" /> <span>{{ $t('channel') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_LABEL_LIST')">
              <router-link :to="{ name: 'LabelList' }">
                <i class="fa fa-list" /> <span>{{ $t('label') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_PAYMENT_TYPE_LIST')">
              <router-link :to="{ name: 'PaymentTypeList' }">
                <i class="fa fa-list" /> <span>{{ $t('paymentType') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_SHIPMENT_METHOD_LIST')">
              <router-link :to="{ name: 'ShipmentMethodList' }">
                <i class="fa fa-list" /> <span>{{ $t('shipmentMethod') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="isGranted('ROLE_USER_LIST') || isGranted('ROLE_GROUP_LIST')"
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-shield" /> <span>{{ $t('users') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_USER_LIST')">
              <router-link :to="{ name: 'UserList' }">
                <i class="fa fa-user-secret" /> <span>{{ $t('users') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_GROUP_LIST')">
              <router-link :to="{ name: 'GroupList' }">
                <i class="fa fa-shield" /> <span>{{ $t('groups') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          v-if="isGranted('ROLE_BACKUP_LIST') || isGranted('ROLE_HISTORY_LIST')"
          class="treeview"
        >
          <a href="#">
            <i class="fa fa-cogs" /> <span>{{ $t('maintenance') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul class="treeview-menu">
            <li v-if="isGranted('ROLE_BACKUP_LIST')">
              <router-link :to="{ name: 'BackupList' }">
                <i class="fa fa-database" /> <span>{{ $t('backup') }}</span>
              </router-link>
            </li>
            <li v-if="isGranted('ROLE_HISTORY_LIST')">
              <router-link :to="{ name: 'HistoryList' }">
                <i class="fa fa-hourglass" /> <span>{{ $t('history') }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'LeftSidebarSlot',
  data() {
    return {
      q: null
    }
  },
  mounted() {
    this.showSubmenuByActiveLink()
  },
  methods: {
    search() {
      this.$router.push({ name: 'Search', query: { q: this.q } })
    },
    showSubmenuByActiveLink() {
      window.$('.treeview').each(function() {
        if (window.$(this).find('a.router-link-active').length) {
          window.$(this).addClass('menu-open')
          window
            .$(this)
            .children('.treeview-menu')
            .css('display', 'block')
        }
      })
    }
  }
}
</script>

<style scoped>
a.router-link-active {
  color: #fff !important;
  background-color: #367fa9;
}
</style>
