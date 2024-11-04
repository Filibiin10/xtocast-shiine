import pool from '../db/db.js';

// Shaqada helidda dhammaan qaybaha
export const getAllCategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
};

// Helitaanka qayb gaar ah
export const getCategoryById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category', error });
    }
};

// Abuuridda qayb cusub
export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ id: result.insertId, name, description });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Cusbooneysiinta qayb
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const [result] = await pool.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Tirtiridda qayb
export const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
