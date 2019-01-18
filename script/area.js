$(document).ready(function(){
	
document.getElementsByClassName("payicon")[0].style.display="none";
document.getElementsByClassName("payicon")[0].style.marginLeft="75%";
var ele2 = document.getElementById("selected_mart");
ele2.style.display="none";
getarea();
/*alert(localStorage.getItem("currentcartid"));*/
localStorage.setItem("cartcount",0);
//localStorage.setItem("incart","");
var hasincart = [];
hasincart[0] ="null"
localStorage.setItem("incart", JSON.stringify(hasincart));
localStorage.setItem("iscomparegen",true);	
	
});
var city = localStorage.getItem("city");
var currentcartid = localStorage.getItem("currentcartid");
var flag_state;var flag_city;	var area_names =[];//var mart_names =[];var dsec_names =[];
var mart_ids =[];
var currentUser = Parse.User.current();	
if(currentUser){
var username  = currentUser.get("username");
function getarea(){
	/*Parse.Cloud.run('getcity ',{username:username},{
	    success:function(results){
			if(results){	

			 console.log(results);
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});*/
var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	
Parse.Cloud.run('getarea ',{city:city},{
	    success:function(results){
			if(results){	
			for (var i=0;i<results.length;i++){
			 /*console.log(results[i].get("area"));*/
			 area_names.push(results[i].get("area"));
			/* mart_names.push(results[i].get("mart_name"));
			 dsec_names.push(results[i].get("description"));
			 mart_ids.push(results[i].get("martid"));*/
			 alerts.style.display="none";
			}
			}
		},
		error: function(error){
			console.log(error.code);
		}
		
});
}
function removeareas(){

	$.unique(area_names);
	
}
function generatearealist(){
$(".areaname").remove();
var parent_container = document.getElementById("select_area");
for(var i=0;i<area_names.length;i++){
var options = document.createElement("div");
options.setAttribute("class","options areaname");
options.setAttribute("onclick","hidearea(this)");
options.innerHTML = area_names[i];
parent_container.appendChild(options);
}

}
function showarea(){
	removeareas();
	generatearealist();
	var ele = document.getElementById("select_area");
	
	var ele3 = document.getElementById("select_mart");
	if($(ele).is(":visible")){
		
		ele.style.display="none";
	}
	else{
	var ele3 = document.getElementById("select_mart");
	ele3.style.display="none";
		ele.style.display="block";
		
	}
	
}
function removemarts(){
	$(".martname").remove();
	
}
function hidearea(e){
	removemarts();
var val = e.innerHTML;
var areaname = val;
localStorage.setItem("area", areaname);
var ele3 = document.getElementById("Area");
	
	if(val)
	{
		flag_state = 1;
		
		ele3.innerHTML=val;
		getmartnames(val);
		if(flag_city==1&&flag_state==1){
			var tick  = document.getElementsByClassName("payicon")[0];
			tick.style.display="block";
			tick.setAttribute("onclick","gotoscan()");
		}
	}
	else{
		console.log("error");
	}
	
	
	
	
}
function getmartnames(area_name){
	
var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	
Parse.Cloud.run('getmarts ',{a:area_name},{
	    success:function(results){
			if(results){	
			
			var parent_container = document.getElementById("select_mart");
			for (var i=0;i<results.length;i++){
			var options = document.createElement("div");
			options.setAttribute("class","options martname");
			options.setAttribute("id",results[i].get('martid'));
			options.setAttribute("onclick","hidemart(this)");
			options.innerHTML = results[i].get("mart_name")+" ("+results[i].get("description")+")";
			parent_container.appendChild(options);
			mart_ids.push(results[i].get('martid'));
}	
localStorage.setItem("martids", mart_ids);
/*alert(localStorage.getItem("martids"));*/
			var ele2 = document.getElementById("selected_mart");
			var ele = document.getElementById("select_area");
			ele.style.display="none";
			ele2.style.display="block";
			alerts.style.display="none";
			/*for (var i=0;i<results.length;i++){
			 /*console.log(results[i].get("area"));
			 area_names.push(results[i].get("area"));
			 mart_names.push(results[i].get("mart_name"));
			 dsec_names.push(results[i].get("description"));
			 mart_ids.push(results[i].get("martid"));
			 
			}*/
			}
		},
		error: function(error){
			console.log(error.code);
		}
		
});
}
	





function showmart(){
	
	var ele = document.getElementById("select_mart");
	if($(ele).is(":visible"))
		
		ele.style.display="none";
	else
		ele.style.display="block";
	
	
}

function hidemart(e){
	var martid  = e.id;
	var martname  = e.innerHTML;
	localStorage.setItem("currentmartid", martid);
	localStorage.setItem("martname", martname);
	var tick  = document.getElementsByClassName("payicon")[0];

	var ele3 = document.getElementById("Mart");
	if(e)
	{
		
		flag_city = 1;
		
		ele3.innerHTML=martname;
		if(flag_city==1&&flag_state==1){
			
			tick.style.display="block";
			tick.setAttribute("onclick","gotoscan()");
		}
	}
	
	else{
		console.log("error");
	}
	var ele = document.getElementById("select_mart");
	ele.style.display="none";
	
	
}
}
else{
	window.location ="login.html";
}
