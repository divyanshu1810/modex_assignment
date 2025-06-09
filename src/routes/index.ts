import express from 'express';
import { createUser, getUsers } from '../handlers/users/users';
import authenticateToken from '../helpers/authenticate';
import { validateCreateUser } from '../middlewares/user';
import { createTicket } from '../handlers/tickets/ticket';
import { validateCreateTicket } from '../middlewares/ticket';
import { bookTickets, fetchTickets, updateTicket } from '../handlers/userTickets/userTickets';
import { validateBookTicket } from '../middlewares/userTicket';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the Ticket Booking API' });
});

// User routes
router.post('/users', validateCreateUser, createUser);
router.get('/users', authenticateToken(), getUsers);

// Ticket routes
router.post('/tickets', validateCreateTicket, authenticateToken(), createTicket);
router.get('/tickets', authenticateToken(), fetchTickets);

// User tickets routes
router.post('/user-tickets', validateBookTicket, authenticateToken(), bookTickets);
router.put('/user-tickets/:id', authenticateToken(), updateTicket);

// Let their be a payment route which will on success webhook of the payment gateway will mark the tickets as CONFIRMED
router.post('/payments', authenticateToken(), (_req, res) => {
  // Placeholder for payment processing logic
  res.status(200).json({ message: 'Payment processing is not implemented yet.' });
});



export default router;
