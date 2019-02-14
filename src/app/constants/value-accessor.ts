import { Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FsAddressSearchComponent } from './../components/fs-address-search/fs-address-search.component';


export const SEARCH_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: false,
  useExisting: forwardRef(() => FsAddressSearchComponent),
};


