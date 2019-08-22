<template>
  <v-container fluid>
    <v-row class="mx-5" no-gutters justify="space-between">
      <v-col cols="9" v-if="title">
        <is-title :title="title" :title-params="titleParams"></is-title>
      </v-col>

      <v-col cols="3" v-if="routeAdd" class="text-right" align-self="center">
        <v-btn color="success" dark fab :to="{ name: routeAdd }">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-text>
            <item-errors v-if="entity" :entity="entity"/>
            <slot></slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemErrors from './errors/ItemErrors'

export default {
  name: 'IsMainTemplate',
  components: { ItemErrors },
  props: {
    title: {
      type: String,
      default: null
    },
    entity: {
      type: String,
      default: null
    },
    titleParams: {
      type: Object,
      default: null
    },
    routeAdd: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: 'add'
    }
  }
}
</script>
