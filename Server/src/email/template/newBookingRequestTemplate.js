export const newBookingRequestTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial; background:#f4f6f8; padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
    
    <div style="background:#27ae60;color:#fff;padding:20px;text-align:center;">
      <h2>New Booking Request</h2>
    </div>

    <div style="padding:20px;color:#333;">
      <p>Hello <strong>${data.hotelName ?? ""}</strong>,</p>

      <p>You have received a new booking request.</p>

      <div style="background:#f9fafb;padding:15px;border-radius:8px;margin:15px 0;">
        <p><strong>Guest Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Email:</strong> ${data.phone}</p>
        <p><strong>Room:</strong> ${data.roomType}</p>
        <p><strong>Check-in:</strong> ${data?.checkInDate? new Date(data?.checkInDate).toISOString().split("T")[0]:""}</p>
        <p><strong>Check-out:</strong> ${data?.checkOutDate ? new Date(data?.checkOutDate).toISOString().split("T")[0]:""}</p>
        <p><strong>Guests:</strong> ${data.guests}</p>
      </div>

      <p>Please contact the guest to confirm or decline.</p>
    </div>

    <div style="text-align:center;font-size:12px;color:#888;padding:15px;">
      Stayhub  Notification
    </div>

  </div>
</body>
</html>
`;