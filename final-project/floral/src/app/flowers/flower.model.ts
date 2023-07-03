export class Flower {
  public _id: string;
  public id: string;

  constructor(
    public commonName: string,
    public botanicalName: string,
    public color: string,
    public url: string,
    public imageUrl: string,
    public group?: Flower[] 
  ) {}
}