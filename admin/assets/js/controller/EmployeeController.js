URL = "http://localhost:9090/api/v1/employee";

function loadAllEmployee() {


    $('#empTBody').empty();
    $.ajax({
        method: 'GET',
        url: "http://localhost:9090/api/v1/employee",
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let nic = response[i].nic;
                let name = response[i].name;
                let mobile = response[i].mobile;
                let address = response[i].address;
                let email = response[i].email;
                let role = response[i].role;


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
                    $('#inputEmployeeNIC').val(nic);
                    $('#inputEmployeeName').val(name)
                    $('#inputEmployeeMobile').val(mobile);
                    $('#inputEmployeeAddr').val(address);
                    $('#inputEmployeeEmail').val(email);
                    $('#selectEmployeeRole').val(role)


                });


            }
        }
    });
}

loadAllEmployee();


// save employee
$("#saveEmployee").click(function () {


    let nic = $("#inputEmployeeNIC").val();
    let name = $("#inputEmployeeName").val();
    let mobile = $("#inputEmployeeMobile").val();
    let email = $("#inputEmployeeEmail").val();
    let address = $("#inputEmployeeAddr").val();
    let role = $("#selectEmployeeRole").val();

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
                                        url: "http://localhost:9090/api/v1/employee",
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
                                            loadAllEmployee();

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
                            $('#selectEmployeeRole').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Address is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputEmployeeAddr').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputEmployeeEmail').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mobile is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputEmployeeMobile').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Name is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputEmployeeName').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'NIC is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputEmployeeNIC').css('border', '1px solid #ff6b81');
    }


});

$('#updateEmployee').click(function () {
    let id = $("#empID").val();
    let nic = $("#inputEmployeeNIC").val();
    let name = $("#inputEmployeeName").val();
    let mobile = $("#inputEmployeeMobile").val();
    let email = $("#inputEmployeeEmail").val();
    let address = $("#inputEmployeeAddr").val();
    let role = $("#selectEmployeeRole").val();

    if (id != "") {
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
                                                loadAllEmployee();

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
                                $('#selectEmployeeRole').css('border', '1px solid #ff6b81');
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Address is not Include!',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            $('#inputEmployeeAddr').css('border', '1px solid #ff6b81');
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Email is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputEmployeeEmail').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mobile is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputEmployeeMobile').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Name is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputEmployeeName').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'NIC is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputEmployeeNIC').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Employee is  not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});

//delete
$('#delEmployee').click(function () {
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
                    url: 'http://localhost:9090/api/v1/employee/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllEmployee();
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
            title: 'Employee is  not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});

//clear all
$('#clearEmployee').click(function () {
    clearTextFields();
});


// validation
function checkNic() {

    if (/^([0-9]{9}[v|V]|[0-9]{12})$/.test($("#inputEmployeeNIC").val())) {
        $("#inputEmployeeNIC").css('border', '1px solid #2ed573');
        return true;
    } else {
        $("#inputEmployeeNIC").css('border', '1px solid #ff6b81');
    }
    return false;

}

// Listner for nic
$('#inputEmployeeNIC').on('keyup', function (event) {
    checkNic();
});

$('#inputEmployeeName').on('keyup', function (event) {
    checkEmpName();
});

function checkEmpName() {
    if (/^[A-z ]{1,}$/.test($('#inputEmployeeName').val())) {
        $('#inputEmployeeName').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputEmployeeName').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check mobile
$('#inputEmployeeMobile').on('keyup', function (event) {
    checkEmpMobile();
});

function checkEmpMobile() {
    if (/^[0-9]{10}$/.test($('#inputEmployeeMobile').val())) {
        $('#inputEmployeeMobile').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputEmployeeMobile').css('border', '1px solid #ff6b81');
    }
    return false;
}


//check address
$('#inputEmployeeAddr').on('keyup', function (event) {
    checkAddress();
});

function checkAddress() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#inputEmployeeAddr').val())) {
        $('#inputEmployeeAddr').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputEmployeeAddr').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check email
$('#inputEmployeeEmail').on('keyup', function (event) {
    checkEmail();
});

function checkEmail() {
    if (/^[A-z, |0-9]{1,}(@gmail.com)$/.test($('#inputEmployeeEmail').val())) {
        $('#inputEmployeeEmail').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputEmployeeEmail').css('border', '1px solid #ff6b81');
    }
    return false;
}

// check role
$("#selectEmployeeRole").click(function () {
    let role = $("#selectEmployeeRole").val();
    if (role != "" && role > 0) {
        $('#selectEmployeeRole').css('border', '1px solid #2ed573');
    } else {
        $('#selectEmployeeRole').css('border', '1px solid #ff6b81');
    }
})
//get all click
$("#getAllEmployee").click(function () {
    loadAllEmployee();
});


function clearTextFields() {
    $('#empID').val("");
    $('#inputEmployeeNIC').val("");
    $('#inputEmployeeName').val("");
    $('#inputEmployeeMobile').val("");
    $('#inputEmployeeEmail').val("");
    $('#inputEmployeeAddr').val("");
    $('#selectEmployeeRole')[0].selectedIndex = 0;

    $('#inputEmployeeNIC').css('border', '1px solid #ccc');
    $('#inputEmployeeName').css('border', '1px solid #ccc');
    $('#inputEmployeeMobile').css('border', '1px solid #ccc');
    $('#inputEmployeeEmail').css('border', '1px solid #ccc');
    $('#inputEmployeeAddr').css('border', '1px solid #ccc');
    $('#selectEmployeeRole').css('border', '1px solid #ccc');
}
