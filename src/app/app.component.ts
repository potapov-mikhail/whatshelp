import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { DATA } from './data';

const FIRST_SEANCE_KEY = 'is-first-seance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
    const isFirstSeance = !this.localStorageService.getItem(FIRST_SEANCE_KEY);

    if (isFirstSeance) {
      Object.keys(DATA).forEach((key) => {
        this.localStorageService.setItem(key, DATA[key]);
      });

      this.localStorageService.setItem(FIRST_SEANCE_KEY, true);
    }
  }
}
