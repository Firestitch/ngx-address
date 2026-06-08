import { enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FsAclModule } from '@firestitch/acl';
import { FsAddressCountryModule, FsAddressModule, FsAddressRegionCountryModule, FsAddressRegionModule } from '@firestitch/address';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FS_MAP_GOOGLE_MAP_KEY } from '@firestitch/map';
import { FsMessageModule } from '@firestitch/message';

import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

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
      useValue: 'AIzaSyBHt0kOlNhwOlNBAg4cXqIdoSl0Rit48a0',
    },
    provideAnimations(),
    provideRouter([]),
  ],
})
  .catch((err) => console.error(err));

