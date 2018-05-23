// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

// let app = Vue.extend(App);
// let router = new VueRouter();

// router.map({
// 	'/goods' : {
// 		component : goods 
// 	}
// });
const routes = [
	{path : '/goods', component : goods},
	{path : '/ratings', component : ratings},
	{path : '/seller', component : seller}
];
const router = new VueRouter({
	linkActiveClass : 'active',
	routes
});
new Vue({
	el : '#app',
	router,
	render : h =>h(App)
})
// router.start(app,'#app');