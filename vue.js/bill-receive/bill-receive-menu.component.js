window.billReceiveMenuComponent = Vue.extend({
	template: `
	<nav>
		<ul>
			<li v-for="o in menus"><a v-link="{name:o.routeName}">{{o.name}}</a></li>
		</ul>
	</nav>	
	`,
	data: function(){
		return {
			menus: [
				{id:0, name: "Listar contas", routeName: "billReceive.list"},
				{id:1, name: "Criar conta", routeName: "billReceive.create"}
			]
		};
	}
});