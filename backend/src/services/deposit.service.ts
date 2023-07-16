import { Deposit } from '../typeorm/entities/deposit.entity';
import { AppDataSource } from '../data-source';
import { User } from '../typeorm/entities/user.entity';

export class DepositService {
  private depositRepository = AppDataSource.getRepository(Deposit);
  private userRepository = AppDataSource.getRepository(User);

  async createDeposit(depositData: Partial<Deposit>): Promise<number> {
    const newDeposit = this.depositRepository.create(depositData);
    newDeposit.depositCreated = new Date();
    const savedDeposit = await this.depositRepository.save(newDeposit);
    const {depositCredit = 0, depositDebit = 0} = savedDeposit;
    const lastBalance = await this.updateUserBalance(savedDeposit.depositUserId, depositCredit, depositDebit);
    return lastBalance;
  }

  async getDepositByUser(userId: number, itemId?: number): Promise<Deposit[]> {
    const where: any = {};
    where.depositUserId = userId;
    if (itemId) {
      where.depositItemId=itemId;
    }
    const depositUsers = await this.depositRepository.find({
      where
    });
    return depositUsers;
  }

  async updateUserBalance(userId: number, credit: number = 0, debit: number = 0): Promise<number> {
    const user = await this.userRepository.findOne({
      where: {
        userId: userId.toString()
      }
    });
    user.userBalance = Number(user.userBalance) + (Number(credit) - Number(debit));
    const updatedUser = await this.userRepository.save(user);
    return updatedUser.userBalance;
  }

}
