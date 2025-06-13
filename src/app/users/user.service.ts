import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface User {
    id: number;
    name : string;
    surname : string;
    phone: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _apiURL = 'http://localhost:51999/api/users'; // URL del backend .NET

    constructor(private _http: HttpClient) {}

    // Ottieni la lista utenti 
    getUsers(): Observable<User[]>{
        return this._http.get<User[]>(this._apiURL);
    }

    // Ottieni dettagli utente
    getUserById(id:number): Observable<User> {
        return this._http.get<User>(`${this._apiURL}/${id}`);
    }

    // Modificare utente
    updateUser(id:number, userData: Partial<User>): Observable<User> {
        return this._http.put<User>(`${this._apiURL}/${id}`, userData)
    }

    // Elimina utente
    deleteUser(id: number): Observable<void> {
        return this._http.delete<void>(`${this._apiURL}/${id}`)
    }

    // Crea nuovo utente
    createUser(user: User) : Observable<User> {
        return this._http.post<User>(this._apiURL, user);
    }
}