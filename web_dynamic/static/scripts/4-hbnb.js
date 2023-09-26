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

    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
        console.log(data)
        if (data.status === 'OK') {
            $('div#api_status').addClass('available')
        } else {
            $('div#api_status').removeClass('available')
        }
    });

    $.ajax({
        url: "http://127.0.0.1:5001/api/v1/users",
        type: "GET",
        success: function (userList) {

            const usersData = {};
            for (const user of userList) {
                usersData[user.id] = user;
            }

            $.ajax({
                url: "http://127.0.0.1:5001/api/v1/places_search",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({}),
                success: function (data) {

                    for (const placeData of data) {
                        const placeArticle = $(`
                    <article>
                        <div class="title_box">
                            <h2>${placeData.name}</h2>
                            <div class="price_by_night">$${placeData.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${placeData.max_guest} Guest${placeData.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${placeData.number_rooms} Bedroom${placeData.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${placeData.number_bathrooms} Bathroom${placeData.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="user">
                            <b>Owner:</b> ${usersData[placeData.user_id].first_name} ${usersData[placeData.user_id].last_name}
                        </div>
                        <div class="description">
                            ${placeData.description || ''}
                        </div>
                    </article>
                `);
                        const placesSection = $('.places')
                        placesSection.append(placeArticle)
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            });
        },
        error: function (error) {
            console.error(error);
        }

    });

    $('button').on('click', function () {

        $.ajax({
            url: "http://127.0.0.1:5001/api/v1/users",
            type: "GET",
            success: function (userList) {

                const usersData = {};
                for (const user of userList) {
                    usersData[user.id] = user;
                }

                $.ajax({
                    url: "http://127.0.0.1:5001/api/v1/places_search",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(amenitiesList),
                    success: function (data) {

                        for (const placeData of data) {
                            const placeArticle = $(`
                        <article>
                            <div class="title_box">
                                <h2>${placeData.name}</h2>
                                <div class="price_by_night">$${placeData.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${placeData.max_guest} Guest${placeData.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${placeData.number_rooms} Bedroom${placeData.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${placeData.number_bathrooms} Bathroom${placeData.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="user">
                                <b>Owner:</b> ${usersData[placeData.user_id].first_name} ${usersData[placeData.user_id].last_name}
                            </div>
                            <div class="description">
                                ${placeData.description || ''}
                            </div>
                        </article>
                    `);
                            const placesSection = $('.places')
                            placesSection.html(placeArticle)
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    }
                });
            },
            error: function (error) {
                console.error(error);
            }

        });
    });
});





// $(() => {
//     let selectedAmenities = [];

//     $('button').on('click', function () {
//         const amenityId = $(this).data('id');
//         const amenityName = $(this).data('name');
//         console.log($(this).data('name'))

//         if ($('input[type="checkbox"]').checked) {
//             selectedAmenities.push(amenityName);
//             console.log(selectedAmenities)
//         } else {
//             delete selectedAmenities[amenityId];
//         }
//         const amenityNames = Object.values(selectedAmenities).join(', ');
//         $('.amenities h4').text(amenityNames);
//     });
// });
