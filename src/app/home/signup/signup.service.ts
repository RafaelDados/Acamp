import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { NewUser } from 'src/app/core/user/new-user';

const API_URL = "https://acamp.herokuapp.com/";

@Injectable({ providedIn: 'root' })
export class SignUpService {

    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string) {
        return this.http.get(API_URL + 'user/check?username=' + userName);
    }

    checkEmailTaken(email: string) {
        return this.http.get(API_URL + 'user/check?email=' + email);
    }

    signup( newUser: NewUser ){
        return this.http.post(API_URL + 'user', newUser);
    }
}