Vue.filter('doneLabel', function(done){	
	if(done == 0){
		return 'não paga';
	}else{
		return 'paga';
	}
});

Vue.filter('generalStatusLabel', function(status, t){
	if(status===false){
		return "Nenhuma conta cadastrada";
	}else{
		if(t=='bill-pay')
			var count = ['paga(s)','pagar'];
		if(t=='bill-receive')
			var count = ['recebida(s)','receber'];
		if(status>0){
			return "Existe(m) "+status+" conta(s) a ser(em) "+count[0]+".";
		}else{
			return "Nenhuma conta a "+count[1]+".";
		}
	}

});