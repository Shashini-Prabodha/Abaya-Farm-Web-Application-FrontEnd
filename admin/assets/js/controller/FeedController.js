FEED_URL = "http://localhost:9090/api/v1/feed";
FEEDDETAIL_URL = "http://localhost:9090/api/v1/feedDetails";

function loadAllFeedType() {

    $('#feedTypeTBody').empty();
    $.ajax({
        method: 'GET',
        url: FEED_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let type = response[i].type;
                let size = response[i].sackSize;
                let stock = response[i].stockQty;

                let row = `<tr><td>${id}</td><td>${type}</td><td>${size}</td><td>${stock}</td></tr>`;
                $('#feedTypeTBody').append(row);

                $('#feedTypeTBody tr').css({"cursor": "pointer"});
                $('#feedTypeTBody tr').click(function () {

                    id = $(this).children('td:eq(0)').text();
                    type = $(this).children('td:eq(1)').text();
                    size = $(this).children('td:eq(2)').text();
                    stock = $(this).children('td:eq(3)').text();

                    $('#inputFeedType').val(type);
                    $('#cmbPckSize').val(size)
                    $('#inputFeedID').val(id);

                });

            }
        }
    });
}

loadAllFeedType();

function clearTextFieldsFeedType() {
    $('#inputFeedID').val("");
    $('#inputFeedType').val("");
    $('#cmbPckSize').val("")

    $('#inputFeedID').css('border', '1px solid #ccc');
    $('#inputFeedType').css('border', '1px solid #ccc');
    $('#cmbPckSize').css('border', '1px solid #ccc');

}

// save feed type
$("#saveFeedType").click(function () {

    let type = $('#inputFeedType').val();
    let size = $('#cmbPckSize').val()

    if (type != "") {
        if (size != "" && size != 0 && size != null) {

            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    $.ajax({
                        method: "post",
                        url: FEED_URL,
                        contentType: "application/json",
                        async: true,
                        data: JSON.stringify(
                            {
                                type: type,
                                sackSize: size,
                                stockQty: 0,
                            }
                        ),
                        success: function (data) {
                            loadAllFeedType();
                            loadAllFeedTypeCmb();

                            Swal.fire({

                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            clearTextFieldsFeedType();

                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Packet Size is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#cmbPckSize').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Feed type is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputFeedType').css('border', '1px solid #ff6b81');
    }


});

$('#updateFeedType').click(function () {

    let id = $("#inputFeedID").val();
    let type = $('#inputFeedType').val();
    let size = $('#cmbPckSize').val()

    if (id != "") {
        if (type != "") {
            if (size != "" && size != 0 && size != null) {

                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {

                        $.ajax({
                            method: "put",
                            url: FEED_URL,
                            contentType: "application/json",
                            async: true,
                            data: JSON.stringify(
                                {
                                    id: id,
                                    type: type,
                                    sackSize: size,
                                    stockQty: 0,
                                }
                            ),
                            success: function (data) {
                                loadAllFeedType();
                                loadAllFeedTypeCmb();

                                Swal.fire({

                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                clearTextFieldsFeedType();

                            }
                        });
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Packet Size is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputFeedID').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Feed type is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputFeedType').css('border', '1px solid #ff6b81');
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Feed Type is not selected!',
            showConfirmButton: false,
            timer: 1000
        });
    }

});

//delete
$('#delFeedType').click(function () {
    let id = $("#inputFeedID").val();

    if (id != "") {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    method: "delete",
                    url: 'http://localhost:9090/api/v1/feed/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllFeedType();
                        loadAllFeedTypeCmb();

                        clearTextFieldsFeedType();
                        Swal.fire(
                            'Deleted!',
                            'Delete Successfully...',
                            'success'
                        )
                    },
                    error: function (response) {
                        Swal.fire(
                            'Deleted!',
                            'Cannot Found this ID',
                            'error'
                        )
                    }
                });
            }

        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Feed Type is not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});
//clear all
$('#clearFeedType').click(function () {
    clearTextFieldsFeedType();
});

$('#getAllFeedType').click(function () {
    loadAllFeedType();
});


// --------------------Feed Purchase -----------------------

const loadAllFeedTypeCmb = () => {
    $("#cmbFeedType").empty();

    $.ajax({
        url: FEED_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data
            let dropdown = $("#cmbFeedType");
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.feedId} >${item.type} - ${item.sackSize}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}
loadAllFeedTypeCmb();

const loadAllSupplierInFeed = () => {

    $.ajax({
        url: SUPPLIER_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data
            let dropdown = $("#feedSupplierName");
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.supplierId} data-name=${item.supplierName} >${item.supplierName}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllSupplierInFeed();


//clear all
$('#clearFeedPurchase').click(function () {
    clearTextFieldsFeedPurchase();
});


//Listeners and validation fields
$('#feedQty').on('keyup', function (event) {
    checkFeedQty();
});

function checkFeedQty() {
    if (/^[0-9 ]{1,}$/.test($('#feedQty').val())) {
        $('#feedQty').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#feedQty').css('border', '1px solid #ff6b81');
    }
    return false;
}

$('#inputUnitPriceFeed').on('keyup', function (event) {
    checkFUnitPrice();
});

function checkFUnitPrice() {
    if (/^[0-9.]{1,}$/.test($('#inputUnitPriceFeed').val())) {
        $('#inputUnitPriceFeed').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputUnitPriceFeed').css('border', '1px solid #ff6b81');
    }
    return false;

}


// purchase feed
$("#purchaseFeed").click(function () {

    let supplier = $("#feedSupplierName").val();
    let qty = $("#feedQty").val();
    let unitP = $("#inputUnitPriceFeed").val();
    let type = $("#cmbFeedType").val();
    let date = $("#feedPurchaseDate").val();

    if (type !== "" && type !== 0 && type != null) {
        if (supplier !== "" && supplier !== 0 && supplier != null) {
            if (checkFUnitPrice() && unitP !== "") {
                if (checkFeedQty() && qty != null && qty > 0) {
                    if (date !== "") {
                        Swal.fire({
                            title: 'Do you want to save the changes?',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: `Save`,
                            denyButtonText: `Don't save`,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {

                                $.ajax({
                                    method: "post",
                                    url: FLOCK_URL,
                                    contentType: "application/json",
                                    async: true,
                                    data: JSON.stringify(
                                        {

                                        }
                                    ),
                                    success: function (data) {
                                        loadAllBirdPurchase();

                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Your work has been saved',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        clearTextFieldsBirdPurchase();

                                    }
                                });
                            } else if (result.isDenied) {
                                Swal.fire('Changes are not saved', '', 'info')
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Date is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#feedPurchaseDate').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Quantity is not selected!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#feedQty').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Unit Price is not selected!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputUnitPriceFeed').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Supplier is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#feedSupplierName').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Feed type is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#cmbFeedType').css('border', '1px solid #ff6b81');
    }


});

function clearTextFieldsFeedPurchase() {
    $('#feedPurchaseId').val("");
    $('#feedQty').val("");
    $('#inputUnitPriceFeed').val("");
    $('#feedSupplierName').val("");
    $('#feedPurchaseDate').val("");
    $('#cmbFeedType').val("");

    $('#feedPurchaseId').css('border', '1px solid #ccc');
    $('#feedQty').css('border', '1px solid #ccc');
    $('#inputUnitPriceFeed').css('border', '1px solid #ccc');
    $('#feedSupplierName').css('border', '1px solid #ccc');
    $('#feedPurchaseDate').css('border', '1px solid #ccc');
    $('#cmbFeedType').css('border', '1px solid #ccc');
}
