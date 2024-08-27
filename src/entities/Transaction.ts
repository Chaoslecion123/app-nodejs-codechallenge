import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum TransactionStatus {
  PENDING = "pendiente",
  APPROVED = "aprobado",
  REJECTED = "rechazado"
}

@ObjectType()
@Entity()
export class Transaction {

  @Field() 
  @PrimaryGeneratedColumn("uuid")
  transactionExternalId: string;

  @Field() 
  @Column()
  accountExternalIdDebit: string;

  @Field() 
  @Column()
  accountExternalIdCredit: string;

  @Field() 
  @Column()
  tranferTypeId: number;

  @Field() 
  @Column()
  value: number;

  @Field() 
  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  transactionStatus: TransactionStatus;

  @Field() 
  @CreateDateColumn()
  createdAt: Date;
}
