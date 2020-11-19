
run:
	disable_java_updates

power_settings:
	pmset -g
disable_sleep:
	sudo pmset -a disablesleep 1
enable_sleep:
	sudo pmset -a disablesleep 0
disable_java_updates:
	sudo defaults write /Library/Preferences/com.oracle.java.Java-Updater JavaAutoUpdateEnabled -bool false
disable_acceleration:
	defaults write .GlobalPreferences com.apple.mouse.scaling -1
