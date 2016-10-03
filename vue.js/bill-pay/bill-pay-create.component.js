window.billPayCreateComponent = Vue.extend({
	template: `
	<form name="form" @submit.prevent="submit">
		<label>Vencimento</label>
		<input type="text" name="name" v-model="bill.date_due"><br>
		<label>Nome</label>
		<select name="name" v-model="bill.name">
			<option v-for="name in names" :value="name">{{name}}</option>
		</select><br>
		<label>Valor</label>
		<input type="text" name="value" v-model="bill.value"><br>
		<label>Pago?</label>
		<input type="checkbox" v-model="bill.done"> 
		<input type="submit" value="enviar" />
	</form>
	`,
	data: function(){
		return {
			formType: 'insert',
			names: [
				'Conta de luz',
				'Conta de água',
				'Conta de telefone',
				'Supermercado',
				'Cartão de crédito',
				'Empréstimo',
				'Gasolina',
				'Condomínio'
			],
			bill: {
				date_due:'',
				name:'',
				value:0,
				done:false
			}
		};
	},
	created: function(){
		if(this.$route.name == 'billPay.update'){
			this.formType = 'update';
			this.getBill(this.$route.params.id);
		}

	},
	methods: {
		submit: function(){
			var self = this;
			if(this.formType=='insert'){
				BillPay.save({}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({
						name:'billPay.list'
					});
				});
			}else{
				BillPay.update({id:this.bill.id}, this.bill).then(function(response){
					self.$dispatch('change-info');
					self.$router.go({
						name:'billPay.list'
					});
				});
			}
		},
		getBill: function(id){
			var self = this;
			BillPay.get({id: id}).then(function(response){
				self.bill = response.data;
			});
		}
	}
});