<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

use Stripe\Stripe;

require '../vendor/autoload.php';

$stripe = new \Stripe\StripeClient(
  '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'
);
$session = $stripe->checkout->sessions->create([
  'success_url' => 'https://conference.iprg.info/success/',
  'cancel_url' => 'https://conference.iprg.info',
  'payment_method_types' => ['card'],
  'line_items' => [
    [
      'price' => 'price_1IXmyhGc8mzhKHdolWQUwuLh',
      'quantity' => 1,
    ],
  ],
  'mode' => 'payment',
]);

$sessionID = $session->id;
$array = ['id' => $sessionID];
$json = json_encode($array);

header('Content-Type: application/json');
echo $json;