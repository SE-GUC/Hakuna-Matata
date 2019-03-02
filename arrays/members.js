var moment = require('moment');
const Member=require("../models/member");


var members = [
	new Member( 1, "Omar Sherif",  "Omar", moment().format('MMMM Do YYYY, h:mm:ss a'), false ,
    [{id:2}],[{id:5},{id:6}],5,2,3,3,1,[
        "Web designer","Web devoloper","Grafic designer"
    ]),
	new Member( 2, "Nada Hamdy", "Nada",  moment().format('MMMM Do YYYY, h:mm:ss a'), false ,
    [{id:3},{id:4}],[{id:9},{id:10}],2,2,1,5,0,[
        "Grafic designer","Android devoloper","Ios dvoloper"

    ]),
	new Member(3, "Karim Tamer","Karim",   moment().format('MMMM Do YYYY, h:mm:ss a'), false ,
    [{id:7},{id:8}], [{id:11},{id:12}],2,2,3,4,2,[
        "Web designer","Web devoloper","Grafic designer","Android devoloper","Ios dvoloper"
    ])
];

module.exports = members;