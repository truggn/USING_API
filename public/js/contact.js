$(document).ready(function(){	
	$("#contactForm").submit(function(event){
		submitForm();
		return false;
	});
});
function submitForm(){
    $.ajax({
       type: "PUT",
       url: "'/home/' + userId + '?_method=PUT'",
       cache:false,
       data: $('form#contactForm').serialize(),
       success: function(response){
           $("#contact").html(response)
           $("#contact-modal").modal('hide');
       },
       error: function(){
           alert("Error");
       }
   });
}