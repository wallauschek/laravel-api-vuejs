window.billReceiveComponent = Vue.extend({
	components: {
		'bill-receive-menu-component': billReceiveMenuComponent
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
		<h3 v-bind:class="{'gray': status===false, 'red': status === 0, 'green': status > 0 }">{{ status | generalStatusLabel 'bill-receive'}}</h3>
		<h3>{{ total | currency 'R$ ' }}</h3>
		<bill-receive-menu-component></bill-receive-menu-component>
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
			BillReceive.query().then(function(response){
				self.calculateStatus(response.data);
			})
		},
		updateTotal: function(){
			var self = this;
			BillReceive.total().then(function(response){
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