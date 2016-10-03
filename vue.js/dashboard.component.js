window.dashboardComponent = Vue.extend({
	template: `
	{{ totalReceive }} - {{ totalPay }} = {{ total }}
	`,
	data: function(){
		return {
			totalReceive: 0,
			totalPay: 0,
		};
	},
	created: function(){
		this.updateTotal();
	},
	methods:{
		updateTotal: function(){
			var self = this;
			BillPay.total().then(function(response){
				self.totalPay = response.data.total;
			});
			BillReceive.total().then(function(response){
				self.totalReceive = response.data.total;
			});
		}
	},
	computed: {
		total: function(){
			return this.totalReceive - this.totalPay;
		}
	},
	events: {
		'change-info': function(){
			this.updateTotal();
		}
	}
});