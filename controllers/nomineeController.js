import pool from '../db/db.js';


// Hel dhammaan nominees
export const getAllNominees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM nominees');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving nominees', error });
    }
};

// Hel nominee gaar ah iyadoo la adeegsanayo ID
export const getNomineeById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM nominees WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Nominee not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving nominee', error });
    }
};

// Abuur nominee cusub
export const createNominee = async (req, res) => {
    const { name, category, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO nominees (name, category, description) VALUES (?, ?, ?)', [name, category, description]);
        res.status(201).json({ id: result.insertId, name, category, description });
    } catch (error) {
        res.status(500).json({ message: 'Error creating nominee', error });
    }
};

// Cusbooneysiinta nominee
export const updateNominee = async (req, res) => {
    const { id } = req.params;
    const { name, category, description } = req.body;
    try {
        const [result] = await pool.query('UPDATE nominees SET name = ?, category = ?, description = ? WHERE id = ?', [name, category, description, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nominee not found' });
        res.json({ message: 'Nominee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating nominee', error });
    }
};

// getNomineesByCategoryId
export const getNomineesByCategoryId = async (categoryId) => {
    const query = 'SELECT * FROM nominees WHERE category_id = ?'; // Adjust the SQL query to match your database schema
    const [rows] = await pool.query(query, [categoryId]); // Use your database pool/querying method

    return rows; // Return the fetched nominees
};


// Tirtirid nominee
export const deleteNominee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM nominees WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Nominee not found' });
        res.json({ message: 'Nominee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting nominee', error });
    }
};
