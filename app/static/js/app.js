$(document).ready(function(){

    var orderslistDiv = $("#orderslist");
    var newordersDiv = $("#neworders");
    var inventorylistDiv = $("#inventoryview");
    var adjustPriceDiv = $("#adjustprice");
    var inventorytable = $("inventorytable")
    var salesrestockDiv = $("#restockorsolditem");
    var newinventoryitem = $("#addnewiteminventory");
    var deleteinventoryitemDIv = $("#removeitemsinventory");
    
    showDiv(inventorylistDiv);
    hideDiv(adjustPriceDiv);
    hideDiv(salesrestockDiv);
    hideDiv(newinventoryitem);

    hideDiv(newordersDiv);
    showDiv(orderslistDiv);


    
    //$("#addneworders").on('click', ordersPage);

    $("#addneworders").click(function(){
        ordersPage(newordersDiv, orderslistDiv);
    });
    $("#adjustprices").click(function(){
        adjustpriceform(inventorylistDiv, adjustPriceDiv);
    });

    $("#searchinventorybtn").click(function(){
        $.each($("#inventorytable tbody tr"), function() {

            if($(this).text().toLowerCase().indexOf($('#searchinput').val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();                
        });
    }); 

    $("#soldorrestockbtn").click(function(){
        hideDiv(inventorylistDiv);
        hideDiv(adjustPriceDiv);
        hideDiv(newinventoryitem);
        hideDiv(deleteinventoryitemDIv);
        showDiv(salesrestockDiv);
    });

    $("#addnewiteminventorybtn").click(function(){
        hideDiv(inventorylistDiv);
        hideDiv(adjustPriceDiv);
        showDiv(newinventoryitem);
        hideDiv(deleteinventoryitemDIv);
        hideDiv(salesrestockDiv);
    });

    $("#deleteiteminventorybtn").click(function(){
        hideDiv(inventorylistDiv);
        hideDiv(adjustPriceDiv);
        hideDiv(newinventoryitem);
        showDiv(deleteinventoryitemDIv);
        hideDiv(salesrestockDiv);
    });

    $("#groupitemsbybtn").click(function(){
        var tablecolumn = "hello";
        if($('#itemradiobtn').is(':checked')) {
            tablecolumn = $("#itemidhead")
            console.log(tablecolumn);
            groupby(inventorytable, $("#itemidhead"));


        }else if($('#nameradiobtn').is(':checked')) { 
            tablecolumn = $("#itemnamehead")
        }else if($('#typeradiobtn').is(':checked')) { 
            tablecolumn = $("#itemtypehead")
        }else if($('#materialradiobtn').is(':checked')) { 
            tablecolumn = $("#itemmaterialhead")
        }else if($('#colourradiobtn').is(':checked')) { 
            tablecolumn = $("#itemcolourhead")
        }else if($('#quantityradiobtn').is(':checked')) { 
            tablecolumn = $("#itemquantityhead")
        }else if($('#priceradiobtn').is(':checked')) { 
            tablecolumn = $("#itempricehead")
        }else{ 
            tablecolumn = $("#itemidhead")
        }
        groupby(inventorytable, tablecolumn);
    });

    $('#updatedropdownmenu, #groupbydropdownmenu').on({
        "shown.bs.dropdown": function() { this.closable = false; $('#inventorytable').css('margin-top', '250px'); },
        "click": function() { this.closable = true; $('#inventorytable').css('margin-top', '0px');},
        "hide.bs.dropdown": function() { this.closable = true; $('#inventorytable').css('margin-top', '0px');}
    });
    /*$('#groupbydropdownmenu').on({
        "shown.bs.dropdown": function() { this.closable = false; $('#inventorytable').css('margin-top', '250px'); },
        "click": function() { this.closable = true; $('#inventorytable').css('margin-top', '0px');},
        "hide.bs.dropdown": function() { this.closable = true; $('#inventorytable').css('margin-top', '0px');}
    });*/
            
    
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

function groupby(inventorytable, tablecolumn){
    tablecolumn
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;

            inventorytable.find('td').filter(function(){
                    
                return $(this).index() === thIndex;
                
            }).sortElements(function(a, b){
                
                return $.text([a]) > $.text([b]) ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;
                
            }, function(){
                
                // parentNode is the element we want to move
                return this.parentNode; 
                
            });
            
            inverse = !inverse;                
                                    
        });

}

jQuery.fn.sortElements = (function(){
 
    var sort = [].sort;
 
    return function(comparator, getSortable) {
 
        getSortable = getSortable || function(){return this;};
 
        var placements = this.map(function(){
 
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
 
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
 
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
 
            };
 
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
 
    };
 
})();