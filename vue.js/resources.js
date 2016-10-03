Vue.http.options.root = 'http://192.168.100.10:8000/api';

window.BillPay = Vue.resource('billsPay{/id}', {}, {
	total: {method: 'GET', url: 'billsPay/total'}
});
window.BillReceive = Vue.resource('billsReceive{/id}', {}, {
	total: {method: 'GET', url: 'billsReceive/total'}
});