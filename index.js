/* eslint-disable global-require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { errorHandling, originValidation } = require('./src/middlewares');

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(
  '/onboarding/v1/onboardings/:uiid',
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  }),
  (req, res) => {
    res.status(200).json({
      "location": "/info/1",
      "enabled": true,
      "finished": false,
      "codelist": {
        "amenities": [
          {
            "category": "kitchen_appliances",
            "data": [
              {
                "id": 155,
                "name": "stove",
                "kinds": [
                  "electric",
                  "gas",
                  "induction"
                ],
                "show_description": true
              },
              {
                "id": 200,
                "name": "fridge",
                "kinds": [],
                "show_description": true
              }
            ]
          },
          {
            "category": "kitchen_amenities",
            "data": [
              {
                "id": 156,
                "name": "scissors",
                "kinds": [],
                "show_description": false
              },
              {
                "id": 206,
                "name": "peeler",
                "kinds": [],
                "show_description": false
              }
            ]
          }
        ]
      },
      "data": {
        "host": {
          "name": "Joe Doe",
          "email": "joe.doe@example.com",
          "phone": "",
          "contact": "",
          "alternative_contact": "",
          "minimum_nightly_price": "",
          "observations": "",
          "bank_details": {
            "country": "uk",
            "account_number": "123456",
            "swift": "222333"
          }
        },
        "property": {
          "property_type": "flat",
          "residency_type": "",
          "property_type_observations": "",
          "city": "",
          "street": "",
          "street_number": "",
          "post_code": "",
          "floor": "",
          "flat_number": "",
          "address_observations": "",
          "building_directions": "",
          "flat_directions": "",
          "aditional_comments": "",
          "intercom": false,
          "alarm": false,
          "lockbox": false,
          "doors_lock_when_closed": false,
          "lock_observations": "",
          "set_of_keys": "",
          "keys_descriptions": "",
          "all_keys_tested": false,
          "keys_observations": "",
          "closest_public_transport": "",
          "parking_nearby": false,
          "transport_observations": "",
          "size": 156,
          "max_guest_number": "",
          "size_observations": "",
          "wifi_name": "",
          "wifi_password": "",
          "wifi_router_location": "",
          "wifi_observations": "",
          "bedrooms_count": 2,
          "pillow_for_all_beds": false,
          "bedrooms_observations": "",
          "bathrooms_instructions": "",
          "bathrooms_observations": "",
          "beds": [
            {
              "location": "Bedroom One",
              "count": 1,
              "type": "queen_bed"
            },
            {
              "location": "Bedroom Two",
              "count": 2,
              "type": "single_bed"
            }
          ],
          "bathrooms": [
            {
              "shower": true,
              "bathtub": false,
              "toilet": false,
              "hairdryer": true
            },
            {
              "shower": false,
              "bathtub": true,
              "toilet": true,
              "hairdryer": false
            }
          ],
          "amenities": [
            {
              "id": 155,
              "kind": "electric",
              "description": true
            },
            {
              "id": 156,
              "kind": "",
              "description": ""
            }
          ],
          "maintenance": {
            "waste_disposal_directions": "",
            "cleaning_instructions": "",
            "extra_linen_place": "",
            "dirty_linen_place": "",
            "preferred_maintenance": "",
            "switches_location": "",
            "boiler_location": "",
            "heating_control_location": "",
            "internal_keys": true,
            "observations": ""
          },
          "aditional_infos": {
            "rules": "",
            "children_friendly": true,
            "infant_friendly": true,
            "rules_observations": "",
            "private_room": true,
            "property_truths": "",
            "letterbox_access": true,
            "posts_location": "",
            "aditional_observations": ""
          },
          "nearby": {
            "supermarkets_and_shops": "",
            "cafe_or_restaurant": "",
            "points_of_interest": ""
          }
        }
      }
    })
  }
);

app.use(errorHandling);

app.listen(PORT, HOST, () => {
  console.log(`Server listing on ${HOST}:${PORT}`);
});
