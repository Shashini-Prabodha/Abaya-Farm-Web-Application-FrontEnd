CAGE_URL = "http://localhost:9090/api/v1/cage";

function loadAllCage() {

    $('#cageTBody').empty();
    $.ajax({
        method: 'GET',
        url: CAGE_URL ,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].cageId;
                let max = response[i].maxQty;
                let avlb = response[i].availableQty;

                let row = `<tr><td>${id}</td><td>${max}</td><td>${avlb}</td></tr>`;
                $('#cageTBody').append(row);

                $('#cageTBody tr').css({"cursor": "pointer"});
                $('#cageTBody tr').click(function () {

                    let cid = $(this).children('td:eq(0)').text();
                    let maxB = $(this).children('td:eq(1)').text();
                    let avlbB = $(this).children('td:eq(2)').text();

                    $('#cageID').val(cid);
                    $('#inputMaxBQty').val(maxB)
                    $('#inputAvlNoOfBird').val(avlbB);

                });


            }
        }
    });
}

loadAllCage();


// save Cage
$("#saveCage").click(function () {

    let max = $("#inputMaxBQty").val();
    let avlb = $("#inputAvlNoOfBird").val();

    if (checkMaxBirdQty() && max != "") {
        if (checkAvailbeBirdQty() && avlb != "") {

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
                                url: CAGE_URL ,
                                contentType: "application/json",
                                async: true,
                                data: JSON.stringify(
                                    {

                                        maxQty: max,
                                        availableQty: avlb,
                                    }
                                ),
                                success: function (data) {
                                    loadAllCage();

                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    clearTextFieldsCage();

                                }
                            });
                        } else if (result.isDenied) {
                            Swal.fire('Changes are not saved', '', 'info')
                        }
                    });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Available Bird count is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputAvlNoOfBird').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Maximum Bird count is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputMaxBQty').css('border', '1px solid #ff6b81');
    }


});


$('#updateCage').click(function () {

    let id = $("#cageID").val();
    let max = $("#inputMaxBQty").val();
    let avlb = $("#inputAvlNoOfBird").val();

    if (id != "") {
    if (checkMaxBirdQty() && max != "") {
        if (checkAvailbeBirdQty() && avlb != "") {

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
                        url: CAGE_URL ,
                        contentType: "application/json",
                        async: true,
                        data: JSON.stringify(
                            {
                                cageId:id,
                                maxQty: max,
                                availableQty: avlb,
                            }
                        ),
                        success: function (data) {
                            loadAllCage();

                            Swal.fire({

                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            clearTextFieldsCage();

                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Available Bird count is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputAvlNoOfBird').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Maximum Bird count is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputMaxBQty').css('border', '1px solid #ff6b81');
    }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cage is not selected!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputMaxBQty').css('border', '1px solid #ff6b81');
    }

});


//delete
$('#delCage').click(function () {
    let id = $("#cageID").val();

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
                    url: 'http://localhost:9090/api/v1/cage/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllCage();
                        clearTextFieldsCage();
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
$('#clearCage').click(function () {
    clearTextFieldsCage();
});



// Listner for name

//check max bird count
$('#inputMaxBQty').on('keyup', function (event) {
    checkMaxBirdQty();
});

function checkMaxBirdQty() {
    if (/^[0-9]{1,}$/.test($('#inputMaxBQty').val())) {
        $('#inputMaxBQty').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputMaxBQty').css('border', '1px solid #ff6b81');
    }
    return false;
}


//check availble bird count
$('#inputAvlNoOfBird').on('keyup', function (event) {
    checkAvailbeBirdQty();
});

function checkAvailbeBirdQty() {
    if (/^[0-9]{1,}$/.test($('#inputAvlNoOfBird').val())) {
        $('#inputAvlNoOfBird').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputAvlNoOfBird').css('border', '1px solid #ff6b81');
    }
    return false;
}



//get all click
$("#getAllCage").click(function () {
    loadAllCage();
});


function clearTextFieldsCage() {
    $('#cageID').val("");
    $('#inputMaxBQty').val("");
    $('#inputAvlNoOfBird').val("");

    $('#inputMaxBQty').css('border', '1px solid #ccc');
    $('#inputAvlNoOfBird').css('border', '1px solid #ccc');
}
