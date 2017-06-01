import Vue from 'vue';
import Router from 'vue-router';
import GlobalCards from '@/views/globalCards/GlobalCards';
import ColumnList from '@/views/column/List';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: GlobalCards
    // },
    {
      path: '/globalcards',
      name: 'GlobalCards',
      component: GlobalCards
    },
    {
      path: '/columnlist',
      name: 'ColumnList',
      component: ColumnList
    },
  ],
})
