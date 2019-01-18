	$(document).ready(function(){
		callhistory();
		 $(".containsarrow").click(function(){
      goback();
    });
	});
	var mtm = [];
	var finalres = [];
	function goback(){
		var nowurl = localStorage.getItem("nowurl");
		window.location = nowurl;
	}
function callhistory(){
	var alerts = document.getElementById("load");
	alerts.style.display = "block";
	var un = localStorage.getItem("username");	 
	Parse.Cloud.run('history ',{username:un},{
	    success:function(results){
			if(results!="false"){	
				for(var k=0;k<results.length;k++)
					mtm.push(results[k][0]);
				finalres = results;
				console.log(finalres);
				getmartimgs();
			}
			else{
				getmartimgs();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

}
var c=0;
var urls = [];
function getmartimgs(){
	 if(c<mtm.length){
	Parse.Cloud.run('imagesforhistory ',{martname:mtm[c]},{
	    success:function(results){
			if(results){	
				console.log(results);
				urls.push(results);
				c++;
				getmartimgs();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});
	 }
	 else{
		 makehistory();
	 }
}
var h = 0;
function makehistory(){
	var l = finalres.length;
	
	if(h<l){
		var img = urls[h];
		var total = finalres[h][4];
		var net = finalres[h][5];
		var d =  finalres[h][6];
		var names  = finalres[h][7];
		d=d.toString();
		var dt="";
		var w=0;
		while(w<16){
		dt += d[w];
		w++;
		}
		var products =  finalres[h][2];
		console.log(products);
		var price =  finalres[h][1];
		var quantity =  finalres[h][3];
		var mn = finalres[h][0];
		var paid = finalres[h][8];
		var bilno = finalres[h][9];
		 generatenew(mn,img,total,dt,products,price,quantity,net,names,paid,bilno);
		 h++;
		 makehistory();
	}
	else{
		var alerts = document.getElementById("load");
		alerts.style.display = "none";
	}
}
var id = 0;
function generatenew(mn,img,t,d,p,price,quantity,net,names,paid,bilno){
	var master = document.getElementById("page");
	var billno  = document.createElement("div");
	billno.setAttribute("class","billno");
	billno.innerHTML = "Bill No :"+ bilno;
	var parent = document.createElement("div");
	parent.setAttribute("class","purchase_section");
	parent.setAttribute("id",id+"purchase_section");
	
	var product_img = document.createElement("div");
	var martname = document.createElement("div");
	var products = document.createElement("div");
	var total = document.createElement("div");
	var date = document.createElement("div");
	
	var default_img = document.createElement("img");
	
	default_img.setAttribute("src",img);//img
	
	default_img.setAttribute("class","martimg");
	
	product_img.setAttribute("class","cartimg");
	martname.setAttribute("class","martname");
	products.setAttribute("class","number");
	total.setAttribute("class","total");
	date.setAttribute("class","date");
	
	
	if(paid=="true"){
		date.innerHTML = d;//date
	martname.innerHTML =mn;//martname
	total.innerHTML ="Rs "+t;//total
	var l = p.length;
	products.innerHTML ="Product: "+l;//productcount
	parent.setAttribute("onclick","showhistory("+id+")");
	product_img.appendChild(default_img);
	parent.appendChild(product_img);
	parent.appendChild(date);
	parent.appendChild(martname);
	parent.appendChild(products);
	parent.appendChild(total);
	master.appendChild(billno);
	master.appendChild(parent);
	createdetailedpage(id,mn,img,t,d,p,price,quantity,net,names);
	}
	else if(paid=="false"){
		date.innerHTML = "Pending";//date
	martname.innerHTML ="";//martname
	total.innerHTML ="";//pending
	var l = p.length;
	products.innerHTML ="";//productcount
	product_img.appendChild(default_img);
	parent.appendChild(product_img);
	parent.appendChild(date);
	parent.appendChild(martname);
	parent.appendChild(products);
	parent.appendChild(total);
	master.appendChild(billno);
	master.appendChild(parent);
	
	}
	
	id++;
}
function createdetailedpage(ids,mn,img,t,d,p,pc,quantity,net,names){
	var master = document.getElementById("container");
	var parent = document.createElement("div");
	parent.setAttribute("class","pages");
	parent.setAttribute("id",ids+"pages");
	
	var total =  document.createElement("div");
	total.setAttribute("class","eachtotal");
	total.innerHTML = "Total Savings: "+net.toFixed(2);
	var close =  document.createElement("div");
	close.setAttribute("class","closepage");
	close.setAttribute("onclick","closethispage("+ids+")");
	close.innerHTML = "Close";
	parent.appendChild(total);
	//start of for loop
	for(var k=0;k<p.length;k++){
	var each =  document.createElement("div");
	var code = document.createElement("div");
	var productname = document.createElement("div");
	var productquantity = document.createElement("div");
	var price = document.createElement("div");
	
	each.setAttribute("class","eachproduct");
	code.setAttribute("class","barcode");
	productname.setAttribute("class","productname");
	productquantity.setAttribute("class","productquantity");
	price.setAttribute("class","productprice");
	
	code.innerHTML = p[k];
	productname.innerHTML = names[k];
	productquantity.innerHTML =quantity[k];
	price.innerHTML ="Rs "+pc[k];
	
	
	
	
	each.appendChild(code);
	each.appendChild(productname);
	each.appendChild(productquantity);
	each.appendChild(price);
	
	parent.appendChild(each);
	//end of for loop
	}
	var space  =  document.createElement("div");
	space.setAttribute("class","space");
	space.style.width = "100%";
	space.style.height = "10%";
	parent.appendChild(space);
	parent.appendChild(close);
	
	master.appendChild(parent);
	
}
function showhistory(ids){
	var master = document.getElementById("page");
	master.style.display = "none";
	var page = document.getElementById(ids+"pages");
	page.style.display = "block";
}
function closethispage(ids){
	var master = document.getElementById("page");
	master.style.display = "block";
	var page = document.getElementById(ids+"pages");
	page.style.display = "none";
}

function logout(){
	window.location="login.html";
}