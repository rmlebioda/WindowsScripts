#!/bin/bash
#!/bin/sh
# reset jetbrains ide evals

OS_NAME=$(uname -s)
JB_PRODUCTS="IntelliJIdea CLion PhpStorm GoLand PyCharm WebStorm Rider DataGrip RubyMine AppCode"

for PRD in $JB_PRODUCTS; do
	rm -rf ~/.java/.userPrefs/prefs.xml
	rm -rf ~/.java/.userPrefs/jetbrains/prefs.xml
	rm -rf ~/.config/JetBrains/${PRD}*/eval/
	rm -rf ~/.config/JetBrains/${PRD}*/options/other.xml
	# those 2 below were necessary for dotCover and dotTrace resets
	rm -rf ~/.java/.userPrefs/jetbrains/dc/
	rm -rf ~/.java/.userPrefs/jetbrains/dpn/
	rm -rf ~/.java/.userPrefs/jetbrains/pmaterialui/
done
