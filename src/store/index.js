import Vue from 'vue'
import Vuex from 'vuex'

import general from './modules/general/'
import auth from './modules/auth/'
import search from './modules/search/'
import client from './modules/client/'
import company from './modules/company/'
import company_product from './modules/company_product/'
import contact from './modules/contact/';
import contact_type from './modules/contact_type/'
import document from './modules/document/'
import template from './modules/template/'
import template_type from './modules/template_type/'
import task from './modules/task/'
import task_status from './modules/task_status/'
import project from './modules/project/';
import project_status from './modules/project_status/'
import project_type from './modules/project_type/'
import payment_type from './modules/payment_type/'
import shipment_method from './modules/shipment_method/'
import role from './modules/role/'
import group from './modules/group/'
import user from './modules/user/'
import brand from './modules/brand/'
import channel from './modules/channel/'

import address from './modules/address/'
import category from './modules/category/'
import city from './modules/city/'
import country from './modules/country/'
import currency from './modules/currency/'
import invoice_header from './modules/invoice_header/'
import invoice_status from './modules/invoice_status/'
import invoice_type from './modules/invoice_type/'
import language from './modules/language/'
import order_header from './modules/order_header/'
import order_status from './modules/order_status/'
import order_line_status from './modules/order_line_status/'
import product from './modules/product/'
import vat from './modules/vat/'
import module from './modules/module/'
import backup from './modules/backup/'
import backup_status from './modules/backup_status/'
import backup_type from './modules/backup_type/'
import label from './modules/label/'
import text from './modules/text/'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    text,
    backup,
    backup_status,
    backup_type,
    general,
    brand,
    channel,
    address,
    category,
    city,
    country,
    currency,
    invoice_header,
    invoice_status,
    invoice_type,
    language,
    order_header,
    order_status,
    order_line_status,
    product,
    vat,
    auth,
    search,
    client,
    company,
    company_product,
    contact,
    contact_type,
    document,
    template,
    template_type,
    task,
    task_status,
    project,
    project_status,
    project_type,
    shipment_method,
    payment_type,
    role,
    group,
    user,
    label,
    module
  }
});
