// import { User } from "../dao/user";
// import { Ticket } from "../dao/ticket";
// import { UserTicket } from "../dao/userTickets";
import sequelize from ".";

export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('📊 Syncing database models...');
    
    await sequelize.sync({ 
      force: false,
      alter: true,
    });

    // console.log('Tables :', User.getTableName, Ticket.getTableName, UserTicket.getTableName);
    
    console.log('✅ Database models synced successfully.');
    console.log('📝 Tables created/updated:');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};