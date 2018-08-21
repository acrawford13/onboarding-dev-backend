/* eslint-disable global-require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { Map, List, fromJS } = require('immutable');

const { errorHandling, originValidation } = require('./src/middlewares');

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, methods: ['GET', 'PUT', 'POST', 'DELETE'] }))

let data = fromJS(
  {
    "status": "not_opened",
   "codelist":{
      "transport_methods":[
         {
            "label":"Flight",
            "value":"flight"
         },
         {
            "label":"Train",
            "value":"train"
         },
         {
            "label":"Bus",
            "value":"bus"
         }
      ],
      "bed_types":[
         {
            "label":"Queen bed",
            "value":"queen_bed"
         },
         {
            "label":"King bed",
            "value":"king_bed"
         },
         {
            "label":"Single bed",
            "value":"single_bed"
         },
         {
            "label":"Double bed",
            "value":"double_bed"
         },
         {
            "label":"Single sofa bed",
            "value":"single_sofa_bed"
         },
         {
            "label":"Double sofa bed",
            "value":"double_sofa_bed"
         },
         {
            "label":"Single air bed",
            "value":"single_air_bed"
         },
         {
            "label":"Double air bed",
            "value":"double_air_bed"
         }
      ],
      "bed_locations":[
         {
            "value":"bedroom 1",
            "label":"Quarto 1"
         },
         {
            "value":"bedroom 2",
            "label":"Quarto 2"
         },
         {
            "value":"bedroom 3",
            "label":"Quarto 3"
         },
         {
            "value":"commom spaces",
            "label":"espaços comum"
         }
      ]
   },
   "data":{
      "guest_name": "Stallone",
      "additional_info":"Some thing here",
      "arrival_vehicle_number":"XX666",
      "arrival_vehicle_type":"boat",
      "arriving_time":"14:30",
      "arriving_time_in_property":"15:30",
      "booked_person_id_photo":"url to image",
      "check_in_date":"10/10/2018",
      "check_in_time":"11:00",
      "check_out_date":"12/10/2018",
      "check_out_time":"15:30",
      "guest_email":"stallone@test.com",
      "guest_phone_number":"55540044453",
      "guests_count":"1",
      "keys_pickup_person_id":"url to image",
      "keys_pickup_person_name":"Stallone",
      "same_person_who_booked":true,
      "beds":[
         {
            "name":"single_bed",
            "location":"bedroom 1",
            "count":1,
            "id":10,
            "checked":true
         }
      ],
   },
});

app.get(
  '/v1/health_check',
  (req, res) => {
    console.log('>>>> healthCheck');
    res.status(200).json(true);
  }
);


app.get(
  '/:locale/check_in_info/v1/guest_form/:uiid',
  (req, res) => {
    console.log('>>>> Get all for: ', req.params);
    console.log('>>>> current_location: ', data.get('current_location'));
    res.status(200).json(data.toJS());
  }
);

app.put(
  '/:locale/check_in_info/v1/guest_form/:uiid', (req, res) => {
    const { data: field } = req.body;
    const path = ['data'].concat(field.resource.split('.'), field.column).filter(path => path);
    console.log('>>>> Update field', req.body, path);
    data = data.setIn(path, field.value);
    res.status(200).json({ field });
  })

app.use(errorHandling);

app.listen(PORT, HOST, () => {
  console.log(`Server listing on ${HOST}:${PORT}`);
});
