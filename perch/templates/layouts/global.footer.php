	<footer>
	    <div class="restrict">
		    <div>
			    
		    </div>
			<div>

			</div>
		    <div>

		    </div>
		    <div>

		    </div>
		    <div>

		    </div>
			<p class="copyright">&copy; IPRG 2022</p>
	    </div>
    </footer>

	<script src="https://kit.fontawesome.com/69f24bba74.js" crossorigin="anonymous" defer></script>
	<script src="/assets/js/bundle.js?v=<?php echo rand(); ?>"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
	
	<script>
	    $(document).ready(function(){
			$('#video').append('<video autoplay muted loop id="heroVideo" style="display:none"><source src="/assets/bees.mp4" type="video/mp4"></video>');
			$('#heroVideo').fadeIn('slow');
		});
	</script>
	 
	<!-- Matomo -->
	<script type="text/javascript">
	  var _paq = window._paq = window._paq || [];
	  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
	  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
	  _paq.push(["setCookieDomain", "*.iprg.info"]);
	  _paq.push(['trackPageView']);
	  _paq.push(['enableLinkTracking']);
	  (function() {
	    var u="//analytics.natureslaboratory.co.uk/";
	    _paq.push(['setTrackerUrl', u+'matomo.php']);
	    _paq.push(['setSiteId', '2']);
	    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
	  })();
	</script>
	<!-- End Matomo Code -->
</body>

</html>