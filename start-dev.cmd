@echo off
rem Double-click to start the BICF demo sites. Close this window (or press Ctrl+C) to stop.
cd /d "%~dp0"
title BICF demos - dev server

where npm >nul 2>nul || (
  echo Node.js is not installed. Get it from https://nodejs.org and try again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo First run: installing dependencies, this takes a minute...
  call npm install || (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting the dev server. Your browser will open when it's ready.
call npm run dev -- --open
pause
