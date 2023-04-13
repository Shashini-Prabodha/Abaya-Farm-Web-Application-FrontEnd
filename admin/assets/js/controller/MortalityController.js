MORTALITY_URL = "http://localhost:9090/api/v1/mortality";

const loadAllCageInMortality = () => {
    $.ajax({
        url: CAGE_URL,
        method: 'GET',
        success: function (response) {

            const data = response.data

            let dropdown = $("#cmbMortalityCage");
            $.each(data, function (index, item) {
                dropdown.append(`<option value=${item.cageId} >${item.cageId}</option>`);
            });
        },
        error: function (response) {
            console.error(response.data)
        }
    });

}

loadAllCageInMortality();

$("#cmbMortalityCage").change(function () {
    let cage= $("#cmbMortalityCage").val();
    $.ajax({
        url: 'http://localhost:9090/api/v1/batch/findCageByBatch/'+cage,
        method: 'GET',
        success: function (response) {

            const data = response.data

          $("#inputMortalityBatch").val(data.batchId);
          $("#inputRemainingBirds").val(data.remaining_birds);

        },
        error: function (response) {
            console.error(response.data)
        }
    });
});


/*
function getCageID(){
    let batch= $("#inputMortalityBatch").val();
    let data;
    $.ajax({
        url: 'http://localhost:9090/api/v1/batch/findBatchByBatchId/'+batch,
        method: 'GET',
        success: function (response) {

             data = response.data


        },
        error: function (response) {
            console.error(response.data)
        }
    });
    return data;
}
*/


$("#saveMortality").click(function () {

    let cage = $("#cmbMortalityCage").val();
    let mortality = $("#inputMortalityCount").val();
    let remark = $("#inputBirdMortalityRemark").val();
    let bacthId = $("#inputMortalityBatch").val();

    if (cage != "") {
        if (checkMortalityCount() && mortality != "") {

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
                        url: MORTALITY_URL ,
                        contentType: "application/json",
                        async: true,
                        data: JSON.stringify(
                            {

                                quantity: mortality,
                                remark: remark,
                                batchId:bacthId,
                                created_at: getCurrentDateTime(),
                                updated_at: getCurrentDateTime(),
                            }
                        ),
                        success: function (data) {
                            loadAllMortality();

                            Swal.fire({

                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            clearTextFieldsMortality();


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
            $('#inputMortalityCount').css('border', '1px solid #ff6b81');
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

$("#updateMortality").click(function () {

    let cage = $("#cmbMortalityCage").val();
    let mortality = $("#inputMortalityCount").val();
    let remark = $("#inputBirdMortalityRemark").val();
    let bacthId = $("#inputMortalityBatch").val();
    let id = $("#inputMortalityId").val();

    if (cage != "") {
        if (checkMortalityCount() && mortality != "") {

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
                        url: MORTALITY_URL ,
                        contentType: "application/json",
                        async: true,
                        data: JSON.stringify(
                            {
                                id:id,
                                quantity: mortality,
                                remark: remark,
                                batchId:bacthId,
                                created_at: getCurrentDateTime(),
                                updated_at: getCurrentDateTime(),
                            }
                        ),
                        success: function (data) {
                            loadAllMortality();

                            Swal.fire({

                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            clearTextFieldsMortality();

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
            $('#inputMortalityCount').css('border', '1px solid #ff6b81');
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

//check mortality bird count
$('#inputMortalityCount').on('keyup', function (event) {
    checkMortalityCount();
});

function checkMortalityCount() {
    if (/^[0-9]{1,}$/.test($('#inputMortalityCount').val())) {
        $('#inputMortalityCount').css('border', '1px solid #2ed573');
        return true;
    } else {
        $('#inputMortalityCount').css('border', '1px solid #ff6b81');
    }
    return false;
}


function loadAllMortality() {

    $('#mortalityTBody').empty();
    $.ajax({
        method: 'GET',
        url: MORTALITY_URL ,
        dataType: 'json',
        async: true,
        success: function (resp) {
            let response = resp.data;
            for (let i in response) {

                let id = response[i].id;
                let batchId = response[i].batchId;
                let remark = response[i].remark;
                let date = response[i].updated_at;
                let deaths = response[i].quantity;
                let cageId ;
                let available ;
                $.ajax({
                    url: 'http://localhost:9090/api/v1/batch/findBatchByBatchId/'+batchId,
                    method: 'GET',
                    async:false,
                    success: function (response) {

                        let data = response.data
                        cageId=data.cageId;
                        available=data.remaining_birds;

                    },
                    error: function (response) {
                        console.error(response.data)
                    }
                });

                let row = `<tr><td>${id}</td><td>${batchId}</td><td>${remark}</td><td>${deaths}</td><td>${available}</td><td>${cageId}</td><td>${date}</td></tr>`;
                $('#mortalityTBody').append(row);

                $('#mortalityTBody tr').css({"cursor": "pointer"});
                $('#mortalityTBody tr').click(function () {

                    id = $(this).children('td:eq(0)').text();
                    batchId = $(this).children('td:eq(1)').text();
                    remark = $(this).children('td:eq(2)').text();
                    deaths = $(this).children('td:eq(3)').text();
                    available = $(this).children('td:eq(4)').text();
                    cageId = $(this).children('td:eq(5)').text();
                    date = $(this).children('td:eq(6)').text();

                    $('#inputMortalityId').val(id);
                    $('#cmbMortalityCage').val(cageId);
                    $('#inputMortalityCount').val(deaths)
                    $('#inputMortalityBatch').val(batchId);
                    $('#inputBirdMortalityRemark').val(remark);
                    $('#inputRemainingBirds').val(available);

                });


            }
        }
    });
}

loadAllMortality();
//get all click
$("#getAllMortality").click(function () {
    loadAllMortality();
});

//clear all click
$("#clearMortality").click(function () {
    clearTextFieldsMortality();
});
function clearTextFieldsMortality() {
    $('#inputMortalityId').val("");
    $('#cmbMortalityCage').val("");
    $('#inputMortalityCount').val("")
    $('#inputMortalityBatch').val("");
    $('#inputBirdMortalityRemark').val("");
    $('#inputRemainingBirds').val("");

    $('#inputMortalityId').css('border', '1px solid #ccc');
    $('#cmbMortalityCage').css('border', '1px solid #ccc');
    $('#inputMortalityCount').css('border', '1px solid #ccc');
    $('#inputMortalityBatch').css('border', '1px solid #ccc');
    $('#inputBirdMortalityRemark').css('border', '1px solid #ccc');
}
