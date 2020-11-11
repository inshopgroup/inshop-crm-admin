import Vue from 'vue'
import Vuex from 'vuex'

import general from './modules/general'
import auth from './modules/auth'
import search from './modules/search'
import client from './modules/client'
import company from './modules/company'
import companyProduct from './modules/company_product'
import contact from './modules/contact'
import contactType from './modules/contact_type'
import document from './modules/document'
import task from './modules/task'
import taskStatus from './modules/task_status'
import project from './modules/project'
import projectStatus from './modules/project_status'
import projectType from './modules/project_type'
import paymentType from './modules/payment_type'
import shipmentMethod from './modules/shipment_method'
import role from './modules/role'
import group from './modules/group'
import history from './modules/history'
import user from './modules/user'
import brand from './modules/brand'
import channel from './modules/channel'
import address from './modules/address'
import category from './modules/category'
import country from './modules/country'
import currency from './modules/currency'
import invoiceHeader from './modules/invoice_header'
import invoiceStatus from './modules/invoice_status'
import invoiceType from './modules/invoice_type'
import language from './modules/language'
import orderHeader from './modules/order_header'
import orderStatus from './modules/order_status'
import orderLineStatus from './modules/order_line_status'
import product from './modules/product'
import vat from './modules/vat'
import module from './modules/module'
import label from './modules/label'
import text from './modules/text'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    text,
    general,
    brand,
    channel,
    address,
    category,
    country,
    currency,
    invoiceHeader,
    invoiceStatus,
    invoiceType,
    language,
    orderHeader,
    orderStatus,
    orderLineStatus,
    product,
    vat,
    auth,
    search,
    client,
    company,
    companyProduct,
    contact,
    contactType,
    document,
    task,
    taskStatus,
    project,
    projectStatus,
    projectType,
    shipmentMethod,
    paymentType,
    role,
    group,
    history,
    user,
    label,
    module
  }
})
