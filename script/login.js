
$(document).ready(function(){
	 Parse.User.logOut();
});
var currentUser = Parse.User.current();	

function logout(){
	if (currentUser) {
                    
                    Parse.User.logOut();
					window.location = "login.html";
                } 

}
var sessionToken ;
function register(){
	           
var user = new Parse.User();
var username = document.getElementById("mobile");
var useremail = document.getElementById("email");
var userpass = document.getElementById("pass");
username = username.value;
userpass = userpass.value;
useremail = useremail.value;
user.set("username", username);
user.set("password", userpass);
user.set("email", useremail);
if(username==''||userpass==''||useremail==''){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Please Fill All Fields";
	alertbtn.setAttribute("onclick","hidealerts()");
}
else if(isNaN(username)||username.length<10)
{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Please Enter Valid Mobile Number";
	alertbtn.setAttribute("onclick","hidealerts()");
}
else{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	alertstext.innerHTML="";
	alertbtn.setAttribute("onclick","hidealerts()");

user.signUp(null, {
  success: function(user) {
   
	setaddress(username);
	/*var emailflag = user.get("emailVerified");
	 alert("Verify email to continue usage");
	 if(emailflag==false){
		
		 
		  
		 
	 }*/
	
	
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Connection Failed...<br>Please Try Again Later";
	alertbtn.setAttribute("onclick","hidealerts()");
   
  }
});
}	
}
function setaddress(un){
	//alert("setting address");
	Parse.Cloud.run('setaddress ',{username:un},{
	    success:function(results){
			if(results){
				Parse.User.logOut();
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Verify Email To Continue Usage";
	alertbtn.setAttribute("onclick","hidealerts()");
			}
		},
		error: function(error){
			
			console.log(error.code);
			
		}
});
	 
}
function runninglogging(){

             /*   if (currentUser) {
                    
                    Parse.User.logOut();
                } 
*/
var username = document.getElementById("mobile");
var userpass = document.getElementById("pass");
username = username.value;
userpass = userpass.value;
if(username==''||userpass==''){
		var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Please Fill All Details";
	alertbtn.setAttribute("onclick","hidealerts()");
}
else if(isNaN(username)||username.length<10)
{
		var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Please Enter Valid Username";
	alertbtn.setAttribute("onclick","hidealerts()");
}
else{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	alertstext.innerHTML="";
	alertbtn.setAttribute("onclick","hidealerts()");
Parse.User.logIn(username, userpass, {
  success: function(user) {
    
	 var emailflag = user.get("emailVerified");

	 if(emailflag==false){
		  Parse.User.logOut();
		 var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Email Verification pending..<br>Please Verify Email.";
	alertbtn.setAttribute("onclick","hidealerts()");
	 }
	 	 else{
		 sessionToken = Parse.User.current()._sessionToken;
		 
		
		 window.location="location.html";
	 }
	 
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Connection Failed...<br>Please Try Again Later";
	alertbtn.setAttribute("onclick","hidealerts()");
  }
});
}
}
function showingregistration(){
	var x  = document.getElementById("logtext");
    var e  =  document.getElementById("email");
	var c  =  document.getElementById("comment");
	var r  =  document.getElementById("regtext");
	var reg  =  document.getElementById("reg");
	var log =  document.getElementById("login");
	e.style.display = "block";
	c.innerHTML = "Already a User!";
	r.innerHTML= "Login";
	x.innerHTML = "Register";
	reg.setAttribute("onclick","login()");
	log.setAttribute("onclick","register()");
	
}
function login(){
	var e  =  document.getElementById("email");
	if($(e).is(":visible"))
	{
	e.style.display = "none";
	var reg  =  document.getElementById("reg");
	var log =  document.getElementById("login");
	reg.setAttribute("onclick","showingregistration()");
	log.setAttribute("onclick","runninglogging()");
	var c  =  document.getElementById("comment");
		c.innerHTML = "Not A User?";
		var x  = document.getElementById("logtext");
		var r  =  document.getElementById("regtext");
			r.innerHTML = "Register";
	x.innerHTML = "Login";
	}
}
function hidealerts(){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="none";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="";
	alertbtn.setAttribute("onclick","hidealerts()");
	
}
function changepassword(){
	var email = document.getElementById("mobile").value;
	Parse.User.requestPasswordReset(email, {
  success: function() {
	  var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Check your Email for changing password";
	alertbtn.setAttribute("onclick","loadlogin()");
  // Password reset request was sent successfully
  },
  error: function(error) {
    // Show the error message somewhere
 var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Connection Error";
	alertbtn.setAttribute("onclick","hidealerts()");
	
  }
});
	
}
function loadlogin(){
	document.getElementById("mobile").value = "";
		window.location="login.html";
}
function gotochangepassword(){
	document.getElementById("mobile").value = "";
	window.location="changepass.html";
}