document.getElementById("submitOrder").disabled = true;
document.getElementById("submitOrder").style.display = "none";
document.getElementById("confirmOrder").style.display = "none";


// array for name/size of drinks
var myCart = [];
// array for prices
var myPrice = [];
// array for order items to be displayed
var orderDisplay = [];


if (myCart.length == 0) {
    document.getElementById("emptyCartLabel").innerHTML = "Your cart is currently empty.";
}


/*function checkFields(){
    if((document.getElementById("name").value.length == 0) || (document.getElementById("number").value.length == 10)
            || ((document.getElementById("asap").checked == false) && (document.getElementById("custom").checked == false))
            || ((document.getElementById("curbside").checked == false) && (document.getElementById("walkin").checked == false))
            || (myCart.length==0) || (myPrice.length == 0)) {
                
                //alert("Missing information.");
                document.getElementById("submitOrder").disabled = true;

    }
    else {
        document.getElementById("submitOrder").disabled = false;
    }
}*/




document.getElementById("drinkName").style.display = "none";
document.getElementById("drinkSize").style.display = "none";

document.getElementById("comboName").style.display = "none";
document.getElementById("comboSize").style.display = "none";
document.getElementById("comboLabel1").style.display = "none";
document.getElementById("comboLabel2").style.display = "none";

document.getElementById("arrivalTimeLabel").style.display = "none";
document.getElementById("arrivalTime").style.display = "none";

document.getElementById("drinkCategory").selectedIndex = -1;
document.getElementById("acaiCheckboxes").style.display = "none";





/*function tempFunc() {
    var str = "";
    for(var i = 0; i < myPrice.length; i++) {
        str += myPrice[i] + "**";
    }

    document.getElementById("tempP").innerHTML = str;

    var str2 = "";
    for(var i = 0; i < myPrice.length; i++) {
        str2 += myCart[i] + "**";
    }

    document.getElementById("tempP2").innerHTML = str2;


}*/



function clearCart() {
    // clear cart selections
    myCart.length = 0;
    myPrice.length = 0;
    orderDisplay.length = 0;
    document.getElementById("drinkCategory").selectedIndex = -1;

    // update cart display
    var cart = document.getElementById("cartList");
    cart.innerHTML = "";
    document.getElementById("tax").innerHTML = "";
    document.getElementById("subtotal").innerHTML = "";
    document.getElementById("total").innerHTML = "";
    document.getElementById("emptyCartLabel").innerHTML = "Your cart is currently empty.";
}

function continueClicked() {
    if ((document.getElementById("name").value.length == 0) || (document.getElementById("number").value.length != 10)
        || ((document.getElementById("asap").checked == false) && (document.getElementById("custom").checked == false))
        || ((document.getElementById("curbside").checked == false) && (document.getElementById("walkin").checked == false))
        || (myCart.length == 0) || (myPrice.length == 0)) {

        alert("Missing information.");
        document.getElementById("submitOrder").disabled = true;
        document.getElementById("submitOrder").style.display = "none";
        document.getElementById("confirmOrder").style.display = "none";

    }
    else {
        document.getElementById("submitOrder").disabled = false;
        document.getElementById("submitOrder").style.display = "inline-block";
        document.getElementById("confirmOrder").style.display = "inline-block";
    }
}


/*function removeItemsClicked() {
    document.getElementById("cartListSelect").removeAttribute("disabled");

}

function removeClicked() {
    //document.getElementById("cartListSelect").setAttribute("disabled", "disabled");
    for (var option of document.getElementById('drinkName').options) {
                if (option.selected) {
                    // remove drink from arrays
                    for (var i = 0; i < myCart.length; i++) {
                        if (myCart[i] == option.value) {
                            myCart.splice(i, 1);
                            myPrice.splice(i, 1);
                        }
                    }
                }
    }
    // update cart ...
    document.getElementById('cartListSelect').options.length = 0;

    //document.getElementById("cartListSelect").setAttribute("disabled", "disabled");
    var list = document.getElementById("cartListSelect");
    //list.options[document.getElementById('cartListSelect').options.length] = new Option(strNewDrink);
    //list.setAttribute('multiple', true);

    // calculate total cost
    var totalPrice = 0.0;
    for (var i = 0; i < myPrice.length; i++) {
        totalPrice += myPrice[i];
        list.options[i] = new Option(myCart[i]);
    }

    //document.getElementById("tax").innerHTML = "$ 5.50";
    document.getElementById("total").innerHTML = "$" + totalPrice;


    // reset all drink options
    document.getElementById('drinkName').options.length = 0;
    document.getElementById('drinkSize').options.length = 0;
    document.getElementById('drinkCategory').value = "Please choose a category";
    document.getElementById("cartListSelect").setAttribute("disabled", "disabled");
}*/

function submitOrder(message) {

    var xmlHttp = new XMLHttpRequest();
    let smsURL = "https://us-central1-vibe-b0716.cloudfunctions.net/app/sendMessage?message=" + message
    xmlHttp.open( "GET", smsURL, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);

    //alert("Order placed!")
    
}




function updateOptions() {

    var selectedCategory = document.getElementById("drinkCategory");
    var categoryName = selectedCategory.options[selectedCategory.selectedIndex].text;
    var drinkNameMenu = document.getElementById("drinkName");
    var drinkNameMenuCombo = document.getElementById("comboName");

    document.getElementById('drinkName').options.length = 0;
    document.getElementById('drinkSize').options.length = 0;
    document.getElementById('comboName').options.length = 0;
    document.getElementById('comboSize').options.length = 0;

    if ((categoryName == "Protein Shakes") || (categoryName == "Tea") || (categoryName == "Collagen Refreshers") || (categoryName == "Iced Coffee")) {
        document.getElementById("drinkName").style.display = "inline-block";
        document.getElementById("drinkSize").style.display = "inline-block";
        document.getElementById("acaiCheckboxes").style.display = "none";
        document.getElementById("drinkName").disabled = false;
        document.getElementById("drinkSize").disabled = false;
        document.getElementById("comboName").style.display = "none";
        document.getElementById("comboSize").style.display = "none";
        document.getElementById("comboName").disabled = true;
        document.getElementById("comboSize").disabled = true;
        document.getElementById("comboLabel1").style.display = "none";
        document.getElementById("comboLabel2").style.display = "none";
        drinkNameMenu.removeAttribute('multiple');
    }
    else if (categoryName != "Combo") {
        document.getElementById("comboName").style.display = "none";
        document.getElementById("comboSize").style.display = "none";
        document.getElementById("comboName").disabled = true;
        document.getElementById("comboSize").disabled = true;
        document.getElementById("comboLabel1").style.display = "none";
        document.getElementById("comboLabel2").style.display = "none";
    }

    if (categoryName == "Protein Shakes") {
        drinkNameMenu.options[0] = new Option("Cake Batter");
        drinkNameMenu.options[1] = new Option("Oatmeal Butter Pecan");
        drinkNameMenu.options[2] = new Option("Mint Chocolate Chip");
        drinkNameMenu.options[3] = new Option("Banana Nut Bread");
        drinkNameMenu.options[4] = new Option("Banana Fudge Sundae");
        drinkNameMenu.options[5] = new Option("Brownie Batter");
        drinkNameMenu.options[6] = new Option("Oatmeal Raisin Cookie");
        drinkNameMenu.options[7] = new Option("Oreo Cookie");
        drinkNameMenu.options[8] = new Option("Coffee Cake");
        drinkNameMenu.options[9] = new Option("Dulce Latte");
        drinkNameMenu.options[10] = new Option("Reeses");
        drinkNameMenu.options[11] = new Option("Chocolate PB Crumble");
        drinkNameMenu.options[12] = new Option("Nutter Butter");
        drinkNameMenu.options[13] = new Option("Peanut Butter Banana");
        drinkNameMenu.options[14] = new Option("Cinnamon Toast Crunch");
        drinkNameMenu.options[15] = new Option("Fruity Pebbles");
        drinkNameMenu.options[16] = new Option("Very Berry Day");
        drinkNameMenu.options[17] = new Option("Orange Cream");
        drinkNameMenu.options[18] = new Option("Dole Whip");
        drinkNameMenu.options[19] = new Option("Raspberry Cupcake");
        drinkNameMenu.options[20] = new Option("Frosted Animal Cookie");
        drinkNameMenu.options[21] = new Option("Naked Lemon Bar");
        drinkNameMenu.options[22] = new Option("Pralines & Cream");
        drinkNameMenu.options[23] = new Option("Blueberry Lemonade Cheesecake");
    }
    else if (categoryName == "Tea") {
        drinkNameMenu.options[0] = new Option("Teal Mojito");
        drinkNameMenu.options[1] = new Option("Strawberry Kiss");
        drinkNameMenu.options[2] = new Option("Cherry Limemade");
        drinkNameMenu.options[3] = new Option("Starburst");
        drinkNameMenu.options[4] = new Option("Peach Ring");
        drinkNameMenu.options[5] = new Option("Grape Lemonade");
        drinkNameMenu.options[6] = new Option("Polar Ice");
        drinkNameMenu.options[7] = new Option("Cherry Bomb");
        drinkNameMenu.options[8] = new Option("Cucumber Watermelon");
        drinkNameMenu.options[9] = new Option("Gusher");
        drinkNameMenu.options[10] = new Option("Gilbert Sunrise");
        drinkNameMenu.options[11] = new Option("Liber-Tea");
        drinkNameMenu.options[12] = new Option("Twisted Watermelon");
        drinkNameMenu.options[13] = new Option("Maui Waui");
        drinkNameMenu.options[14] = new Option("Hawaiian Punch");
        drinkNameMenu.options[15] = new Option("Good Vibes");
        drinkNameMenu.options[16] = new Option("Sour Patch");
    }
    else if (categoryName == "Collagen Refreshers") {
        drinkNameMenu.options[0] = new Option("Beach Coconut");
        drinkNameMenu.options[1] = new Option("Peach Lemon Lifesavor");
        drinkNameMenu.options[2] = new Option("Pink Santa");
        drinkNameMenu.options[3] = new Option("Smurf Juice");
    }
    else if (categoryName == "Iced Coffee") {
        drinkNameMenu.options[0] = new Option("Salted Caramel");
        drinkNameMenu.options[1] = new Option("White Chocolate");
        drinkNameMenu.options[2] = new Option("Hazelnut Coconut");
        drinkNameMenu.options[3] = new Option("Mocha");
    }
    else if (categoryName == "Vibe Boosters") {
        document.getElementById("drinkName").style.display = "inline-block";
        document.getElementById("drinkSize").style.display = "none";
        document.getElementById("acaiCheckboxes").style.display = "none";
        document.getElementById("drinkName").disabled = false;
        document.getElementById("drinkSize").disabled = true;
        drinkNameMenu.removeAttribute('multiple');
        drinkNameMenu.options[0] = new Option("Collagen Beauty Booster - $3.00");
        drinkNameMenu.options[1] = new Option("Orange Electrolytes - $3.00");
        drinkNameMenu.options[2] = new Option("Probiotic - $2.00");
        drinkNameMenu.options[3] = new Option("Liftoff B12/B6 Energy - $3.00");
        drinkNameMenu.options[4] = new Option("Tea - $1.50");
        drinkNameMenu.options[5] = new Option("Aloe Shot - $1.50");
        drinkNameMenu.options[6] = new Option("Immunity Shots - $2.00");
    }
    else if (categoryName == "Acai Bowl - $11.00") {
        document.getElementById("drinkName").style.display = "none";
        document.getElementById("drinkSize").style.display = "none";
        document.getElementById("acaiCheckboxes").style.display = "inline-block";
        document.getElementById("drinkName").disabled = false;
        document.getElementById("drinkSize").disabled = true;
    }
    else if (categoryName == "Fat Burner Shot - $5.00") {
        drinkNameMenu.removeAttribute('multiple');
        document.getElementById("drinkName").style.display = "none";
        document.getElementById("drinkSize").style.display = "none";
        document.getElementById("acaiCheckboxes").style.display = "none";
        document.getElementById("drinkName").disabled = true;
        document.getElementById("drinkSize").disabled = true;
    }
    else if (categoryName == "Combo") {
        drinkNameMenu.removeAttribute('multiple');
        document.getElementById("drinkName").style.display = "inline-block";
        document.getElementById("drinkSize").style.display = "inline-block";
        document.getElementById("acaiCheckboxes").style.display = "none";
        document.getElementById("drinkName").disabled = false;
        document.getElementById("drinkSize").disabled = false;
        document.getElementById("comboName").style.display = "inline-block";
        document.getElementById("comboSize").style.display = "inline-block";
        document.getElementById("comboName").disabled = false;
        document.getElementById("comboSize").disabled = false;
        document.getElementById("comboLabel1").style.display = "inline-block";
        document.getElementById("comboLabel2").style.display = "inline-block";

        drinkNameMenu.options[0] = new Option("Teal Mojito");
        drinkNameMenu.options[1] = new Option("Strawberry Kiss");
        drinkNameMenu.options[2] = new Option("Cherry Limemade");
        drinkNameMenu.options[3] = new Option("Starburst");
        drinkNameMenu.options[4] = new Option("Peach Ring");
        drinkNameMenu.options[5] = new Option("Grape Lemonade");
        drinkNameMenu.options[6] = new Option("Polar Ice");
        drinkNameMenu.options[7] = new Option("Cherry Bomb");
        drinkNameMenu.options[8] = new Option("Cucumber Watermelon");
        drinkNameMenu.options[9] = new Option("Gusher");
        drinkNameMenu.options[10] = new Option("Gilbert Sunrise");
        drinkNameMenu.options[11] = new Option("Liber-Tea");
        drinkNameMenu.options[12] = new Option("Twisted Watermelon");
        drinkNameMenu.options[13] = new Option("Maui Waui");
        drinkNameMenu.options[14] = new Option("Hawaiian Punch");
        drinkNameMenu.options[15] = new Option("Good Vibes");
        drinkNameMenu.options[16] = new Option("Sour Patch");

        drinkNameMenuCombo.options[0] = new Option("Cake Batter");
        drinkNameMenuCombo.options[1] = new Option("Oatmeal Butter Pecan");
        drinkNameMenuCombo.options[2] = new Option("Mint Chocolate Chip");
        drinkNameMenuCombo.options[3] = new Option("Banana Nut Bread");
        drinkNameMenuCombo.options[4] = new Option("Banana Fudge Sundae");
        drinkNameMenuCombo.options[5] = new Option("Brownie Batter");
        drinkNameMenuCombo.options[6] = new Option("Oatmeal Raisin Cookie");
        drinkNameMenuCombo.options[7] = new Option("Oreo Cookie");
        drinkNameMenuCombo.options[8] = new Option("Coffee Cake");
        drinkNameMenuCombo.options[9] = new Option("Dulce Latte");
        drinkNameMenuCombo.options[10] = new Option("Reeses");
        drinkNameMenuCombo.options[11] = new Option("Chocolate PB Crumble");
        drinkNameMenuCombo.options[12] = new Option("Nutter Butter");
        drinkNameMenuCombo.options[13] = new Option("Peanut Butter Banana");
        drinkNameMenuCombo.options[14] = new Option("Cinnamon Toast Crunch");
        drinkNameMenuCombo.options[15] = new Option("Fruity Pebbles");
        drinkNameMenuCombo.options[16] = new Option("Very Berry Day");
        drinkNameMenuCombo.options[17] = new Option("Orange Cream");
        drinkNameMenuCombo.options[18] = new Option("Dole Whip");
        drinkNameMenuCombo.options[19] = new Option("Raspberry Cupcake");
        drinkNameMenuCombo.options[20] = new Option("Frosted Animal Cookie");
        drinkNameMenuCombo.options[21] = new Option("Naked Lemon Bar");
        drinkNameMenuCombo.options[22] = new Option("Pralines & Cream");
        drinkNameMenuCombo.options[23] = new Option("Blueberry Lemonade Cheesecake");
    }
    else {
        // error if here ...
        document.getElementById("drinkName").style.display = "none";
        document.getElementById("drinkSize").style.display = "none";
        document.getElementById("acaiCheckboxes").style.display = "none";
        document.getElementById("drinkName").disabled = true;
        document.getElementById("drinkSize").disabled = true;
        document.getElementById("comboName").style.display = "none";
        document.getElementById("comboSize").style.display = "none";
        document.getElementById("comboName").disabled = true;
        document.getElementById("comboSize").disabled = true;
    }

    // display size options
    var drinkSizeMenu = document.getElementById("drinkSize");
    var drinkSizeMenuCombo = document.getElementById("comboSize");
    if (categoryName == "Protein Shakes") {
        drinkSizeMenu.options[0] = new Option("16 oz. - $7.50");
        drinkSizeMenu.options[1] = new Option("24 oz. - $9.00");
        drinkSizeMenu.options[2] = new Option("32 oz. - $14.00");
    }
    else if ((categoryName == "Tea") || (categoryName == "Collagen Refreshers")) {
        drinkSizeMenu.options[0] = new Option("24 oz. - $6.50");
        drinkSizeMenu.options[1] = new Option("32 oz. - $7.50");
    }
    else if (categoryName == "Iced Coffee") {
        drinkSizeMenu.options[0] = new Option("24 oz. - $6.50");
        drinkSizeMenu.options[1] = new Option("32 oz. - $11.00");
    }
    else if (categoryName == "Combo") {
        drinkSizeMenu.options[0] = new Option("24 oz. - $6.50");
        drinkSizeMenu.options[1] = new Option("32 oz. - $7.50");

        drinkSizeMenuCombo.options[0] = new Option("16 oz. - $7.50");
        drinkSizeMenuCombo.options[1] = new Option("24 oz. - $9.00");
        drinkSizeMenuCombo.options[2] = new Option("32 oz. - $14.00");
    }
    else {
        document.getElementById("drinkSize").disabled = true;
    }
}

function updateCart() {
    document.getElementById("emptyCartLabel").innerHTML = "";
    document.getElementById("acaiCheckboxes").style.display = "none";

    var orderTotal = 0;
    var strNewDrink = "";
    var itemStruct;
    var acaiBool = false;
    var extras;
    var extrasCount;

    var selectedCategory = document.getElementById("drinkCategory");
    var categoryName;
    if (selectedCategory.selectedIndex == -1) {
        alert("Please select a menu item before adding to you cart.");
        return;
    }
    else {
        categoryName = selectedCategory.options[selectedCategory.selectedIndex].text;
    }

    if (categoryName == "") {
        alert("Please select an item first!!");
    }
    //else {
    //  document.getElementById("temp").innerHTML = categoryName;
    //}

    //document.getElementById("temp").innerHTML = selectedCategory.selectedIndex;

    if ((categoryName == "Protein Shakes") || (categoryName == "Tea") || (categoryName == "Collagen Refreshers") || (categoryName == "Iced Coffee")) {
        var selectedName = document.getElementById("drinkName");
        var selectedSize = document.getElementById("drinkSize");
        // get name of drink to add
        var strName = selectedName.options[selectedName.selectedIndex].text;
        // get size of drink to add
        var strSize = selectedSize.options[selectedSize.selectedIndex].text;

        var size = "";
        var price;
        if (strSize == "24 oz. - $6.50") {
            size = "24 oz.";
            strNewDrink = strName + " - 24 oz. $6.50";
            myPrice.push(6.5);
        }
        else if (strSize == "32 oz. - $7.50") {
            size = "32 oz.";
            strNewDrink = strName + " - 32 oz. $7.50";
            myPrice.push(7.5);
        }
        else if (strSize == "32 oz. - $11.00") {
            size = "32 oz.";
            strNewDrink = strName + " - 32 oz. $11.00";
            myPrice.push(11);
        }
        else if (strSize == "16 oz. - $7.50") {
            size = "16 oz.";
            strNewDrink = strName + " - 16 oz. $7.50";
            myPrice.push(7.5);
        }
        else if (strSize == "24 oz. - $9.00") {
            size = "24 oz.";
            strNewDrink = strName + " - 24 oz. $9.00";
            myPrice.push(9);
        }
        else if (strSize == "32 oz. - $14.00") {
            size = "32 oz.";
            strNewDrink = strName + " - 32 oz. $14.00";
            myPrice.push(14);
        }

        var newDrink = strName + " - " + size;
        myCart.push(newDrink);
    }
    else if (categoryName == "Vibe Boosters") {
        var selectedName = document.getElementById("drinkName");
        // get name of drink to add
        var strName = selectedName.options[selectedName.selectedIndex].text;

        var dollarSign = strName.indexOf("$");
        var index = dollarSign - 3;
        var name = strName.substring(0, index);
        myCart.push(name);

        var tempStr = strName.substring(dollarSign + 1);
        var priceFloat = parseFloat(tempStr);
        myPrice.push(priceFloat);

        priceFloat = priceFloat.toFixed(2);
        strNewDrink = name + " $" + priceFloat;
    }
    else if (categoryName == "Acai Bowl - $11.00") {
        acaiBool = true;
        strNewDrink = "Acai Bowl $5.00";
        myCart.push("Acai Bowl");
        myPrice.push(11);
        var pb = document.getElementById('peanutButter');
        var banana = document.getElementById('banana');
        var strawberry = document.getElementById('strawberry');
        var coconut = document.getElementById('coconut');
        var honey = document.getElementById('honey');
        var granola = document.getElementById('granola');
        extras = [];
        extrasCount = 0;
        if (pb.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Add Peanut Butter";
            extrasCount++;
        }
        if (banana.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Extra Banana";
            extrasCount++;
        }
        if (strawberry.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Extra Strawberry";
            extrasCount++;
        }
        if (coconut.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Extra Coconut";
            extrasCount++;
        }
        if (honey.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Extra Honey";
            extrasCount++;
        }
        if (granola.checked == true) {
            price = price + 1.0;
            extras[extrasCount] = "Extra Granola";
            extrasCount++;
        }

        if (extrasCount > 0) {
            for (var i = 0; i < extrasCount; i++) {
                myCart.push(extras[i]);
                myPrice.push(1);
            }
        }
    }
    else if (categoryName == "Fat Burner Shot - $5.00") {
        strNewDrink = "Fat Burner Shot $5.00";
        myCart.push("Fat Burner Shot");
        myPrice.push(5);
    }
    else if (categoryName == "Combo") {
        var selectedName = document.getElementById("drinkName");
        var selectedSize = document.getElementById("drinkSize");
        var selectedNameCombo = document.getElementById("comboName");
        var selectedSizeCombo = document.getElementById("comboSize");
        // get name of drink to add
        var strName = selectedName.options[selectedName.selectedIndex].text;
        // get size of drink to add
        var strSize = selectedSize.options[selectedSize.selectedIndex].text;
        var strNameCombo = selectedNameCombo.options[selectedNameCombo.selectedIndex].text;
        var strSizeCombo = selectedSizeCombo.options[selectedSizeCombo.selectedIndex].text;

        var firstDrinkName;
        var secondDrinkName;
        var firstSize;
        var secondSize;
        var firstPrice = 0;
        var secondPrice = 0;

        var size = "";
        if (strSize == "24 oz. - $6.50") {
            size = "24 oz.";
            firstDrinkName = strName + " - 24 oz. $6.50";
            firstPrice = 6.5;
            //myPrice.push(6.5);
        }
        else if (strSize == "32 oz. - $7.50") {
            size = "32 oz.";
            firstDrinkName = strName + " - 32 oz. $7.50";
            firstPrice = 7.5;
            //myPrice.push(7.5);
        }

        if (strSizeCombo == "16 oz. - $7.50") {
            size = "16 oz.";
            secondDrinkName = strName + " - 16 oz. $7.50";
            secondPrice = 7.5;
            //myPrice.push(7.5);
        }
        else if (strSizeCombo == "24 oz. - $9.00") {
            size = "24 oz.";
            secondDrinkName = strName + " - 24 oz. $9.00";
            secondPrice = 9;
            //myPrice.push(9);
        }
        else if (strSizeCombo == "32 oz. - $14.00") {
            size = "32 oz.";
            secondDrinkName = strName + " - 32 oz. $14.00";
            secondPrice = 14;
            //myPrice.push(14);
        }

        var comboPrice = firstPrice + secondPrice - 1;
        myPrice.push(comboPrice);
        comboPrice = comboPrice.toFixed(2);
        var newDrink = "Combo: " + firstDrinkName + " + " + secondDrinkName + " ($" + comboPrice + ")";
        myCart.push(newDrink);
        strNewDrink = newDrink;
    }

    let list = document.getElementById("cartList");
    let li = document.createElement("li");
    li.innerText = strNewDrink;
    list.appendChild(li);
    orderDisplay.push(strNewDrink);

    if (acaiBool == true) {
        if (extrasCount > 0) {
            for (var i = 0; i < extrasCount; i++) {
                let li = document.createElement("li");
                var text = extras[i] + " $1.00";
                li.innerText = text;
                list.appendChild(li);
                orderDisplay.push(text);
            }
        }
    }

    // calculate total cost
    var totalPrice = 0.0;
    for (var i = 0; i < myPrice.length; i++) {
        totalPrice += myPrice[i];
    }
    var subtotal = totalPrice;
    subtotal = subtotal.toFixed(2);
    var tax = totalPrice * 0.20;
    totalPrice = totalPrice + tax;
    tax = tax.toFixed(2);
    totalPrice = totalPrice.toFixed(2);

    document.getElementById("tax").innerHTML = "TAX     $" + tax;
    document.getElementById("subtotal").innerHTML = "SUBTOTAL     $" + subtotal;
    document.getElementById("total").innerHTML = "TOTAL     $" + totalPrice;

    // reset all drink options
    document.getElementById('drinkName').options.length = 0;
    document.getElementById('drinkSize').options.length = 0;
    //document.getElementById('drinkCategory').value = "";

    document.getElementById('drinkName').style.display = "none";
    document.getElementById('drinkSize').style.display = "none";
    document.getElementById('comboName').style.display = "none";
    document.getElementById('comboSize').style.display = "none";
    document.getElementById("drinkCategory").selectedIndex = -1;
    document.getElementById("comboLabel1").style.display = "none";
    document.getElementById("comboLabel2").style.display = "none";
}


function setArrivalTimes() {
    var timeList = document.getElementById('arrivalTime');
    var today = new Date();
    var totalMinutes = today.getMinutes();
    // if vibe closes at 4:00 pm, then at 16 hours
    //var closingTimeMinutes = 16 * 60;
    // if vibe closes at 6:00 pm, then at 18 hours
    var closingTimeHours = 18;
    var closingTimeMinutes = closingTimeHours * 60;
    var minutesUntilClose = closingTimeMinutes - totalMinutes;


    /*var totalHours = today.getHours();
    document.getElementById("tempP").innerHTML = totalHours;


    var vibeClosed = false;
    if (totalHours > closingTimeHours) {
        vibeClosed = true;
    }*/




    // initialize i as soonest available custom pickup time (i.e. if i=20, 20 minutes from current time)
    // increment i by number of minutes to increment each time selection option (i.e. +=20 shows times available every 20 mins until closing time)
    var index = 0;
    for (let i = 20; i <= minutesUntilClose; i += 20) {

        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + i * 60000);

        var hour = futureDate.getHours();
        var minute = futureDate.getMinutes();
        if (hour > 12) {
            hour = hour - 12;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        var time = hour + ":" + minute;
        timeList.options[index] = new Option(time);
        index++;
    }
}

// enable custom time selection when "custom time" is selected
function customTimeSelected() {
    document.getElementById("arrivalTime").disabled = false;
    document.getElementById("arrivalTimeLabel").style.display = "inline-block";
    document.getElementById("arrivalTime").style.display = "inline-block";
}

// disable custom time selection when "asap" is selected
function asapSelected() {
    document.getElementById("arrivalTime").disabled = true;
    document.getElementById("arrivalTimeLabel").style.display = "none";
    document.getElementById("arrivalTime").style.display = "none";
}




function resetFields(event) {
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    document.getElementById("asap").checked = false;
    document.getElementById("custom").checked = false;
    document.getElementById("arrivalTime").disabled = true;
    document.getElementById("arrivalTimeLabel").style.display = "none";
    document.getElementById("arrivalTime").style.display = "none";
    document.getElementById("curbside").checked = false;
    document.getElementById("walkin").checked = false;
    myCart.length = 0;
    myPrice.length = 0;
    orderDisplay.length = 0;
    document.getElementById("submitOrder").disabled = true;
    document.getElementById("submitOrder").style.display = "none";
    document.getElementById("confirmOrder").style.display = "none";

    document.getElementById("drinkName").disabled = true;
    document.getElementById("drinkName").style.display = "none";
    document.getElementById("drinkSize").disabled = true;
    document.getElementById("drinkSize").style.display = "none";
    document.getElementById("comboName").disabled = true;
    document.getElementById("comboName").style.display = "none";
    document.getElementById("comboSize").disabled = true;
    document.getElementById("comboSize").style.display = "none";
    document.getElementById("comboLabel1").style.display = "none";
    document.getElementById("comboLabel2").style.display = "none";
}






//////////////////////////////////////////////////////////////////////////////////////////
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");

    // display items in order
    //document.getElementById("orderList").innerHTML = "";
    let myList = document.getElementById("orderList");
    myList.innerHTML = "";

    for (var i = 0; i < orderDisplay.length; i++) {
        let li = document.createElement("li");
        li.innerText = orderDisplay[i];
        myList.appendChild(li);
    }

    // calculate order total
    var orderTotal = 0.0;
    var temp = "";
    for (var j = 0; j < myPrice.length; j++) {
        orderTotal += myPrice[j];
        temp += myPrice[j];
    }




    // calculate arrival time
    var time;
    if (document.getElementById("asap").checked == true) {
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + 20 * 60000);
        var hour = futureDate.getHours();
        var minute = futureDate.getMinutes();
        if (hour > 12) {
            hour = hour - 12;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        time = hour + ":" + minute;

    }
    else {
        var selectedTime = document.getElementById("arrivalTime");
        time = selectedTime.options[selectedTime.selectedIndex].text;
    }



    // set arrival message with selected arrival time
    document.getElementById("arrivalMessage").innerHTML = "We will see you at " + time;

    // thank you message with customer name
    var customerName = document.getElementById("name").value;
    var thankYouMessage = "Thank you for your order, " + customerName + "!";
    document.getElementById("thankYou").innerHTML = thankYouMessage;


    // calculate taxes - 20% taxes
    var tax = orderTotal * 0.20;
    var total = orderTotal + tax;

    // set to 2 decimal places
    orderTotal = orderTotal.toFixed(2);
    total = total.toFixed(2);
    tax = tax.toFixed(2);

    // display order totals
    document.getElementById("subTotalMessage").innerHTML = "Subtotal: $" + orderTotal;
    document.getElementById("taxMessage").innerHTML = "Tax: $" + tax;
    document.getElementById("orderTotalMessage").innerHTML = "Total: $" + total;


    // clear all fields ... 
    resetFields();
    clearCart();

    let text = "Thank you for your order! You will receive another confirmation text from Vibe's owners shortly."
    submitOrder(text)
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
//closeButton.addEventListener("click", resetFields);
window.addEventListener("click", windowOnClick);

/*document.getElementById("submitOrder").onclick = () => {


    toggleModal()
    
}*/

    //////////////////////////////////////////////////////////////////////////////////////////
