$(document).ready(function(){
document.getElementsByClassName("payicon")[0].style.display="none";
document.getElementsByClassName("payicon")[0].style.marginLeft="75%";
localStorage.setItem("thisisothermart","false");
var sc = document.getElementById("selected_city");
sc.style.display="none";
var checklist =[];
checklist[0]="null"; 
localStorage.setItem("checkedlist",JSON.stringify(checklist));
});
var flag_state;var flag_city;	

var location_names=[];

var currentUser = Parse.User.current();	
if(currentUser){
	 var username  = currentUser.get("username");
function getlocation(val){
	
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	alertstext.innerHTML="";
	
	Parse.Cloud.run('getlocation ',{state:val},{
	    success:function(results){
			if(results){	
			for(var i=0;i<results.length;i++){
			location_names.push(results[i].get("location_name"));
			
			
			/*console.log(results[i].get("area"));
			console.log(results[i].get("martid"));
			console.log(results[i].get("mart_name"));
			console.log(results[i].get("description"));
							*/
							
			}		
			var ele3 = document.getElementById("state");
			flag_state = 1;
			ele3.innerHTML=val;
			showstate();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

	
}
function removecities(){
	/*for(var i=0;i<location_names.length-1;i++){
		for(var j=i+1;j<location_names.length;j++){
			if(location_names[i]==location_names[j]){
			location_names.splice(i,1);
		    break;
			}
		}
	}*/
	$.unique(location_names);
	
}
function showstate(){
	
	var ele = document.getElementById("select_state");
	var ele2 = document.getElementById("selected_city");
	var ele3 = document.getElementById("select_city");
	if(($(ele).is(":visible"))&&flag_state==1){
		ele2.style.display="block";
		ele.style.display="none";
	}
	else if($(ele).is(":visible")){
		ele.style.display="none";
	}
	else{
		ele3.style.display="none";
		ele.style.display="block";
		ele2.style.display="none";
	}
	var alerts = document.getElementById("alert");
	alerts.style.display="none";
}

function hidestate(e){
	var val = e.innerHTML;

	
	if(val!="Coming Soon...")
	{
		
		getlocation(val);
		if(flag_city==1&&flag_state==1){
			var tick  = document.getElementsByClassName("payicon")[0];
			tick.style.display="block";
			tick.setAttribute("onclick","gotoarea()");
		}
	}
	else{
		console.log("error");
	}
/*	var ele2 = document.getElementById("selected_city");
	
	ele2.style.display="block";*/
	
	
	
}




function generatecitylist(){
	$(".cityname").remove();
var parent_container = document.getElementById("select_city");
for(var i=0;i<location_names.length;i++){
var options = document.createElement("div");
options.setAttribute("class","options cityname");
options.setAttribute("onclick","hidecity(this)");
options.innerHTML = location_names[i];
parent_container.appendChild(options);
}

}
function showcity(){
	removecities();
	generatecitylist();
	var ele = document.getElementById("select_city");
	if($(ele).is(":visible"))
		
		ele.style.display="none";
	else
		ele.style.display="block";
	
	
}

function hidecity(e){
	var val = e.innerHTML;
var city = val;
localStorage.setItem("city", city);
  
	var ele3 = document.getElementById("city");
	if(val)
	{
		var tick  = document.getElementsByClassName("payicon")[0];
		flag_city = 1;
		
		ele3.innerHTML=val;
		if(flag_city==1&&flag_state==1){
			
			tick.style.display="block";
			tick.setAttribute("onclick","gotoarea()");
		}
	}
	else{
		console.log("error");
	}
	var ele = document.getElementById("select_city");
	ele.style.display="none";
	
	
}
}
else{
	window.location="login.html";
}