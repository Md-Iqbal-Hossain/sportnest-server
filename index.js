
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
dotenv.config();

const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const JWKS = createRemoteJWKSet(
  new URL('http://localhost:3000/api/auth/jwks')
)

const verifyToken = async (req, res, next) => {
      const authHeader = req?.headers.authorization;
      if(!authHeader){
        return res.status(401).json({ message: 'Unauthorized'});
      }
      const token = authHeader.split(' ')[1];
      if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
      }

     try {
       const {payload} = await jwtVerify(token, JWKS);
      console.log(payload);
      next()
     } catch (error) {
      return res.status(403).json({message: 'Forbidden'});
     }
    } 

async function run() {
  try {
    await client.connect();

    const db = client.db('sportnest');
    const facilityCollection = db.collection('facility');
    const bookingCollection = db.collection('bookings');

    //featured
    app.get('/featured', async (req, res) => {
      const result = await facilityCollection.find().limit(6).toArray()
      res.json(result)
    })


    // GET UNIQUE SPORT TYPES DYNAMICALLY FROM DB
    app.get('/facility-types', async (req, res) => {
      try {
        // Scans all documents and returns an array of unique sports strings 
        const types = await facilityCollection.distinct('facility_type');
        res.json(types);
      } catch (error) {
        console.error("Fetch facility types error:", error);
        res.status(500).json({ error: "Failed to fetch sport categories" });
      }
    });


    // GET ALL FACILITIES (WITH SEARCH & FILTER)
    app.get('/facility', async (req, res) => {
      try {
        const { search, type } = req.query;
        let query = {};

        if (search) {
          query.name = { $regex: search, $options: 'i' };
        }

        if (type && type !== 'all') {
          query.facility_type = { $regex: `^${type}$`, $options: 'i' };
        }

        const result = await facilityCollection.find(query).toArray();
        res.json(result);
      } catch (error) {
        console.error("Fetch facilities error:", error);
        res.status(500).json({ error: "Failed to fetch facilities" });
      }
    });


    // ADD A NEW FACILITY
    app.post('/facility', verifyToken, async (req, res) => {
      const facility = req.body;
      const result = await facilityCollection.insertOne(facility);
      res.json(result);
    });


    // GET A SINGLE FACILITY BY ID
    app.get('/facility/:id', verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });


    // UPDATE A FACILITY BY ID
    app.put('/facility/:id', verifyToken, async (req, res) => {
      try {
        const { id } = req.params;
        const updatedData = req.body;

        delete updatedData._id; // Safety clear immutable fields

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            name: updatedData.name,
            facility_type: updatedData.facility_type,
            location: updatedData.location,
            price_per_hour: Number(updatedData.price_per_hour),
            capacity: Number(updatedData.capacity),
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

  
    // DELETE A FACILITY BY ID
    app.delete('/facility/:id', verifyToken, async (req, res) => {
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

    // SUBMIT A BOOKING
    app.post('/booking', verifyToken, async (req, res) => {
      try {
        const bookingData = req.body;
        const result = await bookingCollection.insertOne(bookingData);
        res.status(201).json(result);
      } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ error: "Failed to save booking details" });
      }
    });


    // GET BOOKINGS FOR A SPECIFIC USER BY EMAIL
    app.get('/booking/:email', verifyToken, async (req, res) => {
      try {
        const { email } = req.params;
        const query = { userEmail: email };
        const result = await bookingCollection.find(query).sort({ bookedAt: -1 }).toArray();
        res.json(result);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        res.status(500).json({ error: "Failed to fetch user bookings" });
      }
    });


    // CANCEL/DELETE A BOOKING BY ID
    app.delete('/booking/:id', verifyToken, async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await bookingCollection.deleteOne(query);
        
        if (result.deletedCount === 1) {
          res.json({ success: true, message: "Booking successfully cancelled" });
        } else {
          res.status(404).json({ error: "Booking record not found" });
        }
      } catch (error) {
        console.error("Cancel booking error:", error);
        res.status(500).json({ error: "Failed to cancel the reservation slot" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server!");
  } finally {
    // Persistent streaming connection
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running fine!')
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});