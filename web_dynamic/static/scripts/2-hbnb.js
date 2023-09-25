$(() => {
    let amenitiesList = {};

    $('input[type="checkbox"]').on('change', function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if (this.checked) {
            amenitiesList[amenityId] = amenityName;
        } else {
            delete amenitiesList[amenityId];
        }
        const amenityNames = Object.values(amenitiesList).join(', ');
        $('.amenities h4').text(amenityNames);
    });
});

$.get('http://127.0.0.1:5001/api/v1/status/', function(data) {
    console.log(data)
    if (data.status === 'OK') {
        $('div#api_status').addClass('available')
    } else {
        $('div#api_status').removeClass('available')
    }
});
