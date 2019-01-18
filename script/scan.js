function runscan(){
	
	window.location = "index.html";
	
}
$(document).ready(function(){
	getmartimage();
	var thismarttext = localStorage.getItem("martname");
thismarttext=thismarttext.split(" ");
thismarttext = thismarttext[0];
document.getElementsByClassName("pagehead2")[0].innerHTML = thismarttext;
	
});

/*end of dummy data*/


var barcode ;
function getmartimage(){
	var mid = localStorage.getItem("currentmartid");
	mid = parseInt(mid);
	Parse.Cloud.run('getmartimg ',{martid:mid},{
	    success:function(results){
			if(results){
				localStorage.setItem("marturl",results);

			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
	
}
function runsearch(){
	barcode = document.getElementById("barcode");
	barcode = barcode.value;
	
	localStorage.setItem("barcode",barcode);

	window.location="product.html";
	
/*find releveant elements*/

}

/*
function generatecompare(){

	Parse.Cloud.run('getreferencemartnames ',{arr:refmartid},{
	    success:function(results){
			if(results){	

			for (var i=0;i<results.length;i++){
			refmartid+=results[i];
					
			}
			}
			console.log(results);
			//getmartname();
		},
		error: function(error){
			console.log(error.code);
		}
});

}
	/*
}
function getmartname(){
		Parse.Cloud.run('getmartname ',{martid:refmartid},{
	    success:function(results){
			if(results){	

			for (var i=0;i<results.length;i++){
			refmartid+=results[i];
					
			}
			}
			getmartname();
		},
		error: function(error){
			console.log(error.code);
		}
});
}*/