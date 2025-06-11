const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();
const db = admin.database();

// 🔐 Twilio credentials (replace with your own)
const accountSid = "YOUR_TWILIO_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const twilioPhoneNumber = "+YOUR_TWILIO_PHONE"; // Example: +1415XXXXXXX

const client = new twilio(accountSid, authToken);

// Cloud Function triggered on new booking
exports.sendBookingSMS = functions.database.ref("/bookings/{bookingId}")
  .onCreate(async (snapshot, context) => {
    const booking = snapshot.val();

    // Get user phone number (you must store this when the user signs up)
    const userId = booking.userId;
    const userSnap = await db.ref(`/users/${userId}`).once("value");
    const user = userSnap.val();

    if (!user || !user.phoneNumber) {
      console.log("No phone number available for user:", userId);
      return null;
    }

    const message = `
Bonjour ${booking.title},
Votre réservation WorkNest pour "${booking.listing_title}" est confirmée.
📅 De ${booking.start} à ${booking.end}
💶 Total : €${booking.price}

À bientôt sur WorkNest !
    `;

    return client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: user.phoneNumber
    }).then(msg => {
      console.log("SMS sent:", msg.sid);
    }).catch(error => {
      console.error("Error sending SMS:", error);
    });
  });