
$('#btnDash').on('click', function () {
    setVisibility('block', 'none', 'none', 'none', 'none', 'none', 'none',
        'none');
});

$('#btnPurchase').on('click', function () {
    setVisibility('none', 'block', 'none', 'none', 'none', 'none', 'none',
        'none');
});

$('#btnEditBatch').on('click', function () {
    setVisibility('none', 'none', 'block', 'none', 'none', 'none', 'none',
        'none');
});

$('#btnMortality').on('click', function () {
    setVisibility('none', 'none', 'none', 'block', 'none', 'none', 'none',
        'none');
});

$('#btnPurchaseFeed').on('click', function () {
    setVisibility('none', 'none', 'none', 'none', 'block', 'none', 'none',
        'none');
});

$('#btnFeedConsumption').on('click', function () {
    setVisibility('none', 'none', 'none', 'none', 'none', 'block', 'none',
        'none');
});

$('#btnFeedStockSummary').on('click', function () {
    setVisibility('none', 'none', 'none', 'none', 'none', 'none', 'block',
        'none');
});
$('#btnProfile').on('click', function () {
    setVisibility('none', 'none', 'none', 'none', 'none', 'none', 'none',
        'block');
});

function setVisibility(main, birdsComponent, birdsEditComponent, mortalityComponent, feedPurchaseComponent, feedConsumptionComponent, feedStockSummaryComoponent,profile) {
    document.getElementById('main').style.display = main;
    document.getElementById('birdsComponent').style.display = birdsComponent;
    document.getElementById('birdsEditComponent').style.display = birdsEditComponent;
    document.getElementById('mortalityComponent').style.display = mortalityComponent;
    document.getElementById('feedPurchaseComponent').style.display = feedPurchaseComponent;
    document.getElementById('feedConsumptionComponent').style.display = feedConsumptionComponent;
    document.getElementById('feedStockSummaryComoponent').style.display = feedStockSummaryComoponent;
    document.getElementById('profile').style.display = profile;
  //  document.getElementById('footer').style.display = footer;


}