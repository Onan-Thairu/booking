CREATE PROCEDURE registerUser(
  @id VARCHAR(100), @name VARCHAR(200), @email VARCHAR(300), @password VARCHAR(150))
AS
BEGIN
  INSERT INTO UserTable(id, Name, Email, Password)
  VALUES(@id, @name, @email, @password)
END
