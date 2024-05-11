// index.js
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const Guest = require('./models/Guest');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Helper functions for date comparisons
const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

const isInThePast = (someDate) => {
  const today = new Date();
  return someDate < today;
};

const isInTheFuture = (someDate) => {
  const today = new Date();
  return someDate > today;
};

// GET endpoint to retrieve guests and categorize them
app.get('/guests', async (req, res) => {
  try {
    const guests = await Guest.findAll();

    const categorizedGuests = guests.map((guest) => {
      const checkInDate = new Date(guest.checkInDate);
      const departureDate = new Date(guest.departureDate);

      let category;
      if (isToday(checkInDate)) {
        category = 'arrivals';
      } else if (isToday(departureDate)) {
        category = 'departures';
      } else if (isInThePast(checkInDate) && isInTheFuture(departureDate)) {
        category = 'inhouse';
      } else {
        category = 'other';
      }

      return {
        ...guest.dataValues,
        category,
      };
    });

    res.json(categorizedGuests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add a new guest
app.post('/guests', async (req, res) => {
  try {
    const { fullName, roomNumber, pricePerNight, checkInDate, departureDate, description } = req.body;

    // Validate required fields
    if (!fullName || !roomNumber || pricePerNight<0 || !checkInDate || !departureDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new guest record
    const newGuest = await Guest.create({
      fullName,
      roomNumber,
      pricePerNight,
      checkInDate,
      departureDate,
      description,
    });

    // Respond with the newly created guest record
    res.status(201).json(newGuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// PUT endpoint to edit a guest
app.put('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, roomNumber, pricePerNight, checkInDate, departureDate, description } = req.body;

    // Validate required fields
    if (!fullName || !roomNumber || pricePerNight<0 || !checkInDate || !departureDate) {
      console.log(fullName,roomNumber, pricePerNight, checkInDate, departureDate)
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update guest record
    const updatedGuest = await Guest.update({
      fullName,
      roomNumber,
      pricePerNight,
      checkInDate,
      departureDate,
      description,
    }, {
      where: { id }
    });

    // Respond with the updated guest record
    res.status(200).json(updatedGuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint to delete a guest
app.delete('/guests/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete guest record
    const deletedGuest = await Guest.destroy({
      where: { id }
    });

    // Respond with a message
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await sequelize.sync({ force: false });
  console.log(`Server running on http://localhost:${PORT}`);
});
