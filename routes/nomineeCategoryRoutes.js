// // nomineeRoutes.js
// import express from 'express';
// import { getNomineesByCategoryId } from '../models/Events.js'; // Adjust the import based on your file structure

// const router = express.Router();

// // GET /api/nominees?category_id=<categoryId>
// router.get('/', async (req, res) => {
//     const { category_id } = req.query; // Destructure category_id from the query parameters

//     try {
//         if (!category_id) {
//             return res.status(400).json({ error: 'Category ID is required' });
//         }

//         const nominees = await getNomineesByCategoryId(category_id); // Call the function to fetch nominees
//         res.json(nominees);
//     } catch (error) {
//         console.error('Error fetching nominees:', error);
//         res.status(500).json({ error: 'Error fetching nominees' });
//     }
// });

// export default router;
