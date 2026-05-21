@echo off
REM Launches the llm_frameworks script picker.
REM Usage:  run            -> interactive menu
REM         run parallel   -> fuzzy-match a script name and run it
python "%~dp0src\llm_frameworks\run.py" %*
