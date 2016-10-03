window.billPayComponent = Vue.extend({
	components: {
		'bill-pay-menu-component': billPayMenuComponent
	},
	template: 
		`<style>
			.green{
				color: green;
			}
			.red{
				color: red;
			}
			.gray{
				color: gray;
			}
		</style>
			<h1>{{ title }}</h1>
		<h3 v-bind:class="{'gray': status===false, 'green': status === 0, 'red': status > 0 }">{{ status | generalStatusLabel 'bill-pay' }}</h3>
		<h3>{{ total | currency 'R$ ' }}</h3>
		<bill-pay-menu-component></bill-pay-menu-component>
		<router-view></router-view>
		`,
	data: function(){
		return {
			title: "Contas a pagar",
			status: false,
			total: 0
		}
	},
	created: function(){
		this.updateStatus();
		this.updateTotal();
	},
	methods: {
		calculateStatus: function(bills){
			if(bills.length){
				var count = 0;
				for(var i in bills){
					if(!bills[i].done){
						count++;
					}
				}
			}else{
				this.status =  false;
			}
			this.status = count;
		},
		updateStatus: function(){
			var self = this;
			BillPay.query().then(function(response){
				self.calculateStatus(response.data);
			});
		},
		updateTotal: function(){
			var self = this;
			BillPay.total().then(function(response){
				self.total = response.data.total;
			});
		}
	},
	events: {
		'change-info': function(){
			this.updateStatus();
			this.updateTotal();
		}
	}
});