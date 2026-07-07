const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect Database
const db = new Database("data.db");

// Create Rooms Table
db.prepare(`
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomNumber TEXT NOT NULL,
    type TEXT NOT NULL,
    price REAL NOT NULL,
    status TEXT NOT NULL
)
`).run();

// Create Guests Table
db.prepare(`
CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
)
`).run();

// Create Bookings Table
db.prepare(`
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guestId INTEGER,
    roomId INTEGER,
    checkIn TEXT,
    checkOut TEXT,
    FOREIGN KEY (guestId) REFERENCES guests(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
)
`).run();

console.log("Database Connected Successfully");

// =======================
// ROOMS CRUD
// =======================

// Get All Rooms
app.get("/rooms", (req, res) => {
    try {
        const rooms = db.prepare("SELECT * FROM rooms").all();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Room By ID
app.get("/rooms/:id", (req, res) => {
    try {
        const room = db
            .prepare("SELECT * FROM rooms WHERE id = ?")
            .get(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Room
app.post("/rooms", (req, res) => {

    const {
        roomNumber,
        type,
        price,
        status
    } = req.body;

    if (!roomNumber || !type || !price || !status) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const result = db.prepare(`
            INSERT INTO rooms
            (roomNumber,type,price,status)
            VALUES(?,?,?,?)
        `).run(
            roomNumber,
            type,
            price,
            status
        );

        res.status(201).json({
            message: "Room Added Successfully",
            id: result.lastInsertRowid
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Update Room
app.put("/rooms/:id", (req, res) => {

    const {
        roomNumber,
        type,
        price,
        status
    } = req.body;

    try {

        const result = db.prepare(`
            UPDATE rooms
            SET roomNumber=?,
                type=?,
                price=?,
                status=?
            WHERE id=?
        `).run(
            roomNumber,
            type,
            price,
            status,
            req.params.id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json({
            message: "Room Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Delete Room
app.delete("/rooms/:id", (req, res) => {

    try {

        const result = db.prepare(
            "DELETE FROM rooms WHERE id=?"
        ).run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json({
            message: "Room Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// =======================
// PART 2 STARTS FROM HERE
// Guests CRUD + Bookings CRUD
// =======================// =======================
// GUESTS CRUD
// =======================

// Get All Guests
app.get("/guests", (req, res) => {
    try {
        const guests = db.prepare("SELECT * FROM guests").all();
        res.json(guests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Guest By ID
app.get("/guests/:id", (req, res) => {
    try {
        const guest = db
            .prepare("SELECT * FROM guests WHERE id=?")
            .get(req.params.id);

        if (!guest) {
            return res.status(404).json({
                message: "Guest not found"
            });
        }

        res.json(guest);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Add Guest
app.post("/guests", (req, res) => {

    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const result = db.prepare(`
            INSERT INTO guests(name,phone)
            VALUES(?,?)
        `).run(name, phone);

        res.status(201).json({
            message: "Guest Added Successfully",
            id: result.lastInsertRowid
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Update Guest
app.put("/guests/:id", (req, res) => {

    const { name, phone } = req.body;

    try {

        const result = db.prepare(`
            UPDATE guests
            SET name=?,
                phone=?
            WHERE id=?
        `).run(
            name,
            phone,
            req.params.id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Guest not found"
            });
        }

        res.json({
            message: "Guest Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Delete Guest
app.delete("/guests/:id", (req, res) => {

    try {

        const result = db.prepare(
            "DELETE FROM guests WHERE id=?"
        ).run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Guest not found"
            });
        }

        res.json({
            message: "Guest Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// =======================
// BOOKINGS CRUD
// =======================

// Get All Bookings
app.get("/bookings", (req, res) => {

    try {

        const bookings = db.prepare(`
            SELECT
                bookings.id,
                guests.name AS guestName,
                rooms.roomNumber,
                rooms.type,
                bookings.checkIn,
                bookings.checkOut
            FROM bookings
            JOIN guests ON bookings.guestId = guests.id
            JOIN rooms ON bookings.roomId = rooms.id
        `).all();

        res.json(bookings);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Get Booking By ID
app.get("/bookings/:id", (req, res) => {

    try {

        const booking = db.prepare(`
            SELECT *
            FROM bookings
            WHERE id=?
        `).get(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json(booking);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Add Booking
app.post("/bookings", (req, res) => {

    const {
        guestId,
        roomId,
        checkIn,
        checkOut
    } = req.body;

    if (!guestId || !roomId || !checkIn || !checkOut) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const result = db.prepare(`
            INSERT INTO bookings
            (guestId,roomId,checkIn,checkOut)
            VALUES(?,?,?,?)
        `).run(
            guestId,
            roomId,
            checkIn,
            checkOut
        );

        // Optional: mark room as occupied
        db.prepare(`
            UPDATE rooms
            SET status='Occupied'
            WHERE id=?
        `).run(roomId);

        res.status(201).json({
            message: "Booking Added Successfully",
            id: result.lastInsertRowid
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Update Booking
app.put("/bookings/:id", (req, res) => {

    const {
        guestId,
        roomId,
        checkIn,
        checkOut
    } = req.body;

    try {

        const result = db.prepare(`
            UPDATE bookings
            SET guestId=?,
                roomId=?,
                checkIn=?,
                checkOut=?
            WHERE id=?
        `).run(
            guestId,
            roomId,
            checkIn,
            checkOut,
            req.params.id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// Delete Booking
app.delete("/bookings/:id", (req, res) => {

    try {

        const booking = db.prepare(
            "SELECT roomId FROM bookings WHERE id=?"
        ).get(req.params.id);

        const result = db.prepare(
            "DELETE FROM bookings WHERE id=?"
        ).run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Optional: mark room as available
        if (booking) {
            db.prepare(`
                UPDATE rooms
                SET status='Available'
                WHERE id=?
            `).run(booking.roomId);
        }

        res.json({
            message: "Booking Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});

// =======================
// START SERVER
// =======================

app.listen(PORT, () => {
    console.log(`🚀 Hotel Manager Server running on http://localhost:${PORT}`);
});