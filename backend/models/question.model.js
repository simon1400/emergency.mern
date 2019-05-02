const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Question = new Schema({
  nameQuestion: String,
  ask: [
    {
      nameAsk: String,
      askValues: [
        {
          askHead: String,
          askValue: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Question", Question);

// {
//     "nameQuestion": "Question 1",
//     "ask": [
//     	{
// 	      "nameAsk": "otazka 1",
// 	      "askValues": [
// 		      	{
// 			        "askHead": "Odpoved 1 k otazce 1",
// 			        "askValue": "Body 1 k otazce 1"
// 		    	},
// 		    	{
// 			        "askHead": "Odpoved 2 k otazce 1",
// 			        "askValue": "Body 2 k otazce 1"
// 		    	}
// 	    	]
//     	},
//     	{
// 	      "nameAsk": "otazka 2",
// 	      "askValues": [
// 		      	{
// 			        "askHead": "Odpoved 1 k otazce 2",
// 			        "askValue": "Body 1 k otazce 2"
// 		    	},
// 		    	{
// 			        "askHead": "Odpoved 2 k otazce 2",
// 			        "askValue": "Body 2 k otazce 2"
// 		    	}
// 	    	]
//     	}
//     ]
// }
