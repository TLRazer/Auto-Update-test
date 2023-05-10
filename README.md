# Auto Update test

This project uses the electron-builder package to automatically build and release this project on GitHub (https://github.com/TLRazer/Auto-Update-test) and uses electron-updater package to check for new releases and download them when needed.

This project uses npm as its package manager. Yarn can similarly be used on another project to install required packages.

## How to package and release

This project does not need electron-forge to be packaged, as it uses electron-builder for packaging as an installer and releasing it on the GitHub repo.

Note that the app version (referenced in the package.json "version" field) must be higher than the current latest release on the GitHub repository for the new release to be created automatically by electron-builder.

To build and publish the app:

>Make sure your packages are installed and up to date

`npm i`

>Change the github access token referenced in the "build">"publish">"token" field in the package.json file to a valid access token of a user having writing access on the reposirtory

To get your personal Github classic access token, you can generate it by accessing Settings>Developer Settings>Generate new token (https://github.com/settings/tokens).
You must tick the box 'full control of private repositories' for the newly generate token for it to be used to create a new release.

>Launch electron-builder package and release command

Electron-builder package must be added and downloaded for the following command to work.

`electron-builder --win --publish always`

NOTE : GitHub sometimes invalidates tokens used this way. If you get an access error, try again after generating a new access token and updating it in package.json. It may take a few tries.

>The release will now be created as draft (non-accessible to public). Go to the release web page of the project (https://github.com/TLRazer/Auto-Update-test/releases) and click on the automatically drafted release.

>You can modify this release at will. When finished, set this release as latest and publish it.

