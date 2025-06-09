import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import sequelize from '../database';
import { v4 as uuidv4 } from 'uuid';

export class UserTicket extends Model<InferAttributes<UserTicket>, InferCreationAttributes<UserTicket>> {
  declare id: CreationOptional<number>;
  declare userTicketId: CreationOptional<string>;
  declare paymentId: string;
  declare email: string;
  declare ticketId: string;
  declare seatNumber: number;
  declare status: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserTicket.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userTicketId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: sequelize,
  modelName: 'UserTicket',
  tableName: 'user_tickets',
  timestamps: true,
});