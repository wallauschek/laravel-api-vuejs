    <?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBillsPay()
{
    $json = file_get_contents(__DIR__ . '/billsPay.json');
    $data = json_decode($json, true);
    return $data['billsPay'];
}

function findIndexByIdBillPay($id)
{
    $billsPay = getBillsPay();
    foreach ($billsPay as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBillsPay($billsPay)
{
    $data = ['billsPay' => $billsPay];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/billsPay.json', $json);
}




function getBillsReceive()
{
    $json = file_get_contents(__DIR__ . '/billsReceive.json');
    $data = json_decode($json, true);
    return $data['billsReceive'];
}

function findIndexByIdBillReceive($id)
{
    $billsReceive = getBillsReceive();
    foreach ($billsReceive as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBillsReceive($billsReceive)
{
    $data = ['billsReceive' => $billsReceive];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/billsReceive.json', $json);
}





$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/billsPay', function () use ($app) {
    $billsPay = getBillsPay();
    return $app->json($billsPay);
});

$app->get('api/billsPay/total', function () use ($app) {
    $billsPay = getBillsPay();
    $sum=0;
    foreach ($billsPay as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/billsPay/{id}', function ($id) use ($app) {
    $billsPay = getBillsPay();
    $bill = $billsPay[findIndexByIdBillPay($id)];
    return $app->json($bill);
});

$app->post('api/billsPay', function (Request $request) use ($app) {
    $billsPay = getBillsPay();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $billsPay[] = $data;
    writeBillsPay($billsPay);
    return $app->json($data);
});

$app->put('api/billsPay/{id}', function (Request $request, $id) use ($app) {
    $billsPay = getBillsPay();
    $data = $request->request->all();
    $index = findIndexByIdBillPay($id);
    $billsPay[$index] = $data;
    $billsPay[$index]['id'] = (int)$id;
    writeBillsPay($billsPay);
    return $app->json($billsPay[$index]);
});

$app->delete('api/billsPay/{id}', function ($id) {
    $billsPay = getBillsPay();
    $index = findIndexByIdBillPay($id);
    array_splice($billsPay,$index,1);
    writeBillsPay($billsPay);
    return new Response("", 204);
});




$app->get('api/billsReceive', function () use ($app) {
    $billsReceive = getBillsReceive();
    return $app->json($billsReceive);
});

$app->get('api/billsReceive/total', function () use ($app) {
    $billsReceive = getBillsReceive();
    $sum=0;
    foreach ($billsReceive as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/billsReceive/{id}', function ($id) use ($app) {
    $billsReceive = getBillsReceive();
    $bill = $billsReceive[findIndexByIdBillReceive($id)];
    return $app->json($bill);
});

$app->post('api/billsReceive', function (Request $request) use ($app) {
    $billsReceive = getBillsReceive();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $billsReceive[] = $data;
    writeBillsReceive($billsReceive);
    return $app->json($data);
});

$app->put('api/billsReceive/{id}', function (Request $request, $id) use ($app) {
    $billsReceive = getBillsReceive();
    $data = $request->request->all();
    $index = findIndexByIdBillReceive($id);
    $billsReceive[$index] = $data;
    $billsReceive[$index]['id'] = (int)$id;
    writeBillsReceive($billsReceive);
    return $app->json($billsReceive[$index]);
});

$app->delete('api/billsReceive/{id}', function ($id) {
    $billsReceive = getBillsReceive();
    $index = findIndexByIdBillReceive($id);
    array_splice($billsReceive,$index,1);
    writeBillsReceive($billsReceive);
    return new Response("", 204);
});





$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();