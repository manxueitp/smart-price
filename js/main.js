var allProducts=[];
var eachPrice=[];
var eachName=[];
var eachRetailer=[];
var eachClick=[];
var eachSize=[];
var eachSalePrice=[];
var totalAmount;
var eachImage=[];

function getInput(event){
	var val = document.getElementById('theInput').value;
	// if there is no value, or it is an empty string, prompt the user
	if(!val || val=="") return alert("Enter a Product");
	console.log("the value is " + val);
	// else, need to geocode it
	getProduct(val);
}

function getProduct(val){
   var apiKey= 'uid25-33208755-48';
   	$.ajax({
	    url: 'http://api.shopstyle.com/api/v2/products?pid='+apiKey+'&sort=PriceLoHi&format=json&fts='+val+'&offset=0&limit=60',
	    type: 'GET',
	    failure: function(err){
	      return alert ("Could not find that product");
	    },
	    success: function(response) {
	      console.log('the product found -- >');
	      console.log(response);

	      if(response.status=="ZERO_RESULTS") return alert ("Sorry,could not find an offer, probably it's the only place to buy this");

	      // get product info
	      totalAmount=response.products.length;
	      allProducts=response.products;
	      console.log(totalAmount);

        allProducts.forEach(function(e){
		        eachPrice.push(e.priceLabel);
		        eachName.push(e.name);
		        eachImage.push(e.image.sizes.Large.url);
		        eachRetailer.push(e.retailer.name);
		        eachClick.push(e.clickUrl);
		        eachSize.push(e.sizes);
		        if(e.salePrice){
		        		e.salePriceLabel=e.salePriceLabel;
		        }else{
		            e.salePriceLabel=e.priceLabel;
		        }
		        eachSalePrice.push(e.salePriceLabel);
        })
        addCard(allProducts);
	    }
	});
}

function addCard(allProducts){
	$('#card-holder').empty();
  allProducts.forEach(function(e,i){
	var htmlToAppend =
	'<div class="card">'+
        '<div class="wordboard">'+
          '<h3>'+e.retailer.name+'</h2>'+
          '<div class="price">'+
          '<h1>'+e.salePriceLabel+'</h1><h1 class="originalprice">'+e.priceLabel+'</h1>'+
          '</div>'+
          '<h2>'+e.name+'</h2>'+

          '<div class="trans">Size:</div><div id="size'+i+'">'+
          '</div>'+
        '</div>'+
        '<img src='+e.image.sizes.Large.url+'>'+
        '</img>'+
        '<div class="button">'+
        ' <a href='+e.clickUrl+'  target="_blank"></a>'+
        '</div>'+
        '<div class="sale">'+
        '</div>'+
      '</div>'

      $('#card-holder').append(htmlToAppend);
      var sizeArray=eachSize[i];
      for(var j=0;j<sizeArray.length;j++){
      	var htmlSize='<span>'+sizeArray[j].name+'</span>';
        $('#size'+i).append(htmlSize);
      }

     if(e.salePrice){
       $('.sale').css('display','block');
       $('.originalprice').css('color','#d8dcdd');
    }
  })
}

document.getElementById('theInput').addEventListener('change', getInput);
