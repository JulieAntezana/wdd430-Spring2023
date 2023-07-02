import { Contact } from "../contacts/contact.model";

export class Message {
  public _id: string;
  public id: string;
  
  constructor(
    public subject: string,
    public msgText: string,
    public sender: Contact
  ) {}
}