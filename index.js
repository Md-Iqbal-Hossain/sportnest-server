const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config()

const uri = process.env.MONGODB_URI;

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {

    await client.connect();

    const db = client.db('sportnest');
    const facilityCollection = db.collection('facility');

    app.get('/facility', async (req, res) => {
      const result = await facilityCollection.find().toArray();
      res.json(result);
    });

    app.post('/facility', async (req, res) => {
      const facility = req.body
      console.log(facility);
      
      const result = await facilityCollection.insertOne(facility)

      res.json(result)
    })

    app.get('/facility/:id', async (req, res) => {
      const {id} = req.params;

      const result = await facilityCollection.findOne({_id: new ObjectId(id)})

      res.json(result)
    })

    // ==========================================
    // UPDATE A FACILITY BY ID
    // ==========================================
    app.put('/facility/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // Remove _id field if it was passed from the frontend to avoid immutable field errors
        delete updatedData._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            name: updatedData.name,
            facility_type: updatedData.facility_type,
            location: updatedData.location,
            price_per_hour: Number(updatedData.price_per_hour),
            capacity: Number(updatedData.capacity),
            // Handles both pre-split array arrays or string objects parsed directly from forms
            available_slots: Array.isArray(updatedData.available_slots) 
              ? updatedData.available_slots 
              : updatedData.available_slots.split(',').map(slot => slot.trim()),
            image: updatedData.image,
            description: updatedData.description
          }
        };

        const result = await facilityCollection.updateOne(filter, updateDoc);
        res.json(result);
      } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Failed to update facility details" });
      }
    });

    // ==========================================
    // DELETE A FACILITY BY ID
    // ==========================================
    app.delete('/facility/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await facilityCollection.deleteOne(query);
        res.json(result);
      } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Failed to delete facility entry" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running fine!')
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
})