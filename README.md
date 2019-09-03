# Ballistics - Advanced Rifle Ballistics Calculator

## Running Locally

1. Install node from https://nodejs.org/en/download/
2. Install npm
    * npm install -g npm
3. Install important node packages
   * npm install -g typescript
   * npm install -g @angular/cli
4. Install GIT from https://git-scm.com/downloads
5. Clone repository to local directory
    * git clone https://github.com/PaulGilchrist/ballistics.git
6. Change to local directory
    * cd ballistics
7. Install all needed packages
    * npm install
8. Build and launch application (debug mode)
    * ng serve

## Azure Deployment

* Create Azure Web App (Free App Service plan tier usually enough for Angular apps)
* Go to Configuration/General Settings and make the following changes to the default settings
  * Platform = 64 Bit (if allowed by app service plan)
  * FTP state  = FTPS only
  * HTTP version = 2.0
  * ARR affinity = Off
* Go to Deployment/Deployment Center/FTP/Dashboard and get the FTPS endpoint, username, and password
* Build Angular project "ng build --prod -c production"
* Use FTPS client to upload contents of "dist" folder into "site\wwwroot" folder

## ToDo List

* clicksToReachMaximumPointBlankRangeZero
* maxPointBlankRangeZeroYards
* maximumPointBlankRange
* optimalRiflingTwist
* rifleRecoilVelocity
* rifleRecoilEnergy
* sectionalDensity
* What about making all the calculators available?
  * getDistanceYards
  * degreesToRadians
  * inchesToIPHY
  * inchesToMil
  * inchesToMinutesOfAngle
  * milesPerHourToInchesPerSecond
  * radiansToDegrees
  * secant
  * speedOfSound (at different altitudes)
  * weightDensityOfAir (at different altitudes)
  * standardRelativeHumidity (at different altitudes)