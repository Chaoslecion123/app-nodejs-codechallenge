import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { producer } from "../kafka";
import { AppDataSource } from "../../data-source";
import { Transaction, TransactionStatus } from "../entities/Transaction";

@Resolver()
export class TransactionResolver {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("accountExternalIdDebit") accountExternalIdDebit: string,
    @Arg("accountExternalIdCredit") accountExternalIdCredit: string,
    @Arg("tranferTypeId") tranferTypeId: number,
    @Arg("value") value: number
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
      transactionStatus: TransactionStatus .PENDING,
    });

    await this.transactionRepository.save(transaction);

    await producer.send({
      topic: "transaction-created",
      messages: [{ value: JSON.stringify(transaction) }],
    });

    return transaction;
  }

  @Query(() => Transaction)
  async getTransaction(@Arg("transactionExternalId") transactionExternalId: string): Promise<Transaction | null> {
    return this.transactionRepository.findOneBy({ transactionExternalId });
  }
}
