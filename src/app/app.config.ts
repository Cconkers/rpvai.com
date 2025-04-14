// Angular imports
import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Angular Material imports
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Firebase imports
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

// ngx-translate imports
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";

// Angular i18n locale
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

// lottie imports
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => {
        const translate = inject(TranslateService);
        return translate.currentLang || 'en';
      },
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'landing-rpv',
        appId: '1:1088737392769:web:3f4a0c88af91da461b7580',
        storageBucket: 'landing-rpv.firebasestorage.app',
        apiKey: 'AIzaSyAwfwJepLdIinPmkVhepJyL3_qeNKLLEuc',
        authDomain: 'landing-rpv.firebaseapp.com',
        messagingSenderId: '1088737392769',
        measurementId: 'G-BNVVC9KRKM',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideLottieOptions({
      player: () => player,
    }),
  ],
};
