const { MinPriorityQueue } = require("@datastructures-js/priority-queue");

// Made my own personalized PriorityQueue DS to handle notifications based on its priority
// Here are the methods of the PQ:
//     add(): adds a notification to the priority queue
//     processDueNotifications(): this method checks all the notifications of the queue and sends them if it is its asigned time in order of priority
//     loadFromDatabase(): Literally gets a list of active notification from the DB and enqueue them to the PQ
//     size(): returns the size of the PQ

class NotificationPriorityQueue {
  //For the constructor you'll make 3 things: The Socket IO socket to send notis, the priority queue by itself and prisma
  constructor(io, prisma) {
    this.queue = new MinPriorityQueue((notification) => notification.priority);
    this.io = io;
    this.prisma = prisma;
  }

  //The add method will enqueue the norification
  add(notification) {
    this.queue.enqueue(notification);
  }

  //Process functions for notifications that havent been sent
  async processDueNotifications() {
    const now = new Date();

    //Take all the notifications of the list in the queue order
    while (!this.queue.isEmpty()) {
      const next = this.queue.front();

      if (next.scheduledAt <= now) {
        const notification = this.queue.dequeue();

        //If the notification is valid it'll be send trough the user Socket IO channel defined by his id
        this.io.to(notification.userId).emit("notification", {
          id: notification.id,
          message: notification.message,
          type: notification.type,
          appointmentId: notification.appointmentId,
        });

        // Edit the notification to mark it as sent
        await this.prisma.notification.update({
          where: { id: notification.id },
          data: { sent: true },
        });
      } else {
        //If its not time yet to send notification just ignore it
        break;
      }
    }
  }

  //Function to fetch notifications from the database and push them into the queue
  //You pass down the notifications array to add them
  loadFromDatabase(notifications) {
    notifications.forEach((notification) => {
      this.add(notification);
    });
  }

  size() {
    return this.queue.size();
  }
}

module.exports = NotificationPriorityQueue;
