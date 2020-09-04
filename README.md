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

Can test production build using the command `http-server -p 8080 -c-1 dist/`

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

* Done - Convert to Progresssive Web Application so it can run without internet access
* Done - Save the weather conditions during rifle zeroing.  Adapt current elevation zero to current weather conditions
* Done - Export/Import of data store (weather, target, firearms, & rounds) to JSON file for sending to another device or user
* Done - Convert to RxJs Event Driven design
* Done - Choose Meters or Yards
* Done - Cleanup UI flex box code
* Done - Chart highlights both transonic and subsonic speeds
* Done - Fix Drop and Slant charts
* Done - Ranging distance using known target size compared to size measured in reticle
* New module for tracking shots fired (shooting log)
  * Should track firearm, load, weather, velocity, accuracy (inches from group center), notes
    * Accuracy should not be inches from point of aim, because that is more related to a correct zero, shooter ability, and weather reading than ammo accuracy
  * Can help with tracking barrel life, best loads

### Other Ideas for Later Addition

* clicksToReachMaximumPointBlankRangeZero
* maxPointBlankRangeZeroYards
* maximumPointBlankRange
* optimalRiflingTwist (requires asking user for bullet length which would not be known unless reloading or pulling a bullet to measure)
* rifleRecoilVelocity (requires rifle weight and powder weight - Powder weight would not be known unless reloading)
* rifleRecoilEnergy (requires rifle weight and powder weight - Powder weight would not be known unless reloading)
* sectionalDensity (requires bullet diameter)
* What about making all the calculators available?
  * degreesToRadians
  * inchesToIPHY
  * inchesToMil
  * inchesToMinutesOfAngle
  * milesPerHourToInchesPerSecond
  * radiansToDegrees
  * secant
  * weightDensityOfAir (at different altitudes)
