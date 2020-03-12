<template>
  <q-page id="home" class="flex flex-center">
    <div class="row c-panel">
      <div class="col-12">
        <q-card>
          <q-tabs
            v-model="tab"
            class="bg-grey-3 text-grey-7"
            active-color="purple"
            indicator-color="purple"
            align="left">
            <q-route-tab name="activities" label="Activities" to="/" exact />
            <q-route-tab name="mylist" label="My list" to="/my-list" exact />
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="activities">
              <router-view />
            </q-tab-panel>
            <q-tab-panel name="mylist">
              <router-view />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      tab: 'activities',
    };
  },
};
</script>

<style lang="stylus" scoped>
  #home
    .c-panel
      width: 650px
</style>
