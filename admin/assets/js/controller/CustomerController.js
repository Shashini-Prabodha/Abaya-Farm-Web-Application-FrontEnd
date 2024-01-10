CUSTOMER_URL = "http://localhost:9090/api/v1/customer";
CUSTOMERLOGIN_URL = "http://localhost:9090/api/v1/customerLogin";

function loadAllCustomer() {


    $('#tblCustomer').empty();
    $.ajax({
        method: 'GET',
        url: CUSTOMER_URL,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].customerId;
                let name = response[i].name;
                let mobile = response[i].mobile;
                let address = response[i].address;
                let email = response[i].email;
                let status = response[i].status;


                let row = `<tr><td>${id}</td><td>${name}</td><td>${email}</td><td>${mobile}</td><td>${address}</td><td>${status}</td>
                    <td> 
                   
                    <button type="button" class="btn " data-bs-toggle="modal"  data-bs-target="#editModal${id}" ><i class="bi bi-pencil-square"></i></button>
                    
                <!--     <button type="button" class="btn" data-bs-toggle="modal"
                               
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>-->

                           <div id="editModal${id}" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                     <div class="modal-header">
                    <h4 class="modal-title">Edit Customer Status</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                     <label for="custID" class="col-sm-2 col-form-label">Customer ID </label>
                        <input type="text" class="form-control"  id=${id} readonly>
                    </div>
   
                    <label for="floatingCustStatus${id}" class="col-sm-2 col-form-label">Status </label>
                    <div class="form-group">
                        <select class="form-select " id="floatingCustStatus${id}"
                                aria-label="Status">
                            <option value="Active" class="bg-soft-success dropdown-item">Active</option>
                            <option value="Deactivate" class="bg-soft-danger p-2">Deactivate</option>
                            <option value="Block" class="bg-soft-warning p-2">Block</option>

                        </select>
                    </div>



                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-bs-dismiss="modal" value="Cancel">
                    <input type="button" class="btn btn-info" value="Save" id="updateStatus${id}">
                </div>
                </form>
            </div>
        </div>
    </div>
                    
                    </td>
                    </tr>`;
                $('#tblCustomer').append(row);

                $('#tblCustomer tr').css({"cursor": "pointer"});
                $('#tblCustomer tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let name = $(this).children('td:eq(1)').text();
                    let email = $(this).children('td:eq(2)').text();
                    let mobile = $(this).children('td:eq(3)').text();
                    let address = $(this).children('td:eq(4)').text();
                    let status = $(this).children('td:eq(5)').text();

                    $('#inputCustomerId').val(id);
                    $('#inputCustName').val(name)
                    $('#inputCustMobile').val(mobile);
                    $('#inputCustAddr').val(address);
                    $('#inputCustomerEmail').val(email);
                    $('#customerStatusH').val(status)


                });

                $("#" + id).val(id);

                $('#updateStatus' + id).click(function () {
                    let custId = id;
                    let custStatus = $('#floatingCustStatus' + id).val();

                    Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: true,
                        confirmButtonText: `Save`,
                        denyButtonText: `Don't save`,
                    }).then((result) => {

                        if (result.isConfirmed) {

                            $.ajax({
                                url: 'http://localhost:9090/api/v1/customer/updateStatus',
                                method: 'put',
                                contentType: "application/json",
                                data: JSON.stringify(
                                    {
                                        customerId: id,
                                        status: custStatus,
                                        updated_at: getCurrentDateTime(),

                                    }),

                                success: function (data) {

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1000
                                    })

                                    loadAllCustomer();


                                },
                                error: function (responce) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Something went wrong!!',
                                        showConfirmButton: false,
                                        timer: 1000
                                    });
                                }
                            })
                        }
                    });
                });

            }
        }
    });
}

loadAllCustomer();


// save customer
$("#saveCustomer").click(function () {

    let name = $("#inputCustName").val();
    let mobile = $("#inputCustMobile").val();
    let email = $("#inputCustomerEmail").val();
    let address = $("#inputCustAddr").val();
    let date = getCurrentDateTime();

    if (checkCustEmail() && email != "") {
        if (checkCustomerName() && name != "") {
            if (checkCustMobile() && mobile != "") {
                if (checkCustAddress() && address != "") {

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
                                url: CUSTOMERLOGIN_URL,
                                contentType: "application/json",
                                async: true,
                                data: JSON.stringify(
                                    {
                                        loginDTO: {
                                            email: email,
                                            password: mobile,
                                            role: "Customer",
                                        },
                                        customerDTO:
                                            {
                                                name: name,
                                                mobile: mobile,
                                                email: email,
                                                address: address,
                                                role: "Customer",
                                                status: "Active",
                                                created_at: date,
                                                updated_at: date,

                                            }
                                    }
                                ),
                                success: function (data) {

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    loadAllCustomer();

                                    clearTextFieldsCustomer();

                                }
                            });
                        } else if (result.isDenied) {
                            Swal.fire('Changes are not saved', '', 'info')
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Address is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputCustAddr').css('border', '1px solid #ff6b81');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mobile is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputCustMobile').css('border', '1px solid #ff6b81');
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Name is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputCustName').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Email is not Include!',
            showConfirmButton: false,
            timer: 1000
        });
        $('#inputCustomerEmail').css('border', '1px solid #ff6b81');
    }


});

$('#updateCustomer').click(function () {


    let id = $("#inputCustomerId").val();
    let name = $("#inputCustName").val();
    let mobile = $("#inputCustMobile").val();
    let email = $("#inputCustomerEmail").val();
    let address = $("#inputCustAddr").val();
    let status = $("#customerStatusH").val();
    let date = getCurrentDateTime();
    searchCustomer(id);

    let oldEmail = $("#oldEmailCustomer").val();

    console.log(oldEmail+"***--*"+status);


    if (id != "") {
        if (checkCustEmail() && email != "") {
            if(oldEmail === email){

            if (checkCustomerName() && name != "") {
                if (checkCustMobile() && mobile != "") {
                    if (checkCustAddress() && address != "") {

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
                                    url: CUSTOMER_URL,
                                    contentType: "application/json",
                                    async: true,
                                    data: JSON.stringify(
                                        {
                                            customerId: id,
                                            name: name,
                                            mobile: mobile,
                                            email: email,
                                            address: address,
                                            role: "Customer",
                                            status: status,
                                            updated_at: date,


                                        }
                                    ),
                                    success: function (data) {

                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Your work has been saved',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        loadAllCustomer();

                                        clearTextFieldsCustomer();

                                    }
                                });
                            } else if (result.isDenied) {
                                Swal.fire('Changes are not saved', '', 'info')
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Address is not Include!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        $('#inputCustAddr').css('border', '1px solid #ff6b81');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mobile is not Include!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    $('#inputCustMobile').css('border', '1px solid #ff6b81');
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Name is not Include!',
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputCustName').css('border', '1px solid #ff6b81');
            }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Don't change Email!",
                    showConfirmButton: false,
                    timer: 1000
                });
                $('#inputCustomerEmail').css('border', '1px solid #ff6b81');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Email is not Include!',
                showConfirmButton: false,
                timer: 1000
            });
            $('#inputCustomerEmail').css('border', '1px solid #ff6b81');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Customer is not selected!',
            showConfirmButton: false,
            timer: 1000
        });
    }

});

//delete
$('#delCustomer').click(function () {
    let id = $("#inputCustomerId").val();

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
                    url: 'http://localhost:9090/api/v1/customer/?id=' + id,
                    async: true,
                    success: function (response) {
                        loadAllCustomer();
                        clearTextFieldsCustomer();
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
            title: 'Customer is  not selected!',
            showConfirmButton: false,
            timer: 1000
        });

    }


});

//search customer
function searchCustomer(id) {
    let email;
    $.ajax({
        url: CUSTOMER_URL+"/"+id,
        method: 'GET',
        async:false,
        success: function (response) {

            const data = response.data

            $("#oldEmailCustomer").val(data.email);
            console.log($("#oldEmailCustomer").val()+" +++++ "+data.email);


        },
        error: function (response) {
            console.error(response.data)
        }
    });
    return email;
}

//clear all
$('#clearCustomer').click(function () {
    clearTextFieldsCustomer();
});


// validation

$('#inputCustName').on('keyup', function (event) {
    checkCustomerName();
});

function checkCustomerName() {
    if (/^[A-z ]{1,}$/.test($('#inputCustName').val())) {
        $('#inputCustName').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputCustName').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check mobile
$('#inputCustMobile').on('keyup', function (event) {
    checkCustMobile();
});

function checkCustMobile() {
    if (/^[0-9]{10}$/.test($('#inputCustMobile').val())) {
        $('#inputCustMobile').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputCustMobile').css('border', '1px solid #ff6b81');
    }
    return false;
}


//check address
$('#inputCustAddr').on('keyup', function (event) {
    checkCustAddress();
});

function checkCustAddress() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#inputCustAddr').val())) {
        $('#inputCustAddr').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputCustAddr').css('border', '1px solid #ff6b81');
    }
    return false;
}

//check email
$('#inputCustomerEmail').on('keyup', function (event) {
    checkCustEmail();
});

function checkCustEmail() {
    if (/^[A-z, |0-9]{1,}(@gmail.com)$/.test($('#inputCustomerEmail').val())) {
        $('#inputCustomerEmail').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputCustomerEmail').css('border', '1px solid #ff6b81');
    }
    return false;
}


//get all click
$("#getAllCustomer").click(function () {
    loadAllCustomer();
});


function clearTextFieldsCustomer() {
    $('#inputCustomerId').val("");
    $('#inputCustName').val("");
    $('#inputCustMobile').val("");
    $('#inputCustAddr').val("");
    $('#inputCustomerEmail').val("");

    $('#inputCustName').css('border', '1px solid #ccc');
    $('#inputCustMobile').css('border', '1px solid #ccc');
    $('#inputCustAddr').css('border', '1px solid #ccc');
    $('#inputCustomerEmail').css('border', '1px solid #ccc');

}


