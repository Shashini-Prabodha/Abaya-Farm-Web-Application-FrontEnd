FLOCK_URL = "http://localhost:9090/api/v1/batch";

const loadAllSupplierInBird = () => {
    $.ajax({
        url: SUPPLIER_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data


            var dropdown = $("#selectSupplierInBird");
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.supplierId} data-name=${item.supplierName} >${item.supplierName}</option>`);
            });
        },
        error: function (response) { console.error(responce.data) }
    });

}

loadAllSupplierInBird();

// purchase flock
$("#purchaseBatch").click(function () {

    let supName = $("#selectSupplierInBird").val();
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
                                    clearTextFields();

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
