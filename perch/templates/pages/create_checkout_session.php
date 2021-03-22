<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

use Slim\Http\Request;
use Slim\Http\Response;
use Stripe\Stripe;

require '../vendor/autoload.php';

$app = new \Slim\App;

$app->add(function ($request, $response, $next) {
  \Stripe\Stripe::setApiKey('sk_test_51ITOTYGc8mzhKHdoEodxiWIjy0jZLIcEpP9R5M5Rk94x15IbEo6M0pz5HC7b4RsZmS6UebIXWhjeyxn3uI8xdAcb00qqqqHW6n');
  return $next($request, $response);
});

$app->post('/create-checkout-session', function (Request $request, Response $response) {
  $session = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'],
    'line_items' => [[
      'price_data' => [
        'currency' => 'eur',
        'product_data' => [
          'name' => 'IPRG 2021 Conference Ticket',
        ],
        'unit_amount' => 2000,
      ],
      'quantity' => 1,
    ]],
    'mode' => 'payment',
    'success_url' => 'https://conference.iprg.info/success/',
    'cancel_url' => 'https://conference.iprg.info',
  ]);

  return $response->withJson([ 'id' => $session->id ])->withStatus(200);
});

$app->run();