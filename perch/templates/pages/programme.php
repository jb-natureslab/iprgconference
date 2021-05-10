<?php include($_SERVER['DOCUMENT_ROOT'].'/perch/runtime.php'); ?>
<?php perch_layout('global.header'); ?>
<?php 

perch_content_create("Programme", ["template" => "programme.html"]);

?>

<?php 
	perch_content('Page Content'); 
    perch_content("Programme");
?>

<?php perch_layout('global.footer'); ?>