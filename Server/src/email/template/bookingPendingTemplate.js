export const bookingPendingTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial; background:#f4f6f8; padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
    
    <div style="background:#2196f3;color:#fff;padding:20px;text-align:center;">
      <h2>Booking Request Received</h2>
    </div>

    <div style="padding:20px;color:#333;">
      <p>Hi <strong>${data.name ?? ""}</strong>,</p>

      <p>Your booking request has been successfully submitted.</p>
      <p>The hotel will contact you shortly.</p>

      <div style="background:#f9fafb;padding:15px;border-radius:8px;margin:15px 0;">
        <p><strong>Hotel:</strong> ${data.hotelName}</p>
        <p><strong>Room:</strong> ${data.roomType}</p>
        <p><strong>Check-in:</strong> ${data?.checkInDate ? new Date(data?.checkInDate).toISOString().split("T")[0]:""}</p>
        <p><strong>Check-out:</strong> ${data?.checkOutDate ? new Date(data?.checkOutDate).toISOString().split("T")[0]:""}</p>
        <p><strong>Guests:</strong> ${data.guests}</p>
      </div>

      <p>Thank you for choosing us 🙌</p>
    </div>

    <div style="text-align:center;font-size:12px;color:#888;padding:15px;">
      © 2026 Booking Platform
    </div>

  </div>
</body>
</html>
`;