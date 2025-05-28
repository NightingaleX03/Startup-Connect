import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StartupProfileService {

  constructor(private http: HttpClient) {}

    baseUrl = 'http://localhost:5000/profile'; 

    addStartupProfile(profileData: any) {
        return this.http.post(`${this.baseUrl}/set-profile`, profileData, { withCredentials: true }); 
    }

    getStartupProfile() {
        return this.http.get(`${this.baseUrl}/get-profile`, { withCredentials: true });
    }

    getPitchDeck(pitchText: any) {
        return this.http.post(`${this.baseUrl}/startup-pitch`, pitchText , { withCredentials: true });
    }

}
