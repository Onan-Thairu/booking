CREATE OR ALTER PROCEDURE getFlightBookings(@id VARCHAR(50))
AS
BEGIN
  SELECT * FROM FlightBookings WHERE id=@id AND isDeleted='0'
END