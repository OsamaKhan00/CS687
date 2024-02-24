const expoAccessToken = require("../../config/config.json").expoAccessToken;
const { Expo } = require("expo-server-sdk");

exports.sendNotification = async (
  expoPushToken,
  notificationtitle,
  notificationtText
) => {
  let messages = [];
  const expo = new Expo({ accessToken: expoAccessToken });
  messages.push({
    to: expoPushToken,
    sound: "default",
    title: notificationtitle,
    body: notificationtText,
    data: { notificationtText: notificationtText },
  });
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  let response = "";

  for (const ticket of tickets) {
    if (ticket.status === "error") {
      if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
        response = "DeviceNotRegistered";
      }
    }

    if (ticket.status === "ok") {
      response = ticket.id;
    }
  }

  return response;
};
