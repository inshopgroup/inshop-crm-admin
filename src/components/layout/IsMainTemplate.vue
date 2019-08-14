<template>
  <v-container fluid>
    <v-layout justify-space-between mx-5 row>
      <v-flex v-if="title">
        <is-title :title="title" :title-params="titleParams"></is-title>
      </v-flex>

      <v-flex v-if="routeAdd" align-self-center text-right>
        <v-btn color="success" dark fab :to="{ name: routeAdd }">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-card class="mx-auto">
          <v-card-text>
            <item-errors v-if="entity" :entity="entity" />

            <slot></slot>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
