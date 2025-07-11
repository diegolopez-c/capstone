const NotificationPriorityQueue = require("./NotificationPriorityQueue");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let notificationQueue = null;

// This just makes the instance of the queue separate from the server index to avoid dependency loops

function initNotificationQueue(io) {
  notificationQueue = new NotificationPriorityQueue(io, prisma);
  return notificationQueue;
}

function getNotificationQueue() {
  if (!notificationQueue) {
    throw new Error(
      "NotificationQueue has not been initialized. Call initNotificationQueue(io) first."
    );
  }
  return notificationQueue;
}

module.exports = {
  initNotificationQueue,
  getNotificationQueue,
};
