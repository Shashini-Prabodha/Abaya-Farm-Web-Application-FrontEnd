
FEED_URL = "http://localhost:9090/api/v1/feed";
FEEDORDERDETAIL_URL = "http://localhost:9090/api/v1/feedOrderDetail";
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
                dropdown.append(`<option value=${item.id} >${item.type} - ${item.sackSize}</option>`);
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
                                    url: FEEDORDERDETAIL_URL,
                                    contentType: "application/json",
                                    async: true,
                                    data: JSON.stringify(
                                        {

                                            quantity: qty,
                                            unitPrice: unitP,
                                            orderDateTime: date,
                                            feedId: type,
                                            supplierId: supplier
                                        }
                                    ),
                                    success: function (data) {
                                        loadAllFeedPurchase();

                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Your work has been saved',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        clearTextFieldsFeedPurchase();

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

//update purchase feed
$("#updateFeedPurchase").click(function () {

    let id = $("#feedPurchaseId").val();
    let supplier = $("#feedSupplierName").val();
    let qty = $("#feedQty").val();
    let unitP = $("#inputUnitPriceFeed").val();
    let type = $("#cmbFeedType").val();
    let date = $("#feedPurchaseDate").val();

    if (id !== "" && id !== 0 && id != null) {
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
                                        method: "put",
                                        url: FEEDORDERDETAIL_URL,
                                        contentType: "application/json",
                                        async: true,
                                        data: JSON.stringify(
                                            {
                                                id: id,
                                                quantity: qty,
                                                unitPrice: unitP,
                                                orderDateTime: date,
                                                feedId: type,
                                                supplierId: supplier
                                            }
                                        ),
                                        success: function (data) {
                                            loadAllFeedPurchase();

                                            Swal.fire({

                                                icon: 'success',
                                                title: 'Your work has been saved',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            clearTextFieldsFeedPurchase();

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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Feed purchase detail is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
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

function loadAllFeedPurchase() {

    $('#feedPurchaseTBody').empty();
    $.ajax({
        method: 'GET',
        url: FEEDORDERDETAIL_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let qty = response[i].quantity;
                let uPrice = response[i].unitPrice;
                let date = response[i].orderDateTime;
                let supplierId = response[i].supplierId;
                let feedId = response[i].feedId;

                let row = `<tr><td>${id}</td><td>${qty}</td><td>${uPrice}</td><td>${supplierId}</td><td>${feedId}</td><td>${date}</td></tr>`;
                $('#feedPurchaseTBody').append(row);

                $('#feedPurchaseTBody tr').css({"cursor": "pointer"});
                $('#feedPurchaseTBody tr').click(function () {

                    id = $(this).children('td:eq(0)').text();
                    qty = $(this).children('td:eq(1)').text();
                    uPrice = $(this).children('td:eq(2)').text();
                    supplierId = $(this).children('td:eq(3)').text();
                    feedId = $(this).children('td:eq(4)').text();
                    date = $(this).children('td:eq(5)').text();

                    $('#feedPurchaseId').val(id);
                    $('#feedQty').val(qty);
                    $('#inputUnitPriceFeed').val(uPrice);
                    $('#feedSupplierName').val(supplierId);
                    $('#feedPurchaseDate').val(date);
                    $('#cmbFeedType').val(feedId);

                });

            }
        }
    });
}

loadAllFeedPurchase();

//delete
$('#delFeedPurchase').click(function () {
    let id = $("#feedPurchaseId").val();

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
                    url: 'http://localhost:9090/api/v1/feedOrderDetail/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllFeedPurchase();
                        clearTextFieldsFeedPurchase();
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
            title: 'Cage is not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});

$('#getAllFeedPurchase').click(function () {
    loadAllFeedPurchase();
});


// ------Feed Consumption---------------

const loadAllCageInFeedConsumption = () => {
    $.ajax({
        url: CAGE_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data

            let dropdown = $("#feedConsCageID");
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.cageId} >${item.cageId}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllCageInFeedConsumption();

$("#feedConsCageID").change(function () {
    let cage = $("#feedConsCageID").val();
    $.ajax({
        url: 'http://localhost:9090/api/v1/batch/findCageByBatch/' + cage,
        method: 'GET',
        success: function (response) {

            const data = response.data

            $("#feedConsBatchID").val(data.batchId);
            $("#noOfBirdFC").val(data.remaining_birds);
            $("#batchTypeInFeed").val(getBirdType(data.to_layer, data.to_grower));

        },
        error: function (response) {
            console.error(response.data)
        }
    });
});

function getBirdType(to_layer, to_grower) {
    let type = "Chick";
    if (to_grower >= getCurrentDateTime()) {
        type = "Chick";
    } else if (to_layer >= getCurrentDateTime()) {
        type = "Grower";
    } else {
        type = "Layer";
    }
    return type;
}

const loadAllFeedTypeInCon = () => {

    $.ajax({
        url: FEED_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data
            let dropdown = $("#cmbTypeF");
            dropdown.empty();
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.id} data-stock="${item.stockQty}">${item.type}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllFeedTypeInCon();

$("#cmbTypeF").change(function () {

    let type = $("#cmbTypeF option:selected").data("stock");
    $("#avlbFStock").val(type);

    let birds = $("#noOfBirdFC").val();
    $("#approxFC").val(approxFeed(birds, type));
    $("#usedFeed").val(approxFeed(birds, type));
});


function approxFeed(birdQty, feedType) {
    let qty;
    if (feedType === "Chick") {
        qty = 0.04;
    } else if (feedType === "Grower") {
        qty = 0.05;
    } else {
        qty = 0.06;
    }
    return qty * birdQty;
}

$("#updateFeedC").click(function () {

    let date = getCurrentDateTime();
    let batch = $("#feedConsBatchID").val();
    let feedType = $("#cmbTypeF").val();
    let usedFeed = $("#usedFeed").val();

    if (batch !== "" && batch !== 0 && batch != null) {
        if (feedType !== "" && feedType !== 0 && feedType != null) {
            if (usedFeed !== "" && usedFeed != null && usedFeed > 0) {
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
                                url: FEEDDETAIL_URL,
                                contentType: "application/json",
                                async: true,
                                data: JSON.stringify(
                                    {
                                        batchId: batch,
                                        feeding_qty: usedFeed,
                                        feeding_dateTime: date,
                                        feedId: feedType,

                                    }
                                ),
                                success: function (data) {
                                    loadAllFeedPurchase();

                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    clearTextFieldsFeedPurchase();

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
                title: 'Feed Type is not selected!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#cmbFeedType').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cage is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#feedConsCageID').css('border', '1px solid #ff6b81');
    }


});


function loadAllFeedConsumption() {

    $('#feedConsumptionTBody').empty();
    $.ajax({
        method: 'GET',
        url: FEEDDETAIL_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let feeding_qty = response[i].feeding_qty;
                let feeding_dateTime = response[i].feeding_dateTime;
                let batchId = response[i].batchId;
                let feedId = response[i].feedId;

                let row = `<tr><td>${id}</td><td>${feeding_qty}</td><td>${feeding_dateTime}</td><td>${batchId}</td><td>${feedId}</td></tr>`;
                $('#feedConsumptionTBody').append(row);

                /*   $('#feedConsumptionTBody tr').css({"cursor": "pointer"});
                   $('#feedConsumptionTBody tr').click(function () {

                       id = $(this).children('td:eq(0)').text();
                       feeding_qty = $(this).children('td:eq(1)').text();
                       feeding_dateTime = $(this).children('td:eq(2)').text();
                       batchId = $(this).children('td:eq(3)').text();
                       feedId = $(this).children('td:eq(4)').text();

                       $('#feedQty').val(feeding_qty);
                       $('#inputUnitPriceFeed').val(feeding_dateTime);
                       $('#feedSupplierName').val(batchId);
                       $('#feedPurchaseDate').val(feedId);

                   });*/

            }
        }
    });
}

loadAllFeedConsumption();


$("#getAllFeedConsDetails").click(function () {
    loadAllFeedConsumption()
});


// -------------------Feed Stock Summary------------------

function loadBarChart() {
    $.ajax({
        method: 'GET',
        url: FEED_URL,
        dataType: 'json',
        async: true,
        success: function (response) {
            let resp = response.data;
            let labelArr = [];
            let labelData = [];
            $.each(resp, function (index, item) {
                labelArr.push(item.type);
                labelData.push(item.stockQty);
            });

            new Chart(document.querySelector('#barChart'), {
                type: 'bar',
                data: {
                    labels: labelArr,
                    datasets: [{
                        label: 'kg',
                        data: labelData,
                        backgroundColor: "rgba(157,96,248,0.62)"
                    }]
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error loading chart data: " + errorThrown);
        }
    });
}

loadBarChart();


function loadDailyFeedUsage() {
    let batchArr = [];
    $.ajax({
        method: 'GET',
        url: FLOCK_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let status = response[i].status;

                if (status === "IN") {
                    batchArr.push(response[i])
                }
            }
            let data=[] ;
            data= calcDailyFeedUsage(batchArr);


            new Chart(document.querySelector('#polarAreaChart'), {
                type: 'polarArea',
                data: {
                    labels: [
                        'Chick',
                        'Grower',
                        'Layer'
                    ],
                    datasets: [{
                        label: 'kg',
                        data:data,
                        backgroundColor: [
                            'rgb(255,63,130)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',


                        ]
                    }]
                }
            });
            let dates=[];
            chickDates=0;
            growerDates=0;
            layerDates=0;
            $.ajax({
                method: 'GET',
                url: FEED_URL,
                dataType: 'json',
                async: true,
                success: function (resp) {
                    let response = resp.data;


                    for (let i in response) {
                        let type = response[i].type;
                        let stock = response[i].stockQty;

                        if (type === "Chick") {
                            chickDates=stock/data[0];
                        }else if (type === "Grower") {
                            growerDates=stock/data[1];

                        }else{
                            layerDates=stock/data[2];

                        }

                    }
                    console.log(chickDates+ " - "+growerDates+" - "+layerDates);

                    dates.push(Math.round(chickDates));
                    dates.push(Math.round(growerDates));
                    dates.push(Math.round(layerDates));

                    new ApexCharts(document.querySelector("#stockDays"), {
                        series: [{
                            data: dates,

                        }],
                        chart: {
                            type: 'bar',
                            height: 300,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                dataLabels: {
                                    position: 'top',
                                },
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            offsetX: -6,
                            style: {
                                fontSize: '12px',
                                colors: ['#fff']
                            }
                        },
                        stroke: {
                            show: true,
                            width: 1,
                            colors: ['#fff']
                        },
                        tooltip: {

                            shared: true,
                            intersect: false
                        },
                        xaxis: {
                            categories: ['Chick', 'Grower', 'Layer'],
                        }

                    }).render();

                }
            });



        }
    });
}

loadDailyFeedUsage();

function calcDailyFeedUsage(batchArr) {
    let chickStock = 0;
    let growerStock = 0;
    let layerStock = 0;

    for (let i in batchArr) {

        let growerDate = batchArr[i].to_grower;
        let layerDate = batchArr[i].to_layer;

        if (growerDate > getCurrentDateTime()) {
            chickStock = chickStock + approxFeed(batchArr[i].remaining_birds, "Chick");

        } else if (layerDate > getCurrentDateTime()) {
            growerStock = growerStock + approxFeed(batchArr[i].remaining_birds, "Grower");

        } else {
            layerStock = layerStock + approxFeed(batchArr[i].remaining_birds, "Layer");
        }

    }
    let data = [];
    data.push(chickStock);
    data.push(growerStock);
    data.push(layerStock);
    return data;
}
