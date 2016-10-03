var router = new VueRouter();

router.map({
	'/': {
		name: 'dashboard',
		component: dashboardComponent
	},

	'/bill-pays': {
		component: billPayComponent,
		subRoutes:{
			'/': {
				name: 'billPay.list',
				component: billPayListComponent
			},
			'/create': {
				name: 'billPay.create',
				component: billPayCreateComponent
			},
			'/:id/update': {
				name: 'billPay.update',
				component: billPayCreateComponent
			}
		}
	},
	'/bill-receives': {
		component: billReceiveComponent,
		subRoutes:{
			'/': {
				name: 'billReceive.list',
				component: billReceiveListComponent
			},
			'/create': {
				name: 'billReceive.create',
				component: billReceiveCreateComponent
			},
			'/:id/update': {
				name: 'billReceive.update',
				component: billReceiveCreateComponent
			}
		}
	},
	'*': {
		component: billPayListComponent
	}


});

router.start({ 
	components: {
		'bill-component': billComponent
	}
},'#app')

// router.redirect({
// 	'*': '/bills-pays'
// });