<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

use Stripe\Stripe;

require '../vendor/autoload.php';

$stripe = new \Stripe\StripeClient(
  'sk_test_51ITOTYGc8mzhKHdoEodxiWIjy0jZLIcEpP9R5M5Rk94x15IbEo6M0pz5HC7b4RsZmS6UebIXWhjeyxn3uI8xdAcb00qqqqHW6n'
);
$session = $stripe->checkout->sessions->create([
  'success_url' => 'https://conference.iprg.info/success/',
  'cancel_url' => 'https://conference.iprg.info',
  'payment_method_types' => ['card'],
  'line_items' => [
    [
      'price' => 'price_1ITOZrGc8mzhKHdoJaOPXUqL',
      'quantity' => 1,
    ],
  ],
  'mode' => 'payment',
]);

$id = $session->id;
echo $id;