$(document).ready(function(){

    var orderslistDiv = $("#orderslist");
    var newordersDiv = $("#neworders");
    var inventorylistDiv = $("#inventoryview");
    var adjustPriceDiv = $("#adjustprice");
    hideDiv(newordersDiv);
    showDiv(orderslistDiv);
    hideDiv(adjustPriceDiv);
    showDiv(inventorylistDiv);
    
    //$("#addneworders").on('click', ordersPage);

    $("#addneworders").click(function(){
        ordersPage(newordersDiv, orderslistDiv);
    });
    $("#adjustprices").click(function(){
        adjustpriceform(inventorylistDiv, adjustPriceDiv);
    });
    

    
    var additemsform = $("#placeorderformfieldset").clone();
    var sectionsCount = 1;
    $("#additemsorderfieldset").click(function(){
        sectionsCount++;
        var section = additemsform.clone().find(':input').each(function(){
            var newId = this.id + sectionsCount;
            $(this).prev().attr('for', newId);
            this.id = newId;
        }).end();
        $("#placeorderform").append(section);
        rearrange();
        return false;
    });
});

function rearrange() {
  var count = 1;
  var totalCount = $(".placeorderformfieldset").length;
  $(".placeorderformfieldset").each(function() {
    $(this).attr("id", "placeorderformfieldset" + count)
    .find(".label-nbr").text(count).end();
    count++;
  });
}

function ordersPage(newordersDiv, orderslistDiv) {
    showDiv(newordersDiv);
    hideDiv(orderslistDiv);
}

function adjustpriceform(inventorylistDiv, adjustPriceDiv) {
    hideDiv(inventorylistDiv);
    showDiv(adjustPriceDiv);
}

function showDiv(divname){
    divname.show();
}

function hideDiv(divname){
    divname.hide();
}