import express from 'express';
import { fetchBatch, createBatch, deleteBatch, getbatchById } from './database.js';

const app = express();
app.use(express.json());

// ---------- YOUR NEW ROUTES HERE ----------

// Backend test route (for frontend connection)
app.get("/test", (req, res) => {
  res.json({ message: "Backend API is working on port 8080!" });
});

// ---------- EXISTING TEAM ROUTES BELOW ----------

// GET all notes (fixed the crash bug)
app.get('/notes', async (req, res) => {
  try {
    const notes = await fetchBatch();
    res.status(200).send(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notes");
  }
});

// POST new note
app.post('/notes', async (req, res) => {
  try {
    const { production, date, quality, beer_type, temperature, employee_id } = req.body;
    const note = await createBatch(production, date, quality, beer_type, temperature, employee_id);
    res.status(201).send(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating note");
  }
});

// ---------- ERROR HANDLER (leave as is) ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ---------- SERVER LISTEN (leave as is) ----------
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
