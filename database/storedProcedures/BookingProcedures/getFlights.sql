CREATE OR ALTER PROCEDURE getFlights
AS
BEGIN
  SELECT Name, Email, Destination, TravelDate 
  FROM FlightBookings 
  WHERE isDeleted='0'
END