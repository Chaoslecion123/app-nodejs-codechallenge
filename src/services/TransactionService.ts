import { AppDataSource } from "../../data-source";
import { consumer, producer } from "../kafka";
import { Transaction, TransactionStatus } from "../entities/Transaction";

export const processTransaction = async () => {
  await consumer.subscribe({ topic: "transaction-created" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transaction: Transaction = JSON.parse(message.value!.toString());
      const transactionRepository = AppDataSource.getRepository(Transaction);

      if (transaction.value > 1000) {
        transaction.transactionStatus = TransactionStatus.REJECTED;
      } else {
        transaction.transactionStatus = TransactionStatus.APPROVED;
      }

      await transactionRepository.save(transaction);

      await producer.send({
        topic: "transaction-status-updated",
        messages: [{ value: JSON.stringify(transaction) }],
      });
    },
  });
};
