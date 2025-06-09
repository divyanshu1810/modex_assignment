import { Op, Transaction } from '@sequelize/core';
import { UserTicket } from '../dao/userTickets';
import { BookTicketSchema } from '../models/userTickets';

export const markUserTicketAsFailed = async (paymentId: string, time: Date) => {
  return await UserTicket.update(
    { status: 'FAILED' },
    {
      where: {
        status: 'PENDING',
        paymentId: paymentId,
        createdAt: {
          [Op.lt]: time,
        },
      },
    },
  );
};

export const getUserTickets = async (ticketId: number, seatNumbers: number[], transaction: Transaction) => {
  return await UserTicket.findAll({
    where: {
      ticketId: ticketId,
      seatNumber: {
        [Op.in]: seatNumbers,
      },
    },
    transaction,
  });
};

export const insertTickets = async (tickets: BookTicketSchema[], paymentId: string, email: string, transaction: Transaction) => {
  await UserTicket.bulkCreate(
    tickets.map(ticket => ({
      paymentId: paymentId,
      ticketId: ticket.ticketId,
      seatNumber: ticket.seatNumber,
      email: email,
    })),
    {
      ignoreDuplicates: false,
      transaction: transaction,
    },
  );
};
