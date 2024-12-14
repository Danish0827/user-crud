const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db");  
const app = express();

app.use(express.json()); 

// POST: Add a new user
app.post("/api/addUser", (req, res) => {
  const { name, email, password, dob } = req.body;

  console.log("Received data:", name, email, password, dob);

  pool.query("SELECT * FROM users WHERE email = ?", [email])
    .then(([rows]) => {
      if (rows.length > 0) {
        throw { status: 400, message: "User with this email already exists" };
      }

      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return pool.query(
        "INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, dob]
      );
    })
    .then(([result]) => {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "User added successfully",
          user: { id: result.insertId, name, email, dob },
        });
      } else {
        throw { status: 500, message: "Failed to add user" };
      }
    })
    .catch((error) => {
      console.error("Error adding user:", error);

      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    });
});


// GET: Retrieve all users
app.get("/api/getUsers", async (req, res) => {
  try {
    const usersQuery = "SELECT user_id, name, email, dob FROM users ORDER BY user_id";

    const [users] = await pool.query(usersQuery); // Destructure the first element for mysql2

    res.status(200).json({ users, rowCount: users.length }); // Adjust for mysql2 format
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// GET: Retrieve a user by ID
app.get("/api/getUserDataById/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    console.log("User ID received:", userid); 

    const userQuery = "SELECT user_id, name, email, dob FROM users WHERE user_id = $1";
    const result = await pool.query(userQuery, [userid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched user data:", result.rows[0]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// PUT: Update user details
app.put("/api/updateUser/:userid", async (req, res) => {
  const { userid } = req.params;
  const { name, email, password, dob } = req.body;

  try {
    const [existingUser] = await pool.query("SELECT * FROM users WHERE user_id = ?", [userid]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : existingUser[0].password;

    const updateUserQuery = `
      UPDATE users
      SET name = ?, email = ?, password = ?, dob = ?
      WHERE user_id = ?
    `;
    await pool.query(updateUserQuery, [name, email, hashedPassword, dob, userid]);

    const [updatedUser] = await pool.query("SELECT user_id, name, email, dob FROM users WHERE user_id = ?", [userid]);

    if (updatedUser.length > 0) {
      res.status(200).json({ message: "User updated successfully", user: updatedUser[0] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
    
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



// DELETE: Remove a user by ID
app.delete("/api/deleteUser/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    const existingUserQuery = "SELECT * FROM users WHERE user_id = ?";
    const [existingUser] = await pool.query(existingUserQuery, [userid]);

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleteUserQuery = "DELETE FROM users WHERE user_id = ?";
    await pool.query(deleteUserQuery, [userid]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = app;
