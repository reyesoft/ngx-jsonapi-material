# Changelog

## 0.22.62

### Removed

-   Remove range date picker module

## 0.22.61

### Removed

-   From peerDependencies :

```
"@angular/flex-layout": ">= 8.0.0",
"@ngx-formly/core": "^5.5.8",
"@ngx-formly/material": "^5.5.8",
"@ngx-translate/core": "^10.0.2",
"@ngx-translate/http-loader": "^3.0.1",
"ngx-jsonapi": "^2.1.9",
"ngx-uploader": "^8.0.0",
"saturn-datepicker": "^8.0.1",
"localforage": "^1.7.3",
"localforage-getitems": "^1.4.2",
"rxjs": "^6.5.4"
```

## 0.22.60

### Added

-   Hover depending on whether or not there is image in component jam picture manager

## 0.22.59

### Added

-   Support angular and material >= 8

## 0.0.58

### Added

-   Test for the JamSingleWarning component.
-   FabSpeedDialComponent

### Fixed

-   Deleted the initial toogleResource deletion in JamAutocomplete.

### Changed

-   Now, the JamSingleWarning component, is shown if you get the message attribute.

## 0.0.57

### Added

-   EditTextAttributeDialog supports Textarea. Now, pressing enter saves/accepts the changes.

## 0.0.56

### Added

-   Now when a new photo is uploaded to the gallery, it shows a loading animation.

### Changed

-   Now the gallery no longer returns the coded image, instead it returns a jsonapi resource.

### Fixed

-   Corrected the route of the images, when you want to update an existing one.
-   The "@Input() limit", which indicates the maximum number of images in the gallery, now works correctly.

## 0.0.40

Added Error Handler.

## 0.0.1

Migration from [AngularJS ts-angular-jsonapi](https://github.com/reyesoft/ts-angular-jsonapi) to Angular 4.
