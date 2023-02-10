CREATE OR ALTER PROCEDURE InsertOrUpdate(
  @id VARCHAR(50), @name VARCHAR(100)=NULL, @email VARCHAR(100)=NULL,
  @destination VARCHAR(100)=NULL, @date DATE)
AS
BEGIN
  IF EXISTS (SELECT * FROM FlightBookings WHERE id=@id AND isDeleted='0')
BEGIN
  UPDATE FlightBookings SET Name=@name, Email=@email, Destination=@destination, TravelDate=@date
  WHERE id=@id
END
ELSE
BEGIN
  INSERT INTO FlightBookings(id, Name, Email, Destination, TravelDate)
  VALUES(@id, @name, @email, @destination, @date)
END
END