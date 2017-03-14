$(document).ready(function onBrowserReady() {

    $("#cartButton").click(function onClickCartButton() {
        $("#productos").hide();
        $("#compra").show();
    });


    $("#backButton").click(function onClickBackButton() {
        $("#productos").show();
        $("#compra").hide();
    });


    $("#comprarButton").click(function onClickComprarButton() {
        alert("Compra finalizada");

    });


    var idAdded = [];
    var cartProducts = [];



    function removeItem(cartItem, index) {
        cartProducts.splice(index, 1);
        $(cartItem).remove();

        $("#cartBadge").text(cartProducts.length);
    }

    function existProductInCart(idProduct) {
        if (cartProducts.length == 0) {
            return false;
        }

        var exist = false;
        var i = 0;

        while (!exist && i < cartProducts.length) {
            if (cartProducts[i].idProduct == idProduct) {
                exist = true;
            }
            i++;
        }


        return exist;
    }

    function findProductInCart(idProduct) {
        var isFound = false;
        var product;
        var i = 0;
        while (!isFound && i < cartProducts.length) {
            if (cartProducts[i].idProduct == idProduct) {
                product = cartProducts[i];
                isFound = true;
            }
            i++;
        }
        return product;
    }

    function findProductIndex(idProduct) {
        var isFound = false;
        var index;
        var i = 0;
        while (!isFound && i < cartProducts.length) {
            if (cartProducts[i].idProduct == idProduct) {
                index = i;
                isFound = true;
            }
            i++;
        }
        return index;
    }

    function getTotalCart() {
        var total = 0;
        for (var i = 0; i < cartProducts.length; i++) {
            total += cartProducts[i].getTotalPrice();
        }
        return total.toFixed(2);
    }

    $(".addButton").click(function onAddButton(e) {
        var productItem = $(e.currentTarget).parent("th").parent("tr");

        var idProduct = productItem.attr("data-id");
        var name = productItem.find(".productName").text();
        var price = productItem.find(".price").text();
        var image = productItem.find("img").attr("src");

        if (!existProductInCart(idProduct)) {
            var product = {
                idProduct: idProduct,
                name: name,
                price: price,
                image: image,
                quantity: 1,
                getTotalPrice: function () {
                    var preu = this.price.replace("€", "");
                    preu = preu.replace(",", ".");

                    return parseFloat(preu * this.quantity);
                }
            };
            cartProducts.push(product);

            $("#cartBadge").text(cartProducts.length);

            var cartItem = $("#cartItemTemplate").clone();
            cartItem.attr("id", idProduct);
            cartItem.show();
            $("#compraBody").append(cartItem);

            $(cartItem).find("img").attr("src", image);
            $(cartItem).find(".name").text(name);
            $(cartItem).find(".price").text(price);
            $(cartItem).find(".total").text(price);

        } else {
            console.log("ja existeix");
        }


        $("#noProduct").hide();

        $("#totalCompra").text(getTotalCart() + "€");

        $(cartItem).find(".cantidad").on('keyup change click', function (e) {
            var product = findProductInCart(idProduct);
            product.quantity = e.currentTarget.value;
            $(cartItem).find(".total").text(product.getTotalPrice().toFixed(2) + "€");
            $("#totalCompra").text(getTotalCart() + "€");
        });

        $(cartItem).find(".removeButton").click(function () {
            var index = findProductIndex(idProduct);
            removeItem(cartItem, index);
            $("#totalCompra").text(getTotalCart() + "€");
        });

    });

});







