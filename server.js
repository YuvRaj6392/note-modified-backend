const db=require('./models');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
var corsOption={
    origin:"https://technotes-gl5i.onrender.com"
};
app.use(cors(corsOption));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yuvrajsrivastava6392:<password>@cluster0.wsjfitn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  require('./routes/Users.routes')(app);
  require('./routes/Notes.routes')(app);
  app.get('/',(req,res)=>{
    res.json({
      message:'Welcome to the page!'
    })
  })
  app.listen(8080,()=>{
    console.log('Server is listening to port 8080');
  })