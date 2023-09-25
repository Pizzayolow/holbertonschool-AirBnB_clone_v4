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
