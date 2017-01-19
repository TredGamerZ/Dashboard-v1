import {isNumber} from "util";
/**
 * Created by m on 1/6/2017.
 */

export class Course{
  constructor(Code: string, ID: string, description: string,sem : number) {
    this.code = Code;
    // this._ID = ID;
    this.description = description;
    this.semester = sem;
  }
  private code : string;
  // private ID :string;
  private description: string;
  private semester:number;

}
