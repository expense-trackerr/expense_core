import express from 'express';
import { createUser } from '../controller/users';

const router = express.Router();

// Saves user to the database
router.post('/save-user', createUser);

module.exports = router;
