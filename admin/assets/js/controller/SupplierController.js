SUPPLIER_URL = "http://localhost:9090/api/v1/supplier";

function loadAllSupplier() {

    $('#supplierTBody').empty();
    $.ajax({
        method: 'GET',
        url: SUPPLIER_URL ,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].supplierId;
                let name = response[i].supplierName;
                let email = response[i].supplierEmail;
                let mobile = response[i].supplierTp;
                let company = response[i].company;

                let row = `<tr><td>${id}</td><td>${name}</td><td>${email}</td><td>${mobile}</td><td>${company}</td></tr>`;
                $('#supplierTBody').append(row);

                $('#supplierTBody tr').css({"cursor": "pointer"});
                $('#supplierTBody tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let name = $(this).children('td:eq(1)').text();
                    let email = $(this).children('td:eq(2)').text();
                    let mobile = $(this).children('td:eq(3)').text();
                    let company = $(this).children('td:eq(4)').text();

                    $('#supplierID').val(id);
                    $('#inputSupName').val(name)
                    $('#inputSupMobile').val(mobile);
                    $('#inputSupCompany').val(company);
                    $('#inputSupEmail').val(email);

                });


            }
        }
    });
}

loadAllSupplier();


// save Supplier
$("#saveSupplier").click(function () {

    let name = $("#inputSupName").val();
    let mobile = $("#inputSupMobile").val();
    let email = $("#inputSupEmail").val();
    let company = $("#inputSupCompany").val();

    if (checkSupName() && name != "") {
        if (checkSupEmail() && email != "") {
            if (checkSupMobile() && mobile != "") {
                if (checkCompany() && company != "") {
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
                                url: SUPPLIER_URL ,
                                contentType: "application/json",
                                async: true,
                                data: JSON.stringify(
                                    {

                                        supplierName: name,
                                        supplierTp: mobile,
                                        supplierEmail: email,
                                        company: company,

                                    }
                                ),
                                success: function (data) {
                                    loadAllSupplier();

                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    clearTextFieldsSupplier();

                                }
                            });
                        } else if (result.isDenied) {
                            Swal.fire('Changes are not saved', '', 'info')
                        }
                    });

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Company is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputSupCompany').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mobile is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputSupMobile').css('border', '1px solid #ff6b81');


            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Email is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputSupEmail').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Name is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputSupName').css('border', '1px solid #ff6b81');
    }


});

$('#updateSupplier').click(function () {

    let id = $("#supplierID").val();
    let name = $("#inputSupName").val();
    let mobile = $("#inputSupMobile").val();
    let email = $("#inputSupEmail").val();
    let company = $("#inputSupCompany").val();

    if (id != "") {
        if (checkSupName() && name != "") {
            if (checkSupMobile() && mobile != "") {
                if (checkSupEmail() && email != "") {
                    if (checkCompany() && company != "") {
                        Swal.fire({
                            title: 'Do you want to save the changes?',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: `Save`,
                            denyButtonText: `Don't save`,
                        }).then((result) => {

                            if (result.isConfirmed) {
                                $.ajax({
                                    method: "put",
                                    url: SUPPLIER_URL ,
                                    contentType: "application/json",
                                    async: false,
                                    data: JSON.stringify(
                                        {
                                            supplierId: id,
                                            supplierName: name,
                                            supplierTp: mobile,
                                            supplierEmail: email,
                                            company: company,
                                        }
                                    ),

                                    success: function (data) {
                                        loadAllSupplier();

                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Your work has been saved',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        clearTextFieldsSupplier();

                                    }
                                });
                            } else if (result.isDenied) {
                                Swal.fire('Changes are not saved', '', 'info')
                            }
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Company is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputSupCompany').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputSupEmail').css('border', '1px solid #ff6b81');


                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mobile is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputSupMobile').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Name is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputSupName').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Supplier is not selected!',
            showConfirmButton: false,
            timer: 1000
        });
    }
});


//delete
$('#delSupplier').click(function () {
    let id = $("#empID").val();

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
                    url: 'http://localhost:9090/api/v1/Supplier/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllSupplier();
                        clearTextFieldsSupplier();
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
            title: 'Supplier is  not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});

//clear all
$('#clearSupplier').click(function () {
    clearTextFieldsSupplier();
});


// validation


// Listner for name

$('#inputSupName').on('keyup', function (event) {
    checkSupName();
});

function checkSupName() {
    if (/^[A-z ]{1,}$/.test($('#inputSupName').val())) {
        $('#inputSupName').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupName').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check mobile
$('#inputSupMobile').on('keyup', function (event) {
    checkSupMobile();
});

function checkSupMobile() {
    if (/^[0-9]{10}$/.test($('#inputSupMobile').val())) {
        $('#inputSupMobile').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupMobile').css('border', '1px solid #ff6b81');
    }
    return false;
}


//check address
$('#inputSupCompany').on('keyup', function (event) {
    checkCompany();
});

function checkCompany() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#inputSupCompany').val())) {
        $('#inputSupCompany').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupCompany').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check email
$('#inputSupEmail').on('keyup', function (event) {
    checkSupEmail();
});

function checkSupEmail() {
    if (/^[A-z, |0-9]{1,}(@gmail.com)$/.test($('#inputSupEmail').val())) {
        $('#inputSupEmail').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupEmail').css('border', '1px solid #ff6b81');
    }
    return false;
}


//get all click
$("#getAllSupplier").click(function () {
    loadAllSupplier();
});


function clearTextFieldsSupplier() {
    $('#supplierID').val("");
    $('#inputSupName').val("");
    $('#inputSupMobile').val("");
    $('#inputSupEmail').val("");
    $('#inputSupCompany').val("");

    $('#inputSupName').css('border', '1px solid #ccc');
    $('#inputSupMobile').css('border', '1px solid #ccc');
    $('#inputSupEmail').css('border', '1px solid #ccc');
    $('#inputSupCompany').css('border', '1px solid #ccc');
}
