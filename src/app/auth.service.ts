import {Injectable} from '@angular/core';
import {RequestOptions} from '@angular/http';

@Injectable()
export class AuthService {

    constructor(private baseOptions: RequestOptions) {
    }

    getToken() {
        var token = localStorage.getItem('token');

        if (!token) {
            var match = window.location.hash.match(/#access_token=(.*?)&/);
            token = match && match[1];
            localStorage.setItem('token', token);
        }

        if (!token) {
            this.authorize();
        }

        this.baseOptions.headers.set('Authorization', 'Bearer ' + token);

        return token;
    }

    authorize() {
        localStorage.removeItem('token');

        let client_id = 'f679092c862b4368802527a8cc0aa0f7';
        let redirect_uri = 'http://localhost:4200/';

        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`);
    }

}
