
![](https://github.com/cosarberk/locterm/blob/main/LocTerm/locterm180X180.png)



# locterm
this is a javascript library.

locterm is terminal shell that runs your custom commands, it's in the core structure,so you need to import your custom commands.
   Locterm has its own basic commands.(run help command for see)
   
# DEMO
[my blog website "neuroneyes" for usage example -- click here --](http://bercosar.com)

# how to work ?
Locterm compares the commands you import with the client input.
If it agrees with your command and client inputs then it gives feedback for successful command, parameter, arguments.
And you can do whatever you want based on this feedback.

# what is not locterm ?
Locterm is not a shell simulation of powershell,bash,cmd,zsh run in the browser.it's can't run operating system commands as default. but for example you can run command like "ifconfig" or "ipconfig" with your pre-imported locterm example command ""custom command" with nodejs exec function on operating system. but this is not a good example because, locterm's intended use is unreasonable for running operating system commands.

# LICANSE
locterm is licensed under Apache License 2.0 

# Basic Usage

![](https://github.com/cosarberk/locterm/blob/main/images/example1.png)

## Step 1
Add your custom commands and parmaters to "commands.json" file
```javascript
      {
        "commmandName": "custom",
        "paramAction": ["-a","-b","-c" ]
      }
```
## Step 2
add codes to your html page and now you listening LocTerm feedbacks
```html
      ...

    <head>
       .
       .
          <script src="./LocTerm/LocTerm.js" ></script>
       .
       .
    </head>

      ...

    <body>
       .
       .
       
       <div class="term_area"> </div>
       .
       .
    </body>

      ...

    <script>
       .
       .
      
        const Term_Area = document.querySelector(".term_area"),    //select terminal area
        term_ops={LineNumber:"on",LineName:"Berk@Coşar",LineIcon:":~$"},  //create LocTerm options
        mylocterm = new LocTerm(Term_Area,term_ops);  // create Locterm
       
        //start listen LocTerm feedback
       
        mylocterm.ONLISTEN((data)=>{
         console.log(data) // data return {command:command,parametre:parametre,paramvalue:paramvalue}
       
         //OR
         //print feedback as innerHTML to locterm terminal
         
         // myterm.STDOUT("<p style='color:#00ff00;width:100%;text-align:center' >"+data.command+"</p>")
         
         //OR
         //print feedback as table to locterm terminal
         
         //   let Table_Source = [ 
         //    {tr:[  "-- Command --","-- parameter --","-- arguman --" ]},
         //    {tr:[  data.command,data.parametre,data.paramvalue ]}
         //   ]
         //    myterm.STDOUT_TABLE({source:Table_Source,borderColor:"transparent"})
       });
       
       .
       .     
    </script>
```

# Customize Theme

![](https://github.com/cosarberk/locterm/blob/main/images/example2.png)

add colors to locterm options list

```javascript
  term_ops{LineNumber:"on",LineName:"Berk@Coşar",LineIcon:":~$",LineNumberBackColor:"#999",LineIconBackColor:"yellow",LineNameBackColor:"blue",LineNameColor:"white",LineNumberColor:"black",LineIconColor:"black",ForeColor:"white"}

```
 
 ## All Options
 ```javascript
 {
       BackColor:"rgba(0,0,0,1)",
       ForeColor:"#00ff00",
       FontSize:"12px",
       FontFamily:"system-ui",
       Zindex:1,
       CaretColor:"yellow",
       CommandsPath:"./LocTerm/commands.json",
       LineNumber:"off",
       LineIcon:":~$",
       LineName:"root@LocTerm",
       LineHeight:"16px",
       LineNameColor:"#159EED",
       LineNumberColor:"#ccc",
       LineIconColor:"#15ED4C",
       LineNameFamily:"system-ui",
       LineNumberFamily:"system-ui",
       LineIconFamily:"system-ui",
       LineNumberBackColor:"transparent",
       LineIconBackColor:"transparent",
       LineNameBackColor:"transparent",

    }
 ```
 
 # Important Functions
 
 ## locterm.STDOUT
 
 parameter : html element
 
 result : print parameter on the terminal screen as html element // innerHTML
 
 ## locterm.STDERR
 same as STDOUT function
 
 ## locterm.STDOUT_TABLE
 parameter : 
 ```javascript 
       const table_options={
         source:"",                           // tablesource
         borderColor:"transparent"
       }
       
       
       //EXAMPLE TABLE SOURCE
       
          const  tablesource =[
                    {
                      tr:[
                          "title 1",
                          "title 2",
                          "title 3",
                          "title 4"
        
                         ]
                    },
                    {
                      tr:[
                         "contents",
                         "contents",
                         "contents",
                          "contents"
                         ]
                     },
   
     
                 ];

```
 

result : print table source list on the terminal screen as html table


