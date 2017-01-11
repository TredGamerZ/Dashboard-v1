/**
 * Created by m on 1/10/2017.
 */
export class User{

  constructor(id: string, type: number, username: string, password: string, courses: string[],imgUrl:string) {
    this.id = id;
    this.type = type;
    this.username = username;
    this.password = password;
    this.courses = courses;
    this.imgUrl = imgUrl;
  }


  id:string;
  type:number;
  name:string;
  imgUrl:string;
  username:string;
  password:string;
  email:string;
  courses:string[];
  department:string;
  semester:number;

}
