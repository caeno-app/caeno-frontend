const restaurantsNearLocation = async (lat, lon) => {
    return {
    "locations": [
        {
            "name": "Subway",
            "brand_id": "513fbc1283aa2dc80c000005",
            "fs_id": null,
            "address": "SUBWAY BC'S CAVERN",
            "address2": null,
            "city": "Irvine",
            "state": "CA",
            "country": "US",
            "zip": "92697",
            "phone": "+19498242197",
            "website": "http://www.subway.com",
            "id": 771293,
            "lat": 33.64500045776367,
            "lng": -117.84400177001953,
            "created_at": "2017-06-26T21:51:29.000Z",
            "updated_at": "2017-08-20T13:58:36.000Z",
            "distance_km": 0.5011879458186909
        },
        {
            "name": "Subway",
            "brand_id": "513fbc1283aa2dc80c000005",
            "fs_id": null,
            "address": "501 Mesa Road, Irvine",
            "address2": null,
            "city": "Irvine",
            "state": "California",
            "country": "US",
            "zip": "92697",
            "phone": "+19498247860",
            "website": "http://www.subway.com",
            "id": 2412546,
            "lat": 33.64558410644531,
            "lng": -117.84468078613281,
            "created_at": "2018-02-04T01:37:57.000Z",
            "updated_at": "2018-02-04T01:37:57.000Z",
            "distance_km": 0.5664223288895803
        },
        {
            "name": "Subway",
            "brand_id": "513fbc1283aa2dc80c000005",
            "fs_id": "515ddf0ae4b0003b3a5d495e",
            "address": "128 C Student Center",
            "address2": null,
            "city": "Irvine",
            "state": "CA",
            "country": "US",
            "zip": "92617",
            "phone": "",
            "website": "http://www.subway.com",
            "id": 2151249,
            "lat": 33.64594268798828,
            "lng": -117.84403228759766,
            "created_at": "2017-07-14T18:56:56.000Z",
            "updated_at": "2020-01-17T02:13:55.000Z",
            "distance_km": 0.6057033649088298
        },
        {
            "name": "Au Bon Pain",
            "brand_id": "513fbc1283aa2dc80c000043",
            "fs_id": null,
            "address": "4290 Pereira Drive #1128, Irvine",
            "address2": null,
            "city": "Irvine",
            "state": "California",
            "country": "US",
            "zip": "92697",
            "phone": "+19498240492",
            "website": "http://www.aubonpain.com/",
            "guide": null,
            "id": 2187857,
            "lat": 33.64690399169922,
            "lng": -117.8380126953125,
            "created_at": "2017-07-31T17:36:54.000Z",
            "updated_at": "2018-02-28T22:10:55.000Z",
            "distance_km": 0.9196767355172796
        },
        {
            "name": "Einstein Bros. Bagels",
            "brand_id": "513fbc1283aa2dc80c00003e",
            "fs_id": null,
            "address": "G318 Student Center, Bldg 204, Irvine",
            "address2": null,
            "city": "Irvine",
            "state": "California",
            "country": "US",
            "zip": "92697",
            "phone": "+19498247190",
            "website": "http://www.einsteinbros.com/#/home/",
            "guide": null,
            "id": 2187859,
            "lat": 33.64890670776367,
            "lng": -117.8425064086914,
            "created_at": "2017-07-31T17:36:54.000Z",
            "updated_at": "2017-11-08T05:21:57.000Z",
            "distance_km": 0.949413158530285
        }
    ]
}}
export default {
    get: {
        location: restaurantsNearLocation
    }
}