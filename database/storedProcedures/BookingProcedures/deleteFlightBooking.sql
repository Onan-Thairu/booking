CREATE OR ALTER PROCEDURE deleteFlightBooking(@id VARCHAR(50))
AS
BEGIN
  UPDATE FlightBookings SET isDeleted='1' WHERE id=@id
END
GO