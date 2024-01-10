FLOCK_URL = "http://localhost:9090/api/v1/batch";

const loadAllSupplierInBird = () => {

    $.ajax({
        url: SUPPLIER_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data
            let dropdown = $("#selectSupplierInBird");
            dropdown.empty();
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.supplierId} data-name=${item.supplierName} >${item.supplierName}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllSupplierInBird();

const loadAllCageInBird = () => {
    $.ajax({
        url: "http://localhost:9090/api/v1/cage",
        method: 'GET',
        success: function (response) {

            const data = response.data

            let dropdown = $("#selectCageInBird");
            dropdown.empty();
            let birdCount=$('#inputBQty').val();

            $.each(data, function (index, item) {
                if(item.availableQty === 0 && birdCount<=item.maxQty){
                    dropdown.append(`<option value=${item.cageId} data-max=${item.maxQty}>${item.cageId}</option>`);
                }
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllCageInBird();

//this function use for get date of batch layer,grower and cull dates
function getDateForState(date, weeksToAdd) {
    let newDate = new Date(date);
    let dateWithOffset = new Date(newDate.getTime() + (weeksToAdd * 7 * 24 * 60 * 60 * 1000));
    if (date !== "") {
        return dateWithOffset.toISOString().substring(0, 10);

    }
}

function clearTextFieldsBirdPurchase() {
    $('#birdPurchaseId').val("");
    $('#inputBQty').val("");
    $('#inputBUnitPrice').val("");
    $('#selectCageInBird').val("");
    $('#birdPurchaseDate').val("");
    $('#selectSupplierInBird').val("");
    $('#inputBirdPurchseRemark').val("");

    $('#birdPurchaseId').css('border', '1px solid #ccc');
    $('#inputBQty').css('border', '1px solid #ccc');
    $('#inputBUnitPrice').css('border', '1px solid #ccc');
    $('#selectCageInBird').css('border', '1px solid #ccc');
    $('#birdPurchaseDate').css('border', '1px solid #ccc');
    $('#selectSupplierInBird').css('border', '1px solid #ccc');
}

function loadAllBirdPurchase() {

    $('#batchPurchaseTBody').empty();
    $.ajax({
        method: 'GET',
        url: FLOCK_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {
                let batchId = response[i].batchId;
                let no_of_birds = response[i].no_of_birds;
                let remaining_birds = response[i].remaining_birds;
                let chickPrice = response[i].chickPrice;
                let remark = response[i].remark;
                let status = response[i].status;
                let to_grower = response[i].to_grower;
                let to_layer = response[i].to_layer;
                let to_cull = response[i].to_cull;
                let purchaseDate = response[i].purchaseDate;
                let cageId = response[i].cageId;
                let supplierId = response[i].supplierId;

                let row = `<tr><td>${batchId}</td><td>${no_of_birds}</td><td>${remaining_birds}</td><td>${chickPrice}</td><td>${remark}</td><td>${status}</td>
                <td>${to_grower}</td><td>${to_layer}</td><td>${to_cull}</td><td>${purchaseDate}</td><td>${cageId}</td><td>${supplierId}</td></tr>`;
                $('#batchPurchaseTBody').append(row);

                $('#batchPurchaseTBody tr').css({"cursor": "pointer"});
                $('#batchPurchaseTBody tr').click(function () {

                    batchId = $(this).children('td:eq(0)').text();
                    no_of_birds = $(this).children('td:eq(1)').text();
                    chickPrice = $(this).children('td:eq(3)').text();
                    remark = $(this).children('td:eq(4)').text();
                    purchaseDate = $(this).children('td:eq(9)').text();
                    cageId = $(this).children('td:eq(10)').text();
                    supplierId = $(this).children('td:eq(11)').text();

                    $('#birdPurchaseId').val(batchId);
                    $('#inputBQty').val(no_of_birds)
                    $('#inputBUnitPrice').val(chickPrice);
                    $('#selectCageInBird').val(cageId);
                    $('#birdPurchaseDate').val(purchaseDate);
                    $('#selectSupplierInBird').val(supplierId);
                    $('#inputBirdPurchseRemark').val(remark);

                });


            }
        }
    });
}

loadAllBirdPurchase();
clearTextFieldsBirdPurchase();


$("#selectCageInBird").change(function () {
    let max=$("#selectCageInBird option:selected").data("max");
    $("#inputMaxQty").val(max);
});

// purchase flock

function checkChickQty() {
    let noOfChick = $("#inputBQty").val();
    let max = $("#inputMaxQty").val();

    if(noOfChick>max){
        return false;
    }else{
        return true;
    }
}

$("#purchaseBatch").click(function () {

    let supplier = $("#selectSupplierInBird").val();
    let noOfChick = $("#inputBQty").val();
    let unitP = $("#inputBUnitPrice").val();
    let cage = $("#selectCageInBird").val();
    let date = $("#birdPurchaseDate").val();
    let remark = $("#inputBirdPurchseRemark").val();

    if (checkNoOfChick() && noOfChick !== "" && noOfChick>0) {
        if (checkBUnitPrice() && unitP !== "") {
            if (cage !== "" && cage !== 0 && cage != null) {
                if (supplier !== "" && supplier !== 0 && supplier != null) {
                    if (date !== "") {
                        if (checkChickQty()) {
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
                                            status: "IN",
                                            remark: remark !== "" ? remark :"New batch added!",
                                            no_of_birds: noOfChick,
                                            chickPrice:unitP,
                                            purchaseDate:date,
                                            remaining_birds: noOfChick,
                                            to_layer: getDateForState(date, 19),
                                            to_grower: getDateForState(date, 7),
                                            to_cull: getDateForState(date, 102),
                                            created_at: date,
                                            updated_at: date,
                                            cageId: cage,
                                            supplierId:supplier
                                        }
                                    ),
                                    success: function (data) {
                                        loadAllBirdPurchase();
                                        loadAllCageInBird();
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
                                title: 'No of chicks is more than max chickens in a selected cage!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $('#birdPurchaseDate').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Date is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#birdPurchaseDate').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Supplier is not selected!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#selectSupplierInBird').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Cage is not selected!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#selectCageInBird').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Chick price is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputBUnitPrice').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No of chick is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputBQty').css('border', '1px solid #ff6b81');
    }


});

$('#updateBatch').click(function () {

    let id = $("#birdPurchaseId").val();
    let supplier = $("#selectSupplierInBird").val();
    let noOfChick = $("#inputBQty").val();
    let unitP = $("#inputBUnitPrice").val();
    let cage = $("#selectCageInBird").val();
    let date = $("#birdPurchaseDate").val();
    let remark = $("#inputBirdPurchseRemark").val();

    if (id != "") {
        if (checkNoOfChick() && noOfChick !== "") {
            if (checkBUnitPrice() && unitP !== "") {
                if (cage !== "" && cage !== 0 && cage != null) {
                    if (supplier !== "" && supplier !== 0 && supplier != null) {
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
                            url: FLOCK_URL ,
                            contentType: "application/json",
                            async: true,
                            data: JSON.stringify(
                                {
                                    batchId:id,
                                    status: "IN",
                                    remark: remark !== "" ? remark :"New batch added!",
                                    no_of_birds: noOfChick,
                                    chickPrice:unitP,
                                    purchaseDate:date,
                                    remaining_birds: noOfChick,
                                    to_layer: getDateForState(date, 19),
                                    to_grower: getDateForState(date, 7),
                                    to_cull: getDateForState(date, 102),
                                    created_at: date,
                                    updated_at: date,
                                    cageId: cage,
                                    supplierId:supplier
                                }
                            ),
                            success: function (data) {
                                loadAllBirdPurchase();
                                loadAllCageInBird();
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
                            $('#birdPurchaseDate').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Supplier is not selected!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#selectSupplierInBird').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cage is not selected!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#selectCageInBird').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Chick price is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputBUnitPrice').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No of chick is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputBQty').css('border', '1px solid #ff6b81');
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Batch is not selected!',
            showConfirmButton: false,
            timer: 1000
        });
    }

});


//delete
$('#delBatch').click(function () {
    let id = $("#birdPurchaseId").val();

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
                    url: 'http://localhost:9090/api/v1/batch/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllBirdPurchase();
                        clearTextFieldsBirdPurchase();
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



//clear all
$('#clearBatch').click(function () {
    clearTextFieldsBirdPurchase();
});


//Listeners and validation fields
$('#inputBQty').on('keyup', function (event) {
    checkNoOfChick();
    // loadAllCageInBird();
});

function checkNoOfChick() {
    if (/^[0-9 ]{1,}$/.test($('#inputBQty').val())) {
        $('#inputBQty').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputBQty').css('border', '1px solid #ff6b81');
    }
    return false;
}

$('#inputBUnitPrice').on('keyup', function (event) {
    checkBUnitPrice();
});

function checkBUnitPrice() {
    if (/^[0-9.]{1,}$/.test($('#inputBUnitPrice').val())) {
        $('#inputBUnitPrice').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputBUnitPrice').css('border', '1px solid #ff6b81');
    }
    return false;

}
