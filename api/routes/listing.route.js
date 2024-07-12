import express from 'express';
import { CreateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
// we use verifyToken to check if the person authenticated or not
router.post('/create', verifyToken ,CreateListing)

export default router