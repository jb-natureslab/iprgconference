<?php include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php'); ?>
<?php perch_layout('global.header'); ?>

<?php 
	perch_content('Page Content'); 
?>

<div class="wrap">
	<div class="restrict narrow" id="form">
		<?php
			echo '<form id="payment-form">
				<div class="form-section">
					<div class="form-input">
						<label>Title</label>
						<select name="title" id="title">
							<option value="Mr">Mr</option>
							<option value="Miss">Miss</option>
							<option value="Mrs">Mrs</option>
							<option value="Ms">Ms</option>
							<option value="Dr">Dr</option>
							<option value="Professor">Professor</option>
							<option value="">None</option>
						</select>
					</div>
					<div class="form-input">
						<label>First Name</label>
						<input type="text" name="firstname" id="firstname" />
					</div>
					<div class="form-input">
						<label>Last Name</label>
						<input type="text" name="lastname" id="lastname" />
					</div>
					<div class="form-input">
						<label>Organisation</label>
						<input type="text" name="organisation" id="organisation" />
					</div>
					<div class="form-input">
						<label>Email Address</label>
						<input type="text" name="emailaddress" id="emailaddress" />
					</div>
					<div class="form-input">
						<label>Telephone</label>
						<input type="text" name="telephone" id="telephone" />
					</div>
					<div class="form-input">
						<label>Card Details</label>
						<div id="card-element">
							<!-- Elements will create input elements here -->
						</div>
						<!-- We\'ll put the error messages in this element -->
						<div id="card-errors" role="alert"></div>
					</div>
					<div class="form-input">
						<button id="submit">Pay €20.00</button>
					</div>
				</div>
			</form>';
			$stripeValue = 2000;
			echo '
			<script>
			var response = fetch("/token.php?value='.$stripeValue.'").then(function(response) {
			  return response.json();
			}).then(function(responseJson) {
			  var clientSecret = responseJson.client_secret;
			  console.log(clientSecret);
			  // Call stripe.confirmCardPayment() with the client secret.
			
			var stripe = Stripe(\'pk_live_51ITOTYGc8mzhKHdom6HhbN4JxRmr4R3ndVK2HA8PU1dlD0rHn9Me4Sv9e31Kp0mCFhlxUP6o2a0rO8OiMEB3dz8Q00TdRSH1IZ\');
			var elements = stripe.elements();
			
			var elements = stripe.elements();
			var style = {
			  base: {
			    color: "#000",
			  }
			};
			
			var card = elements.create("card", { 
				hidePostalCode: true, 
				style: { 
					base: {
					  lineHeight: \'40px\',
					  fontWeight: 300,
					  fontSize: \'15px\',
					  \'::placeholder\': {
					    color: \'#222\',
					   }, 
					}
				}
			});
			card.mount("#card-element");
			
			card.on("change", ({error}) => {
			  let displayError = document.getElementById("card-errors");
			  if (error) {
			    displayError.textContent = error.message;
			  } else {
			    displayError.textContent = "";
			  }
			});
			
			var form = document.getElementById(\'payment-form\');

			form.addEventListener(\'submit\', function(ev) {
				
			  ev.preventDefault();
			  
			  $(\'#payment-form button\').prop("disabled", true);
			  $(\'#payment-form button\').hide();
			  var title = $(\'#title\').val();
			  var firstname = $(\'#firstname\').val();
			  var lastname = $(\'#lastname\').val();
			  var organisation = $(\'#organisation\').val();
			  var emailaddress = $(\'#emailaddress\').val();
			  var telephone = $(\'#telephone\').val();
			  
			  if(firstname==\'\' || lastname==\'\' || emailaddress==\'\' || telephone==\'\'){
				  alert(\'Please complete all the required fields\');
				  $(\'#payment-form button\').prop("disabled", false);
				  $(\'#payment-form button\').show();
			  }else{
				  
				  stripe.confirmCardPayment(clientSecret, {
				    payment_method: {
				      card: card,
				      billing_details: {
				        name: title+\' \'+firstname+\' \'+lastname,
				        email: emailaddress,
				        phone: telephone,
				        address: {
					      line1: organisation
					    }
				      }
				    }
				  }).then(function(result) {
				    if (result.error) {
				      // Show error to your customer (e.g., insufficient funds)
				      $(\'#payment-form button\').prop("disabled", false);
				      $(\'#payment-form button\').show();
				    } else {
				      // The payment has been processed!
				      if (result.paymentIntent.status === \'succeeded\') {
				        // Show a success message to your customer
				        $(\'#payment-form\').hide();
				        $.post("/conference_registration.php", { pTitle: title, pFirstname: firstname, pLastname: lastname, pEmail: emailaddress, pPhone: telephone, pOrganisation: organisation } );
				        $(\'#form\').append(\'<h2>Payment Complete<h2><p>We look forward to seeing you at the conference.</p>\');
				      }
				    }
				  });
			  
			  }
			});
			});
			</script>';
		?>
	</div>
</div>

<?php perch_layout('global.footer'); ?>