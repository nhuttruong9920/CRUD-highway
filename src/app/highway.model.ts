export class Highway {
  public name: string;
  public description: string;
  public maxSpeed: number;
  public inactive: boolean;
  public id: string;

  constructor(
    name: string,
    maxSpeed: number,
    description: string,
    inactive: boolean,
    id: string
  ) {
    this.name = name;
    this.description = description;
    this.maxSpeed = maxSpeed;
    this.inactive = inactive;
    this.id = id;
  }
}
