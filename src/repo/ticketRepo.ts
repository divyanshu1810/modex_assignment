import { Transaction } from '@sequelize/core';
import { Ticket } from '../dao/ticket';

export const getTicketByEmailAndName = async (email: string, name: string, showTime: number) => {
  return await Ticket.findOne({
    where: { createdBy: email, name, showTime },
  });
};

export const getTicketById = async (uuid: number, transaction: Transaction) => {
  return await Ticket.findOne({
    where: {
      uuid: uuid,
    },
    lock: true,
    transaction,
  });
};

export const insertTicket = async (email: string, name: string, showTime: number, price: number, totalSeats: number) => {
  const ticket = await Ticket.create({
    createdBy: email,
    name,
    showTime,
    price,
    totalSeats,
  });
  return ticket;
};

export const getTickets = async (limit: number, offset: number) => {
  return await Ticket.findAll({
    limit: Number(limit),
    offset: Number(offset),
    order: [['createdAt', 'DESC']],
    attributes: {
      exclude: ['createdBy'],
    },
  });
};
