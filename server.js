const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages", function (request, response) {
  response.send(messages)
});
//create a new message
app.post('/messages', function(request, response) {
  const message = request.body;
  if (message.from ==undefined ||
      message.text == undefined){
      return response.status(400).send({success: false})
    }else{
  message.id = messages.length
  messages.push(message)
  response.status(201).send(message)
  }
})
//get message by ID
app.get("/messages/:id", function (request, response) {
  const id = request.params.id;
  const message = messages.find((m) => m.id == id);
  response.send(message);
});
//delete message by ID
app.delete("/messages/:id", function(request, response){
  const id = request.params.id;
  const filteredID = messages.filter((message)=>{
    return message.id != id;
  })
  messages = filteredID;
  response.send({success : true});
})



app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
