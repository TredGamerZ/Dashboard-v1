/**
 * Created by m on 1/6/2017.
 */
export class userStudent{
  constructor(id: string, name: string, rollno: string, email: string, semester: number, coursesArray: Array<string>) {
    this.id = id;
    this.name = name;
    this.rollno = rollno;
    this.email = email;
    this.semester = semester;
    this.coursesArray = coursesArray;
  }

  id:string;
  name:string;
  rollno:string;
  password:string;
  email:string;
  semester:number;
  coursesArray:Array<string>;
  imgUrl:string;

}
