export class Booking {
  constructor(public id: string,
              public Name: string, 
              public Email:string,
              public Destination: string,
              public TravelDate: Date) {}
}

export class User {
  constructor(public id: string,
              public Name: string, 
              public Email:string,
              public Role: string,
              public Password:string) {}
}