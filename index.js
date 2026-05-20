// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// dotenv.config()

// const uri = process.env.MONGODB_URI;

// const app = express()
// const PORT = process.env.PORT

// app.use(cors())
// app.use(express.json())

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {

//     await client.connect();

//     const db = client.db('sportnest');
//     const facilityCollection = db.collection('facility');

//     app.get('/facility', async (req, res) => {
//       const result = await facilityCollection.find().toArray();
//       res.json(result);
//     });

//     app.post('/facility', async (req, res) => {
//       const facility = req.body
//       console.log(facility);

//       const result = await facilityCollection.insertOne(facility)

//       res.json(result)
//     })

//     app.get('/facility/:id', async (req, res) => {
//       const {id} = req.params;

//       const result = await facilityCollection.findOne({_id: new ObjectId(id)})

//       res.json(result)
//     })

//     // ==========================================
//     // UPDATE A FACILITY BY ID
//     // ==========================================
//     app.put('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         // Remove _id field if it was passed from the frontend to avoid immutable field errors
//         delete updatedData._id;

//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = {
//           $set: {
//             name: updatedData.name,
//             facility_type: updatedData.facility_type,
//             location: updatedData.location,
//             price_per_hour: Number(updatedData.price_per_hour),
//             capacity: Number(updatedData.capacity),
//             // Handles both pre-split array arrays or string objects parsed directly from forms
//             available_slots: Array.isArray(updatedData.available_slots) 
//               ? updatedData.available_slots 
//               : updatedData.available_slots.split(',').map(slot => slot.trim()),
//             image: updatedData.image,
//             description: updatedData.description
//           }
//         };

//         const result = await facilityCollection.updateOne(filter, updateDoc);
//         res.json(result);
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ error: "Failed to update facility details" });
//       }
//     });

//     // ==========================================
//     // DELETE A FACILITY BY ID
//     // ==========================================
//     app.delete('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await facilityCollection.deleteOne(query);
//         res.json(result);
//       } catch (error) {
//         console.error("Delete error:", error);
//         res.status(500).json({ error: "Failed to delete facility entry" });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('Server is running fine!')
// })

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);

// })



// ****************************************************




// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// dotenv.config()

// const uri = process.env.MONGODB_URI;

// const app = express()
// const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT env is empty

// app.use(cors())
// app.use(express.json())

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();

//     const db = client.db('sportnest');
//     const facilityCollection = db.collection('facility');
//     const bookingCollection = db.collection('bookings'); // New collection for reservations

//     // ==========================================
//     // GET ALL FACILITIES
//     // ==========================================
//     app.get('/facility', async (req, res) => {
//       const result = await facilityCollection.find().toArray();
//       res.json(result);
//     });

//     // ==========================================
//     // ADD A NEW FACILITY
//     // ==========================================
//     app.post('/facility', async (req, res) => {
//       const facility = req.body;
//       console.log(facility);
//       const result = await facilityCollection.insertOne(facility);
//       res.json(result);
//     });

//     // ==========================================
//     // GET A SINGLE FACILITY BY ID
//     // ==========================================
//     app.get('/facility/:id', async (req, res) => {
//       const { id } = req.params;
//       const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
//       res.json(result);
//     });

//     // ==========================================
//     // UPDATE A FACILITY BY ID
//     // ==========================================
//     app.put('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         delete updatedData._id; // Prevent immutable field errors

//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = {
//           $set: {
//             name: updatedData.name,
//             facility_type: updatedData.facility_type,
//             location: updatedData.location,
//             price_per_hour: Number(updatedData.price_per_hour),
//             capacity: Number(updatedData.capacity),
//             available_slots: Array.isArray(updatedData.available_slots)
//               ? updatedData.available_slots
//               : updatedData.available_slots.split(',').map(slot => slot.trim()),
//             image: updatedData.image,
//             description: updatedData.description
//           }
//         };

//         const result = await facilityCollection.updateOne(filter, updateDoc);
//         res.json(result);
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ error: "Failed to update facility details" });
//       }
//     });

//     // ==========================================
//     // DELETE A FACILITY BY ID
//     // ==========================================
//     app.delete('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await facilityCollection.deleteOne(query);
//         res.json(result);
//       } catch (error) {
//         console.error("Delete error:", error);
//         res.status(500).json({ error: "Failed to delete facility entry" });
//       }
//     });

//     // ==========================================
//     // NEW: SUBMIT A BOOKING
//     // ==========================================
//     app.post('/booking', async (req, res) => {
//       try {
//         const bookingData = req.body;
//         const result = await bookingCollection.insertOne(bookingData);
//         res.status(201).json(result);
//       } catch (error) {
//         console.error("Booking error:", error);
//         res.status(500).json({ error: "Failed to save booking details" });
//       }
//     });

//     // ==========================================
//     // GET BOOKINGS FOR A SPECIFIC USER BY EMAIL
//     // ==========================================
//     app.get('/booking/:email', async (req, res) => {
//       try {
//         const { email } = req.params;
//         const query = { userEmail: email };

//         // Sorts by newest bookings first
//         const result = await bookingCollection.find(query).sort({ bookedAt: -1 }).toArray();
//         res.json(result);
//       } catch (error) {
//         console.error("Fetch bookings error:", error);
//         res.status(500).json({ error: "Failed to fetch user bookings" });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Keep backend connection open
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Server is running fine!')
// });

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });


// ******************************************************


// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// dotenv.config()

// const uri = process.env.MONGODB_URI;

// const app = express()
// const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT env is empty

// app.use(cors())
// app.use(express.json())

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();

//     const db = client.db('sportnest');
//     const facilityCollection = db.collection('facility');
//     const bookingCollection = db.collection('bookings'); // New collection for reservations

//     // ==========================================
//     // GET ALL FACILITIES
//     // ==========================================
//     app.get('/facility', async (req, res) => {
//       const result = await facilityCollection.find().toArray();
//       res.json(result);
//     });

//     // ==========================================
//     // ADD A NEW FACILITY
//     // ==========================================
//     app.post('/facility', async (req, res) => {
//       const facility = req.body;
//       console.log(facility);
//       const result = await facilityCollection.insertOne(facility);
//       res.json(result);
//     });

//     // ==========================================
//     // GET A SINGLE FACILITY BY ID
//     // ==========================================
//     app.get('/facility/:id', async (req, res) => {
//       const { id } = req.params;
//       const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
//       res.json(result);
//     });

//     // ==========================================
//     // UPDATE A FACILITY BY ID
//     // ==========================================
//     app.put('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         delete updatedData._id; // Prevent immutable field errors

//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = {
//           $set: {
//             name: updatedData.name,
//             facility_type: updatedData.facility_type,
//             location: updatedData.location,
//             price_per_hour: Number(updatedData.price_per_hour),
//             capacity: Number(updatedData.capacity),
//             available_slots: Array.isArray(updatedData.available_slots)
//               ? updatedData.available_slots
//               : updatedData.available_slots.split(',').map(slot => slot.trim()),
//             image: updatedData.image,
//             description: updatedData.description
//           }
//         };

//         const result = await facilityCollection.updateOne(filter, updateDoc);
//         res.json(result);
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ error: "Failed to update facility details" });
//       }
//     });

//     // ==========================================
//     // DELETE A FACILITY BY ID
//     // ==========================================
//     app.delete('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await facilityCollection.deleteOne(query);
//         res.json(result);
//       } catch (error) {
//         console.error("Delete error:", error);
//         res.status(500).json({ error: "Failed to delete facility entry" });
//       }
//     });

//     // ==========================================
//     // SUBMIT A BOOKING
//     // ==========================================
//     app.post('/booking', async (req, res) => {
//       try {
//         const bookingData = req.body;
//         const result = await bookingCollection.insertOne(bookingData);
//         res.status(201).json(result);
//       } catch (error) {
//         console.error("Booking error:", error);
//         res.status(500).json({ error: "Failed to save booking details" });
//       }
//     });

//     // ==========================================
//     // GET BOOKINGS FOR A SPECIFIC USER BY EMAIL
//     // ==========================================
//     app.get('/booking/:email', async (req, res) => {
//       try {
//         const { email } = req.params;
//         const query = { userEmail: email };

//         // Sorts by newest bookings first
//         const result = await bookingCollection.find(query).sort({ bookedAt: -1 }).toArray();
//         res.json(result);
//       } catch (error) {
//         console.error("Fetch bookings error:", error);
//         res.status(500).json({ error: "Failed to fetch user bookings" });
//       }
//     });

//     // ==========================================
//     // NEW: CANCEL/DELETE A BOOKING BY ID
//     // ==========================================
//     app.delete('/booking/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await bookingCollection.deleteOne(query);
        
//         if (result.deletedCount === 1) {
//           res.json({ success: true, message: "Booking successfully cancelled" });
//         } else {
//           res.status(404).json({ error: "Booking record not found" });
//         }
//       } catch (error) {
//         console.error("Cancel booking error:", error);
//         res.status(500).json({ error: "Failed to cancel the reservation slot" });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Keep backend connection open
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Server is running fine!')
// });

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
// });


// **************************************************************

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// dotenv.config();

// const uri = process.env.MONGODB_URI;

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();

//     const db = client.db('sportnest');
//     const facilityCollection = db.collection('facility');
//     const bookingCollection = db.collection('bookings');

//     // ==========================================
//     // GET ALL FACILITIES (WITH SEARCH & FILTER)
//     // ==========================================
//     app.get('/facility', async (req, res) => {
//       try {
//         const { search, type } = req.query;
//         let query = {};

//         // 1. Case-insensitive search match for partial/full names
//         if (search) {
//           query.name = { $regex: search, $options: 'i' };
//         }

//         // 2. Filter exact or partial matching sport categories
//         if (type && type !== 'all') {
//           query.facility_type = { $regex: `^${type}$`, $options: 'i' };
//         }

//         const result = await facilityCollection.find(query).toArray();
//         res.json(result);
//       } catch (error) {
//         console.error("Fetch facilities error:", error);
//         res.status(500).json({ error: "Failed to fetch facilities" });
//       }
//     });

//     // ==========================================
//     // ADD A NEW FACILITY
//     // ==========================================
//     app.post('/facility', async (req, res) => {
//       const facility = req.body;
//       const result = await facilityCollection.insertOne(facility);
//       res.json(result);
//     });

//     // ==========================================
//     // GET A SINGLE FACILITY BY ID
//     // ==========================================
//     app.get('/facility/:id', async (req, res) => {
//       const { id } = req.params;
//       const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
//       res.json(result);
//     });

//     // ==========================================
//     // UPDATE A FACILITY BY ID
//     // ==========================================
//     app.put('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         delete updatedData._id; // Prevent immutable field modifications

//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = {
//           $set: {
//             name: updatedData.name,
//             facility_type: updatedData.facility_type,
//             location: updatedData.location,
//             price_per_hour: Number(updatedData.price_per_hour),
//             capacity: Number(updatedData.capacity),
//             available_slots: Array.isArray(updatedData.available_slots)
//               ? updatedData.available_slots
//               : updatedData.available_slots.split(',').map(slot => slot.trim()),
//             image: updatedData.image,
//             description: updatedData.description
//           }
//         };

//         const result = await facilityCollection.updateOne(filter, updateDoc);
//         res.json(result);
//       } catch (error) {
//         console.error("Update error:", error);
//         res.status(500).json({ error: "Failed to update facility details" });
//       }
//     });

//     // ==========================================
//     // DELETE A FACILITY BY ID
//     // ==========================================
//     app.delete('/facility/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await facilityCollection.deleteOne(query);
//         res.json(result);
//       } catch (error) {
//         console.error("Delete error:", error);
//         res.status(500).json({ error: "Failed to delete facility entry" });
//       }
//     });

//     // ==========================================
//     // SUBMIT A BOOKING
//     // ==========================================
//     app.post('/booking', async (req, res) => {
//       try {
//         const bookingData = req.body;
//         const result = await bookingCollection.insertOne(bookingData);
//         res.status(201).json(result);
//       } catch (error) {
//         console.error("Booking error:", error);
//         res.status(500).json({ error: "Failed to save booking details" });
//       }
//     });

//     // ==========================================
//     // GET BOOKINGS FOR A SPECIFIC USER BY EMAIL
//     // ==========================================
//     app.get('/booking/:email', async (req, res) => {
//       try {
//         const { email } = req.params;
//         const query = { userEmail: email };
//         const result = await bookingCollection.find(query).sort({ bookedAt: -1 }).toArray();
//         res.json(result);
//       } catch (error) {
//         console.error("Fetch bookings error:", error);
//         res.status(500).json({ error: "Failed to fetch user bookings" });
//       }
//     });

//     // ==========================================
//     // CANCEL/DELETE A BOOKING BY ID
//     // ==========================================
//     app.delete('/booking/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const query = { _id: new ObjectId(id) };
//         const result = await bookingCollection.deleteOne(query);
        
//         if (result.deletedCount === 1) {
//           res.json({ success: true, message: "Booking successfully cancelled" });
//         } else {
//           res.status(404).json({ error: "Booking record not found" });
//         }
//       } catch (error) {
//         console.error("Cancel booking error:", error);
//         res.status(500).json({ error: "Failed to cancel the reservation slot" });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Keep connection persistent
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Server is running fine!')
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ***********************************************************************


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

async function run() {
  try {
    await client.connect();

    const db = client.db('sportnest');
    const facilityCollection = db.collection('facility');
    const bookingCollection = db.collection('bookings');

    // ==========================================
    // GET UNIQUE SPORT TYPES DYNAMICALLY FROM DB
    // ==========================================
    app.get('/facility-types', async (req, res) => {
      try {
        // Scans all documents and returns an array of unique sports strings 
        // e.g., ["basketball", "volleyball", "swimming", "gym"]
        const types = await facilityCollection.distinct('facility_type');
        res.json(types);
      } catch (error) {
        console.error("Fetch facility types error:", error);
        res.status(500).json({ error: "Failed to fetch sport categories" });
      }
    });

    // ==========================================
    // GET ALL FACILITIES (WITH SEARCH & FILTER)
    // ==========================================
    app.get('/facility', async (req, res) => {
      try {
        const { search, type } = req.query;
        let query = {};

        // Case-insensitive regex for partial or full phrase searching
        if (search) {
          query.name = { $regex: search, $options: 'i' };
        }

        // Exact line match anchor tracking to avoid overlap filtering
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

    // ==========================================
    // ADD A NEW FACILITY
    // ==========================================
    app.post('/facility', async (req, res) => {
      const facility = req.body;
      const result = await facilityCollection.insertOne(facility);
      res.json(result);
    });

    // ==========================================
    // GET A SINGLE FACILITY BY ID
    // ==========================================
    app.get('/facility/:id', async (req, res) => {
      const { id } = req.params;
      const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    // ==========================================
    // UPDATE A FACILITY BY ID
    // ==========================================
    app.put('/facility/:id', async (req, res) => {
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

    // ==========================================
    // SUBMIT A BOOKING
    // ==========================================
    app.post('/booking', async (req, res) => {
      try {
        const bookingData = req.body;
        const result = await bookingCollection.insertOne(bookingData);
        res.status(201).json(result);
      } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ error: "Failed to save booking details" });
      }
    });

    // ==========================================
    // GET BOOKINGS FOR A SPECIFIC USER BY EMAIL
    // ==========================================
    app.get('/booking/:email', async (req, res) => {
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

    // ==========================================
    // CANCEL/DELETE A BOOKING BY ID
    // ==========================================
    app.delete('/booking/:id', async (req, res) => {
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