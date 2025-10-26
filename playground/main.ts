import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FS_MAP_GOOGLE_MAP_KEY } from '@firestitch/map';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsAddressModule, FsAddressRegionModule, FsAddressRegionCountryModule, FsAddressCountryModule } from '@firestitch/address';
import { FsLabelModule } from '@firestitch/label';
import { FsAclModule } from '@firestitch/acl';
import { FsFormModule } from '@firestitch/form';
import { provideRouter } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsAddressModule, FsAddressRegionModule, FsAddressRegionCountryModule, FsLabelModule, FsAclModule, FsAddressCountryModule, FsFormModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), ToastrModule.forRoot({ preventDuplicates: true })),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { floatLabel: 'auto', appearance: 'outline' },
        },
        {
            provide: FS_MAP_GOOGLE_MAP_KEY,
            useValue: 'AIzaSyBigr-zo7xG6tqAiAvpqE2Bh4foHVrrSBE',
        },
        provideAnimations(),
        provideRouter([]),
    ]
})
  .catch(err => console.error(err));

