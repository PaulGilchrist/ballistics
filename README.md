## Ballistics - Advanced Rifle Ballistics Calculator


### Running Locally
1. Install node from https://nodejs.org/en/download/
2. Install npm
    * npm install -g npm
2. Install important node packages
    1. npm install -g gulp
    2. npm install -g typescript
    3. npm install -g webpack
3. Install GIT from https://git-scm.com/downloads
4. Clone repository to local directory
    * git clone https://github.com/PaulGilchrist/ballistics.git
5. Change to local directory
    * cd ballistics
6. Install all needed packages
    * npm install
7. Build and launch application (debug mode)
    * npm start
8. Alternativly can build and launch application (production mode)
    1. gulp build
    2. cd build
    3. node server.js

### Azure Deployment
* To save some cost, this website is efficient enough to run on the free tier for your App Service Plan
* Must add the setting below to inform Azure to lauch website from 'build' folder rather than from project root folder
    * Project=build
* PHP version set to off
* ARR Affinity set to Off
* Platform set to 64-bit (if running anyt tier above free)
* Always On (if running anyt tier above free)
* Go to Deployment Options, and set to deploy from GitHub repository

### ToDo List
* clicksToReachMaximumPointBlankRangeZero
* maxPointBlankRangeZeroYards
* maximumPointBlankRange
* optimalRiflingTwist
* rifleRecoilVelocity
* rifleRecoilEnergy
* sectionalDensity

What about making all the calculators available?
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