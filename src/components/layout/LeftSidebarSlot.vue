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
    <form @submit.prevent="search" method="get" class="sidebar-form" v-if="isGranted('ROLE_OTHER_SEARCH')">
      <div class="input-group">
        <input v-model="q" type="text" name="q" class="form-control" placeholder="Search...">
        <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                <i class="fa fa-search"></i>
              </button>
            </span>
      </div>
    </form>
    <!-- /.search form -->

    <!-- Sidebar Menu -->
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header">{{$t('menu.title')}}</li>

      <li v-if="isGranted('ROLE_USER_DASHBOARD')"><router-link :to="{ name: 'Dashboard' }"><i class="fa fa-dashboard"></i> <span>{{$t('menu.dashboard')}}</span></router-link></li>
      <li v-if="isGranted('ROLE_OTHER_CALENDAR')"><router-link :to="{ name: 'Calendar' }"><i class="fa fa-calendar"></i> <span>{{$t('menu.calendar')}}</span></router-link></li>

      <li class="treeview">
        <a href="#">
          <i class="fa fa-users"></i> <span>{{$t('menu.contacts')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_CLIENT_LIST')"><router-link :to="{ name: 'ClientList' }"><i class="fa fa-users"></i> <span>{{$t('menu.clients')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_COMPANY_LIST')"><router-link :to="{ name: 'CompanyList' }"><i class="fa fa-star"></i> <span>{{$t('menu.companies')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_ADDRESS_LIST')"><router-link :to="{ name: 'AddressList' }"><i class="fa fa-address-book"></i> <span>{{$t('menu.address')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_COUNTRY_LIST')"><router-link :to="{ name: 'CountryList' }"><i class="fa fa-flag"></i> <span>{{$t('menu.country')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_CITY_LIST')"><router-link :to="{ name: 'CityList' }"><i class="fa fa-building"></i> <span>{{$t('menu.city')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_CONTACT_LIST')"><router-link :to="{ name: 'ContactList' }"><i class="fa fa-phone"></i> <span>{{$t('menu.contacts')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_CATEGORY_LIST') || isGranted('ROLE_PRODUCT_LIST')"
      >
        <a href="#">
          <i class="fa fa-product-hunt"></i> <span>{{$t('menu.product')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_CATEGORY_LIST')"><router-link :to="{ name: 'CategoryList' }"><i class="fa fa-list"></i> <span>{{$t('menu.category')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_PRODUCT_LIST')"><router-link :to="{ name: 'ProductList' }"><i class="fa fa-product-hunt"></i> <span>{{$t('menu.product')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview" v-if="isGranted('ROLE_TEXT_LIST')">
        <a href="#">
          <i class="fa fa-edit"></i> <span>{{$t('menu.cms')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_TEXT_LIST')"><router-link :to="{ name: 'TextList' }"><i class="fa fa-file-text-o"></i> <span>{{$t('menu.text')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_PROJECT_LIST') || isGranted('ROLE_TASK_LIST')"
      >
        <a href="#">
          <i class="fa fa-folder-open"></i> <span>{{$t('menu.projects')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_PROJECT_LIST')"><router-link :to="{ name: 'ProjectList' }"><i class="fa  fa-folder-open"></i> <span>{{$t('menu.projects')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_TASK_LIST')"><router-link :to="{ name: 'TaskList' }"><i class="fa fa-clock-o"></i> <span>{{$t('menu.tasks')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_DOCUMENT_LIST') || isGranted('ROLE_TEMPLATE_LIST') || isGranted('ROLE_TEMPLATE_TYPE_LIST')"
      >
        <a href="#">
          <i class="fa fa-file-o"></i> <span>{{$t('menu.documents')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_DOCUMENT_LIST')"><router-link :to="{ name: 'DocumentList' }"><i class="fa fa-file-o"></i> <span>{{$t('menu.documents')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_TEMPLATE_LIST')"><router-link :to="{ name: 'TemplateList' }"><i class="fa fa-file"></i> <span>{{$t('menu.templates')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_TEMPLATE_TYPE_LIST')"><router-link :to="{ name: 'TemplateTypeList' }"><i class="fa fa-file"></i> <span>{{$t('menu.template_types')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_ORDER_HEADER_LIST') || isGranted('ROLE_ORDER_STATUS_LIST') || isGranted('ROLE_ORDER_LINE_STATUS_LIST')"
      >
        <a href="#">
          <i class="fa fa-dashboard"></i> <span>{{$t('menu.order_header')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_ORDER_HEADER_LIST')"><router-link :to="{ name: 'OrderHeaderList' }"><i class="fa fa-list"></i> <span>{{$t('menu.order_header')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_ORDER_STATUS_LIST')"><router-link :to="{ name: 'OrderStatusList' }"><i class="fa fa-list"></i> <span>{{$t('menu.order_status')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_ORDER_LINE_STATUS_LIST')"><router-link :to="{ name: 'OrderLineStatusList' }"><i class="fa fa-list"></i> <span>{{$t('menu.order_line_status')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_INVOICE_HEADER_LIST') || isGranted('ROLE_INVOICE_STATUS_LIST') || isGranted('ROLE_INVOICE_TYPE_LIST')"
      >
        <a href="#">
          <i class="fa fa-dashboard"></i> <span>{{$t('menu.invoice_header')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_INVOICE_HEADER_LIST')"><router-link :to="{ name: 'InvoiceHeaderList' }"><i class="fa fa-list"></i> <span>{{$t('menu.invoice_header')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_INVOICE_STATUS_LIST')"><router-link :to="{ name: 'InvoiceStatusList' }"><i class="fa fa-list"></i> <span>{{$t('menu.invoice_status')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_INVOICE_TYPE_LIST')"><router-link :to="{ name: 'InvoiceTypeList' }"><i class="fa fa-list"></i> <span>{{$t('menu.invoice_type')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
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
      >
        <a href="#">
          <i class="fa fa-list"></i> <span>{{$t('menu.dictionaries')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_LANGUAGE_LIST')"><router-link :to="{ name: 'LanguageList' }"><i class="fa fa-language"></i> <span>{{$t('menu.language')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_VAT_LIST')"><router-link :to="{ name: 'VatList' }"><i class="fa fa-list"></i> <span>{{$t('menu.vat')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_CURRENCY_LIST')"><router-link :to="{ name: 'CurrencyList' }"><i class="fa fa-eur"></i> <span>{{$t('menu.currency')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_CONTACT_TYPE_LIST')"><router-link :to="{ name: 'ContactTypeList' }"><i class="fa fa-list"></i> <span>{{$t('menu.contact_type')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_PROJECT_TYPE_LIST')"><router-link :to="{ name: 'ProjectTypeList' }"><i class="fa fa-list"></i> <span>{{$t('menu.project_type')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_PROJECT_STATUS_LIST')"><router-link :to="{ name: 'ProjectStatusList' }"><i class="fa fa-list"></i> <span>{{$t('menu.project_status')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_TASK_STATUS_LIST')"><router-link :to="{ name: 'TaskStatusList' }"><i class="fa fa-list"></i> <span>{{$t('menu.task_status')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_BRAND_LIST')"><router-link :to="{ name: 'BrandList' }"><i class="fa fa-list"></i> <span>{{$t('menu.brand')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_CHANNEL_LIST')"><router-link :to="{ name: 'ChannelList' }"><i class="fa fa-list"></i> <span>{{$t('menu.channel')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_LABEL_LIST')"><router-link :to="{ name: 'LabelList' }"><i class="fa fa-list"></i> <span>{{$t('menu.label')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_PAYMENT_TYPE_LIST')"><router-link :to="{ name: 'PaymentTypeList' }"><i class="fa fa-list"></i> <span>{{$t('menu.paymentType')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_SHIPMENT_METHOD_LIST')"><router-link :to="{ name: 'ShipmentMethodList' }"><i class="fa fa-list"></i> <span>{{$t('menu.shipmentMethod')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_USER_LIST') || isGranted('ROLE_GROUP_LIST')"
      >
        <a href="#">
          <i class="fa fa-shield"></i> <span>{{$t('menu.users')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_USER_LIST')"><router-link :to="{ name: 'UserList' }"><i class="fa fa-user-secret"></i> <span>{{$t('menu.users')}}</span></router-link></li>
          <li v-if="isGranted('ROLE_GROUP_LIST')"><router-link :to="{ name: 'GroupList' }"><i class="fa fa-shield"></i> <span>{{$t('menu.groups')}}</span></router-link></li>
        </ul>
      </li>

      <li class="treeview"
          v-if="isGranted('ROLE_BACKUP_LIST')"
      >
        <a href="#">
          <i class="fa fa-cogs"></i> <span>{{$t('menu.maintenance')}}</span>
          <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
        </a>
        <ul class="treeview-menu">
          <li v-if="isGranted('ROLE_BACKUP_LIST')"><router-link :to="{ name: 'BackupList' }"><i class="fa fa-database"></i> <span>{{$t('menu.backup')}}</span></router-link></li>
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
    methods: {
      search() {
        this.$router.push({name: 'Search', query: {q: this.q}})
      }
    }
  }
</script>
