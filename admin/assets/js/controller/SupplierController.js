URL = "http://localhost:9090/api/v1/supplier";

function loadAllSupplier() {


    $('#empTBody').empty();
    $.ajax({
        method: 'GET',
        url: URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let name = response[i].name;
                let email = response[i].email;
                let mobile = response[i].mobile;
                let company = response[i].company;


                let row = `<tr><td>${id}</td><td>${nic}</td><td>${name}</td><td>${mobile}</td><td>${address}</td><td>${email}</td><td>${role}</td><td>  <button type="button" class="btn " data-bs-toggle="modal"
                                                data-bs-target="#editCustomerModal"><i class="bi bi-pencil-square"></i>
                                        </button></td></tr>`;
                $('#empTBody').append(row);

                $('#empTBody tr').css({"cursor": "pointer"});
                $('#empTBody tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let nic = $(this).children('td:eq(1)').text();
                    let name = $(this).children('td:eq(2)').text();
                    let mobile = $(this).children('td:eq(3)').text();
                    let address = $(this).children('td:eq(4)').text();
                    let email = $(this).children('td:eq(5)').text();
                    let role = $(this).children('td:eq(6)').text();


                    $('#empID').val(id);
                    $('#inputSupplierNIC').val(nic);
                    $('#inputSupplierName').val(name)
                    $('#inputSupplierMobile').val(mobile);
                    $('#inputSupplierAddr').val(address);
                    $('#inputSupplierEmail').val(email);
                    $('#selectSupplierRole').val(role)


                });


            }
        }
    });
}

loadAllSupplier();


// save Supplier
$("#saveSupplier").click(function () {


    let nic = $("#inputSupplierNIC").val();
    let name = $("#inputSupplierName").val();
    let mobile = $("#inputSupplierMobile").val();
    let email = $("#inputSupplierEmail").val();
    let address = $("#inputSupplierAddr").val();
    let role = $("#selectSupplierRole").val();

    if (checkNic() && nic != "") {
        if (checkEmpName() && name != "") {
            if (checkEmpMobile() && mobile != "") {
                if (checkEmail() && email != "") {
                    if (checkAddress() && address != "") {
                        if (role != "" && role > 0) {
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
                                        url: "http://localhost:9090/api/v1/Supplier",
                                        contentType: "application/json",
                                        async: true,
                                        data: JSON.stringify(
                                            {
                                                nic: nic,
                                                name: name,
                                                mobile: mobile,
                                                email: email,
                                                address: address,
                                                role: role
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
                                            clearTextFields();

                                        }
                                    });
                                } else if (result.isDenied) {
                                    Swal.fire('Changes are not saved', '', 'info')
                                }
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Role is not Include!',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            $('#selectSupplierRole').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Address is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputSupplierAddr').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputSupplierEmail').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mobile is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputSupplierMobile').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Name is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputSupplierName').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'NIC is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputSupplierNIC').css('border', '1px solid #ff6b81');
    }


});

$('#updateSupplier').click(function () {
    let id = $("#empID").val();
    let nic = $("#inputSupplierNIC").val();
    let name = $("#inputSupplierName").val();
    let mobile = $("#inputSupplierMobile").val();
    let email = $("#inputSupplierEmail").val();
    let address = $("#inputSupplierAddr").val();
    let role = $("#selectSupplierRole").val();

    if (id != "") {
        if (checkNic() && nic != "") {
            if (checkEmpName() && name != "") {
                if (checkEmpMobile() && mobile != "") {
                    if (checkEmail() && email != "") {
                        if (checkAddress() && address != "") {
                            if (role != "" && role > 0 && !role.empty()) {
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
                                            url: URL,
                                            contentType: "application/json",
                                            async: false,
                                            data: JSON.stringify(
                                                {
                                                    id: id,
                                                    nic: nic,
                                                    name: name,
                                                    mobile: mobile,
                                                    email: email,
                                                    address: address,
                                                    role: role
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
                                                clearTextFields();

                                            }
                                        });
                                    } else if (result.isDenied) {
                                        Swal.fire('Changes are not saved', '', 'info')
                                    }
                                })

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Role is not Include!',
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                                $('#selectSupplierRole').css('border', '1px solid #ff6b81');
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Address is not Include!',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            $('#inputSupplierAddr').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputSupplierEmail').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mobile is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputSupplierMobile').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Name is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputSupplierName').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'NIC is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputSupplierNIC').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Supplier is  not selected!',
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
                        clearTextFields();
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
    clearTextFields();
});


// validation
function checkNic() {

    if (/^([0-9]{9}[v|V]|[0-9]{12})$/.test($("#inputSupplierNIC").val())) {
        $("#inputSupplierNIC").css('border', '1px solid #2ed573');
        return true;
    } else {
        $("#inputSupplierNIC").css('border', '1px solid #ff6b81');
    }
    return false;

}

// Listner for nic
$('#inputSupplierNIC').on('keyup', function (event) {
    checkNic();
});

$('#inputSupplierName').on('keyup', function (event) {
    checkEmpName();
});

function checkEmpName() {
    if (/^[A-z ]{1,}$/.test($('#inputSupplierName').val())) {
        $('#inputSupplierName').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupplierName').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check mobile
$('#inputSupplierMobile').on('keyup', function (event) {
    checkEmpMobile();
});

function checkEmpMobile() {
    if (/^[0-9]{10}$/.test($('#inputSupplierMobile').val())) {
        $('#inputSupplierMobile').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupplierMobile').css('border', '1px solid #ff6b81');
    }
    return false;
}


//check address
$('#inputSupplierAddr').on('keyup', function (event) {
    checkAddress();
});

function checkAddress() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#inputSupplierAddr').val())) {
        $('#inputSupplierAddr').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupplierAddr').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check email
$('#inputSupplierEmail').on('keyup', function (event) {
    checkEmail();
});

function checkEmail() {
    if (/^[A-z, |0-9]{1,}(@gmail.com)$/.test($('#inputSupplierEmail').val())) {
        $('#inputSupplierEmail').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputSupplierEmail').css('border', '1px solid #ff6b81');
    }
    return false;
}

// check role
$("#selectSupplierRole").click(function () {
    let role = $("#selectSupplierRole").val();
    if (role != "" && role > 0) {
        $('#selectSupplierRole').css('border', '1px solid #2ed573');
    } else {
        $('#selectSupplierRole').css('border', '1px solid #ff6b81');
    }
})
//get all click
$("#getAllSupplier").click(function () {
    loadAllSupplier();
});


function clearTextFields() {
    $('#empID').val("");
    $('#inputSupplierNIC').val("");
    $('#inputSupplierName').val("");
    $('#inputSupplierMobile').val("");
    $('#inputSupplierEmail').val("");
    $('#inputSupplierAddr').val("");
    $('#selectSupplierRole')[0].selectedIndex = 0;

    $('#inputSupplierNIC').css('border', '1px solid #ccc');
    $('#inputSupplierName').css('border', '1px solid #ccc');
    $('#inputSupplierMobile').css('border', '1px solid #ccc');
    $('#inputSupplierEmail').css('border', '1px solid #ccc');
    $('#inputSupplierAddr').css('border', '1px solid #ccc');
    $('#selectSupplierRole').css('border', '1px solid #ccc');
}
