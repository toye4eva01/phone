// JavaScript Document
$(document).ready(function(){

/*Record transactions .............................................................................................................................*/
/* Load validate discount card form form*/
$('#main_nav, #main_section').on('click', '#record, #icotransaction', function() {
	$('#main_section').html('<img src="images/loading.gif" />').load('scancard.php', function() {;
	$('#cardno').focus();
	});
});

/*Verify that the card number is in the database*/
$('#main_section').on('click', '#validatecard', function() {
	var cardno = $('#cardno').val();
	if(cardno==""){
	$("#warn").text ("Kindly scan the barcode on card");
	return false;
	}
	
	else {	
	$("#warn").text ("");
	
	if ($('#loading_image').length == 0) { //is the image on the form yet?
                // add it just before the submit button
	$('.validatebtn').before('<img src="images/loading.gif" style="display: none;" alt="loading" id="loading_image">')
	}
	$('#loading_image').show(); // show the animated image    
    $('.validatebtn').hide(); // disable double submits
	
	$.ajax({
									type: "POST",
									url: "verifycard.php",
									data: $("#scancardform").serialize(),
									dataType: 'json',
																		
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else if (msg.status == "move"){
										//alert(msg.cardid);
										$('#main_section').load('entertranamt.php', function() {
											$('#hcardid').val(msg.cardid);//stores the card id to be able identify the card.
											$('#ftitle').html("Transaction for card " + cardno);
											$('#tranamt').focus();

												
									});
									
										
									}
									else {
									
									alert(msg.status);
									$('#loading_image').hide(); // hide the animated image    
    								$('.validatebtn').show(); // enable submits														
									}
													
									}
									
								});

return false;
}
});

/*Verify that the card number is in the database*/
$('#main_section').on('click', '#enteramt', function() {
	var tranamt = $('#tranamt').val();
	if(tranamt ==""){
	$("#warn").text ("Kindly enter the transaction amount");
	return false;
	}
	else if(!$.isNumeric(tranamt)){
	$("#warn").text ("Kindly enter a valid amount");
	return false;
}

	else if(tranamt.length > 16){
	$("#warn").text ("Can only take maximum of 16 digits ");
	return false;
}

else {
if ($('#loading_image').length == 0) { //is the image on the form yet?
                // add it just before the submit button
	$('.validatebtn').before('<img src="images/loading.gif" style="display: none;" alt="loading" id="loading_image">')
	}
	$('#loading_image').show(); // show the animated image    
    $('.validatebtn').hide(); // disable double submits
$.ajax({
									type: "POST",
									url: "discountform.php",
									data: $("#tranamtform").serialize(),
									
									
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else {
									$('#main_section').html('<img src="images/loading.gif" />').html(msg);
										
																					
									}
													
									}
									
								});
return false;
}
});

/* Cancel transaction form*/
$('#main_section').on('click', '#trancancel', function() {
	$('#main_section').html('<img src="images/loading.gif" />').load('scancard.php', function() {
	$('#cardno').focus();
	});
	return false;
});

/*Save discount transaction*/
$('#main_section').on('click', '#saveamt', function() {
var tranamt = $('#tranamt').val();	
var hcardid = $('#hcardid').val();
var hdistypeid = $('#hdistypeid').val();
var hthreshold = $('#hthreshold').val();
var hincrement = $('#hincrement').val();
var receiptno = $('#receiptno').val();	
var pinno = $('#pinno').val();

/*if(receiptno ==""){
	$("#warn").text ("Kindly enter the Reciept No");
	return false;
}*/

if(pinno ==""){
	$("#warn").text ("Kindly enter your Pin");
	return false;
}

else if(receiptno !=="" && !$.isNumeric(receiptno)){
	$("#warn").text ("Kindly enter a valid Pump number");
	return false;
	}
	
else { 

if ($('#loading_image').length == 0) { //is the image on the form yet?
                // add it just before the submit button
	$('.validatebtn').before('<img src="images/loading.gif" style="display: none;" alt="loading" id="loading_image">')
	}
	$('#loading_image').show(); // show the animated image    
    $('.validatebtn').hide(); // disable double submits
					
$.ajax({
									type: "POST",
									url: "savetranscript.php",
									
									data: {tranamt: tranamt, hcardid: hcardid, hdistypeid: hdistypeid, hthreshold: hthreshold, hincrement: hincrement, receiptno:receiptno, pinno:pinno},									
									dataType: 'json',
										
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} 
									else if (msg.status == "move"){
										
											var printreceipt =confirm("Transaction Saved. Print receipt ?");
											if (printreceipt==true)
											  {
											  
											  window.location.replace('receipt.php?tranid='+msg.tranid);
											  
											  }
											else
											  {
												  $('#main_section').load('scancard.php', function() {
												$('#cardno').focus();
													});

											  }

									}
									else {
										alert(msg.status);
									}
									$('#loading_image').hide(); // hide the animated image    
    								$('.validatebtn').show(); // enableable double submits				
									}
									
								});
return false;
}
});


/* Load receipt*/
$('#main_section').on('click', '.receiptbtn', function() {
var id = $(this).attr("id");
window.location.replace('receipt.php?tranid='+id);
});

/* Claim benefits form load..................................................................................................*/
$('#main_nav, #main_section').on('click', '#claim_benefits, #icoclaim_benefits', function() {
	$('#main_section').html('<img src="images/loading.gif" />').load('scanaccountform.php', function(){
	$('#cardno').focus();
	});
	
});
/*view summary of points*/
$('#main_section').on('click', '#showaccount', function() {
	var cardno = $('#cardno').val();
	if(cardno==""){
	$("#warn").text ("Kindly scan the barcode on card");
	return false;
	}
	
	else {	
	$("#warn").text ("");
	$.ajax({
									type: "POST",
									url: "verifycardassigned.php",
									data: $("#scanaccountform").serialize(),
									dataType: 'json',
																		
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else if (msg.status == "move"){
										
										var hcardid = msg.cardid;
											$.ajax({
													type: "POST",
													url: "viewpoints.php",
													data: {hcardid: hcardid},
													
																						
													success: function(msg){
													if (msg.success == false) {
													$("#warn").html("There was an error submitting the form. Please try again.");
													} 
													else {
													$('#main_section').html('<img src="images/loading.gif" />').html(msg);
													
													}

												}
									});
									
										
									}
									else {
									
									alert(msg.status);
																							
									}
													
									}
									
								});

return false;
}
});

/*Click on claim button to get benefits*/
$('#main_section').on('click', '#claimbenefit', function() {
var cardid = $('#hcardid').val();

$.ajax({
									type: "POST",
									url: "claimbenefits.php",
									data: {cardid:cardid},
																		
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else {
									$('#main_section').html('<img src="images/loading.gif" />');
									$('#main_section').html(msg);
									
										
									}
													
									}
									
								});
return false;
});

/*Save benefit transaction*/
$('#main_section').on('click', '.custombtn', function() {
var benefitid = $(this).attr('id');
var cardid = $('#hcardid').val();
var pinno = $('#pinno').val();
var points = $('#points').val();
var pointcost = $('#' + benefitid+'.pointcost').val();
var pointqty = $('#' + benefitid+'.pointqty').val();
var totalpointcost = pointcost * pointqty;

if(pinno ==""){
	$("#warn").text ("Kindly enter your Pin");
	return false;
}

else if (pointqty == ""){
alert("Enter amount of litres to claim");
}

else if (totalpointcost > points){
alert("Insufficient Balance to claim");
}
else { 
	$("#warn").text ("");
	//alert(pinno);

if ($('#loading_image').length == 0) { //is the image on the form yet?
                // add it just before the submit button
	$('.custombtn').before('<img src="images/loading.gif" style="display: none;" alt="loading" id="loading_image">')
	}
	$('#loading_image').show(); // show the animated image    
    $('.custombtn').hide(); // disable double submits

//alert(totalpointcost);
					
$.ajax({
									type: "POST",
									url: "claimbenefitsscript.php",
									
									data: {cardid: cardid, benefitid:benefitid, pinno:pinno, pointqty:pointqty},									
									dataType: 'json',
										
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} 
									else if (msg.status == "move"){
									//alert(msg.benefit+" claimed");
									$('#points').val(msg.points);	
											var printreceipt =confirm(msg.benefit+" claimed. View receipt ?");
											if (printreceipt==true)
											  {
											  
											  window.location.replace('claimreceipt.php?claimid='+msg.claimid);
											  
											  }		
									}
									else {
										alert(msg.status);
									}
									$('#loading_image').hide(); // hide the animated image    
    								$('.custombtn').show(); // enableable double submits
									}
									
								});
return false;
}
});

/* Search member transaction......................................................................................*/
$("#main_section").on('click', '#member_tranbtn', function() {
var cardno = $('#cardno').val();
	if(cardno==""){
	$("#warn").text ("Kindly scan the barcode on card");
	return false;
	}
	
	else {	
	$("#warn").text ("");
	$.ajax({
									type: "POST",
									url: "verifycardassigned.php",
									data: $("#scanaccountform").serialize(),
									dataType: 'json',
																		
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else if (msg.status == "move"){
										
										var hcardid = msg.cardid;
											$.ajax({
													type: "POST",
													url: "viewaccount.php",
													data: {hcardid: hcardid},
													
																						
													success: function(msg){
													if (msg.success == false) {
													$("#warn").html("There was an error submitting the form. Please try again.");
													} 
													else {
													$('#main_section').html('<img src="images/loading.gif" />').html(msg);
													
													}

												}
									});
									
										
									}
									else {
									
									alert(msg.status);
																							
									}
													
									}
									
								});

return false;
}
});


});

