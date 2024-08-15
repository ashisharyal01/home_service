export class FiscalYear {
  id: number;
  status: boolean;
  year: string;

  constructor(id: number, status: boolean, year: string) {
    this.id = id;
    this.status = status
    this.year = year
  }
}
