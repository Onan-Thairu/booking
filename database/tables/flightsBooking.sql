CREATE DATABASE Airport

CREATE TABLE FlightBookings (
   id VARCHAR(50) ,
   Name VARCHAR(100),
   Email VARCHAR(100) , 
   Destination  VARCHAR(100), 
   TravelDate DATE , 
   isDeleted VARCHAR(10) DEFAULT '0'
)