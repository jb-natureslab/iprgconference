<?php include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php'); ?>
<?php perch_layout('global.header'); ?>

<?php 
	perch_content('Page Content'); 
?>

<div class="wrap">
	<div class="restrict narrow">
		<button id="checkout-button">Checkout</button>
		<script type="text/javascript">
		// Create an instance of the Stripe object with your publishable API key
		var stripe = Stripe(
			'pk_test_51ITOTYGc8mzhKHdojEFogvwvSrtamy4fB7RakerixL3wxfxioLoR5GG3f3NaJf26YjJW6fM3QmzQMingLh2e58iH00mYJqu1UQ'
		);
		var checkoutButton = document.getElementById('checkout-button');

	      checkoutButton.addEventListener('click', function() {
	        // Create a new Checkout Session using the server-side endpoint you
	        // created in step 3.
	        fetch('/create-checkout-session', {
	          method: 'POST',
	        })
	        .then(function(response) {
	          return stripe.redirectToCheckout({ sessionId: response });
	        })
	        .then(function(result) {
	          // If `redirectToCheckout` fails due to a browser or network
	          // error, you should display the localized error message to your
	          // customer using `error.message`.
	          if (result.error) {
	            alert(result.error.message);
	          }
	        })
	        .catch(function(error) {
	          console.error('Error:', error);
	        });
	      });
	    </script>
	</div>
</div>

<?php perch_layout('global.footer'); ?>