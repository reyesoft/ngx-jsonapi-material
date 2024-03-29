# Changelog

## [Unreleased]

## 0.23.5

### Fixed

-   Pipe app date fixed due to an invalid format in Safari Browser ([#133](https://github.com/reyesoft/ngx-jsonapi-material/pull/133))

## 0.23.4

### Fixed

-   Fix the upload files component was throwing the error "failed to execute readAsDataUrl on FileReader parameter 1 not of type Blob ([#134](https://github.com/reyesoft/ngx-jsonapi-material/pull/134))

## 0.23.3

### Fixed

-   Fixed the functionality of the rowDoubleClick of the list base, and it was added that the remoteFilterDefault are the attributes of the resource ([#132](https://github.com/reyesoft/ngx-jsonapi-material/pull/132))

## 0.23.2

### Fixed

-   List base disable query params and removed params fixed ([#130](https://github.com/reyesoft/ngx-jsonapi-material/pull/130))

## 0.23.1

### Fixed

-   List base common access some methods fixed

### Added

-   Lint on circleci added

## 0.23.0

### Changed

-   Angular version upgraded to 10

## 0.22.71

### Added

-   Added infinite scroll

## 0.22.70

### Added

-   Added three dot to p in mobile

## 0.22.69

### Added

-   Added images customized list base common

## 0.22.68

### Fixed

-   Fix in pagination and style of list common base

## 0.22.67

### Fixed

-   Filter for route in list base common corrected

## 0.22.66

### Added

-   It was added to give it a secondary class

## 0.22.65

### Fixed

-   It was fixed that the templates that were created to use in the common base list were duplicated

## 0.22.64

### Added

-   More components were added to public api related to list base common and a component was also added to this

## 0.22.63

### Added

-   List base common added how a component more of library

## 0.22.62

### Fixed

-   yarn:release fix problem with "Package marked as private, not publishing."

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
