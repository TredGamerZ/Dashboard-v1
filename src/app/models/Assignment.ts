/**
 * Created by tgz on 08/01/17.
 */
export class Assignment{
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  get date(): Date {
    return this._date;
  }

  constructor(id: string, title: string, dueDate: Date, date: Date) {
    this._id = id;
    this._title = title;
    this._dueDate = dueDate;
    this._date = date;
  }

  private _id: string;
  private _title: string;
  private _dueDate: Date;
  private _date: Date;

}
