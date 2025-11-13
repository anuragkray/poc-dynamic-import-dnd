@echo off
REM Microfrontend V2 Installation and Startup Script for Windows
REM Component-based architecture with separate Header, Sidebar, and MainContent MFEs

echo ========================================
echo Microfrontend V2 Setup and Launch Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "microfrontend" (
    echo Error: microfrontend directory not found
    echo Please run this script from the project root directory
    exit /b 1
)

echo Step 1: Installing Dependencies
echo --------------------------------
echo.

echo Installing dependencies for Host Application...
cd microfrontend\host
call npm install
if errorlevel 1 (
    echo Failed to install Host dependencies
    exit /b 1
)
cd ..\..
echo Host dependencies installed
echo.

echo Installing dependencies for Header MFE...
cd microfrontend\microfrontend-header
call npm install
if errorlevel 1 (
    echo Failed to install Header dependencies
    exit /b 1
)
cd ..\..
echo Header dependencies installed
echo.

echo Installing dependencies for Sidebar MFE...
cd microfrontend\microfrontend-sidebar
call npm install
if errorlevel 1 (
    echo Failed to install Sidebar dependencies
    exit /b 1
)
cd ..\..
echo Sidebar dependencies installed
echo.

echo Installing dependencies for MainContent MFE...
cd microfrontend\microfrontend-maincontent
call npm install
if errorlevel 1 (
    echo Failed to install MainContent dependencies
    exit /b 1
)
cd ..\..
echo MainContent dependencies installed
echo.

echo Step 2: Building Remote Microfrontends
echo ---------------------------------------
echo.

echo Building Header MFE...
cd microfrontend\microfrontend-header
call npm run build
cd ..\..
echo Header built successfully
echo.

echo Building Sidebar MFE...
cd microfrontend\microfrontend-sidebar
call npm run build
cd ..\..
echo Sidebar built successfully
echo.

echo Building MainContent MFE...
cd microfrontend\microfrontend-maincontent
call npm run build
cd ..\..
echo MainContent built successfully
echo.

echo Step 3: Starting Applications
echo ------------------------------
echo.

echo Starting Header MFE on port 5001...
start "Header MFE" cmd /k "cd microfrontend\microfrontend-header && npm run preview"
timeout /t 3 /nobreak >nul

echo Starting Sidebar MFE on port 5002...
start "Sidebar MFE" cmd /k "cd microfrontend\microfrontend-sidebar && npm run preview"
timeout /t 3 /nobreak >nul

echo Starting MainContent MFE on port 5003...
start "MainContent MFE" cmd /k "cd microfrontend\microfrontend-maincontent && npm run preview"
timeout /t 3 /nobreak >nul

echo Starting Host Application on port 5000...
start "Host Application" cmd /k "cd microfrontend\host && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ==========================================
echo All applications started successfully!
echo ==========================================
echo.
echo Access Points:
echo    Host Application:    http://localhost:5000
echo    Header MFE:          http://localhost:5001
echo    Sidebar MFE:         http://localhost:5002
echo    MainContent MFE:     http://localhost:5003
echo.
echo Test Credentials:
echo    Basic User:     username: basic     password: basic123
echo    Standard User:  username: standard  password: standard123
echo    Premium User:   username: premium   password: premium123
echo.
echo To stop all applications, close all the command windows
echo or use Ctrl+C in each window
echo.
pause
