window.billPayListComponent = Vue.extend({
	template: `
	<style>
		.pago{
			color: green;
		}
		.naopago{
			color: red;
		}
	</style>
	<table border="1" cellpadding="10" >
		<thead>
			<tr>
				<th>#</th>
				<th>vecimento</th>
				<th>Nome</th>
				<th>valor</th>
				<th>Conta</th>
				<th>baixa</th>
				<th>ações</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(index,o) in bills">
				<td>{{ index+1 }}</td>
				<td>{{ o.date_due }}</td>
				<td>{{ o.name }}</td>
				<td>{{ o.value | currency 'R$ ' 2 }}</td>
				<td :class="{'pago' : o.done, 'naopago' : !o.done}">
					{{ o.done | doneLabel }}
				</td>
				<td>
					<input type="checkbox" v-model='o.done'>
				</td>
				<td>
					<a v-link="{ name: 'billPay.update', params: {id: o.id} }">Editar</a> |
					<a href="#" @click.prevent="deleteBill(o)">Apagar</a> 
				</td>
			</tr>
		</tbody>
	</table>
	`,
	data: function(){
		return {
			bills: []
		};
	},
	created: function(){
		var self = this;
		BillPay.query().then(function(response){
			self.bills = response.data;
		});
	},
	methods: {
		deleteBill: function (bill){
			if(confirm('Deseja mesmo apagar essa conta?')){
				var self = this;
				BillPay.delete({id: bill.id}).then(function(response){
					self.bills.$remove(bill);
					self.$dispatch('change-info');
				});
			}
		}
	}	
});
