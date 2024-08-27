import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "antifraude-service",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "antifraude-group" });

export const startKafka = async () => {
  await producer.connect();
  await consumer.connect();
};
