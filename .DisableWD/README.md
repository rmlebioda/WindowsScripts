Allow scripts execution:
set-executionpolicy remotesigned

Task Scheduler:  
path: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe  
arguments: -windowstyle hidden C:\apps\Dropbox\win_scripts\.DisableWD\DisableWD.ps1  
								^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ path to script  
trigger: on startup, on log in (any user)  
options:  
- run with highest privilages  
configure for: windows 10  

test command (admin privilages):  
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -windowstyle hidden C:\apps\Dropbox\win_scripts\.DisableWD\DisableWD.ps1
