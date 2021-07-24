# locterm
locterm is terminal shell that runs your custom commands, it's in the core structure,so you need to import your custom commands.
   Locterm has its own basic commands.(run help command for see)

# how to work ?
Locterm compares the commands you import with the client input.
If it agrees with your command and client inputs then it gives feedback for successful command, parameter, arguments.
And you can do whatever you want based on this feedback.

# what is not locterm ?
Locterm is not a shell simulation of powershell,bash,cmd,zsh run in the browser.it's can't run operating system commands as default. but for example you can run command like "ifconfig" or "ipconfig" with your pre-imported locterm example command ""custom command" with nodejs exec function on operating system. but this is not a good example because, locterm's intended use is unreasonable for running operating system commands.


locterm is licensed under Apache License 2.0 
