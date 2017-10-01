# Docker ReadMe
## Docker Setup on Windows 10 Aniversary Edition PC
1.	Setup Docker following [Microsoft’s documentation](https://msdn.microsoft.com/en-us/virtualization/windowscontainers/quick_start/quick_start_windows_10)
2.	Add registry setting using PowerShell if testing on Windows 10
    Set-ItemProperty -Path 'HKLM:SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers' -Name VSmbDisableOplocks -Type DWord -Value 1 -Force
## Create a NodeJS container running within Microsoft Nano server
3.  There are three options to complete this step.  It is safe to skip this step.  If step 3 is skipped, step 4 will execute 3a automatically.
    a. Pull existing image from docker hub with the command "docker pull paulgilchrist/node:nano"
    b. Pull the source code for building the node:nano package and follow the instructions in that project
        "git clone https://github.com/PaulGilchrist/DockerWindowsNode.git"
    c. Create the project from scratch using the following steps:
        1. Create a dockerBuild.cmd file containing the following code
            SET containerFolder=c:\temp\container
            :: Remove the old image if it exists before creating a new image
            docker rmi paulgilchrist/node:nano
            ::Create a temporary folder and copy in all the files needed for the new container
            md %containerFolder%
            xcopy "c:\program files\nodejs\*.*" %containerFolder%\nodejs\*.* /s
            copy Dockerfile %containerFolder%\
            :: Build the new container
            docker build -t paulgilchrist/node:nano %containerFolder%
            :: Cleanup the temporary folder
            rd %containerFolder% /S /Q
            ::docker login
            ::docker push paulgilchrist/node:nano
        2. Create a DockerFile containing the following 2 lines
            FROM microsoft/nanoserver
            COPY nodejs /windows/system32
        3. Run dockerBuild.cmd to create new docker image from nanoserver adding in node js
            * Assumes NodeJS has been installed on local computer.  If not, download and install it from [nodejs.org](https://nodejs.org/en/download/)
4.  Choose if you want Windows Nano running IIS, Windows Nano running NodeJS, or Alpine Linux running NodeJS and use the build command from the appropriate Dockerfile
5.  Run the image using the run command from the appropriate Dockerfile
6.  Inspect the running container to ditermine its IP address using the command "docker inspect <container id>"
5.	Test the container using the command "http://<container ip>:3000"
6.	Stop the container and remove it from memory by using the following command "docker rm -f <container id>"

If it is ever required to remove all stopped containers, it can be done with the following command:
    FOR /f "tokens=*" %i IN ('docker ps -a -q') DO docker rm %i

