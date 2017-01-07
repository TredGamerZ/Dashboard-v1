import {isNumber} from "util";
/**
 * Created by m on 1/6/2017.
 */

export class Course{
  constructor(Code: string, ID: string, description: string) {
    this._Code = Code;
    this._ID = ID;
    this._description = description;
  }
  get Code(): string {
    return this._Code;
  }

  set Code(value: string) {
    this._Code = value;
  }

  get ID(): string {
    return this._ID;
  }

  set ID(value: string) {
    this._ID = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  private _Code : string;
  private _ID :string;
  private _description: string;


}
