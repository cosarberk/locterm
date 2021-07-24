// Copyright 2021 Berk COŞAR
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



'use strict'

var LocTerm = (()=>{


   function LocTerm(AREA,options={
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

    })
    {
     

    this.AREA = AREA;

    this.CommandsPath=options.CommandsPath || "./LocTerm/commands.json"
    this.BackColor = options.BackColor || "rgba(0,0,0,1)"
    this.ForeColor = options.ForeColor || "#00ff00";
    this.CaretColor = options.CaretColor || "yellow";
    this.FontSize = options.FontSize|| "12px"
    this.FontFamily = options.FontFamily || "system-ui"
    this.LineNumber = options.LineNumber|| "off"
    this.LineIcon = options.LineIcon|| ":~$"
    this.LineName = options.LineName || "root@LocTerm"
    this.LineHeight = options.LineHeight|| "16px"
    this.LineNameColor = options.LineNameColor|| "#159EED"
    this.LineNumberColor = options.LineNumberColor|| "#ccc"
    this.LineIconColor = options.LineIconColor|| "#15ED4C"
    this.LineNameFamily=options.LineNameFamily||"system-ui",
    this.LineNumberFamily=options.LineNumberFamily||"system-ui",
    this.LineIconFamily=options.LineIconFamily||"system-ui",
    this.LineNumberBackColor = options.LineNumberBackColor||"transparent"
    this.LineIconBackColor = options.LineIconBackColor||"transparent"
    this.LineNameBackColor = options.LineNameBackColor || "transparent"
    this.KEY_EVENTS()
    this.CREATE_TERM()
    this.READ_COMMAND_JSON ()

}

var Global_Main_Area,terminput_i=0;
var  COMMANDLIST ,CODEHISTORY=[],CODEHISTORYCOUNT


// read custom and static commands from json file "default commands.json"
LocTerm.prototype.READ_COMMAND_JSON = function(){
    let ths = this;
fetch(ths.CommandsPath)
.then(res => res.json())
.then(out =>
    COMMANDLIST = out
  
  )
.catch(err => {throw err});
}

//listen keyboard click
LocTerm.prototype.KEY_EVENTS = function(){
    let ths = this;
    document.onkeydown = function(o){ ths.OnKeyDown(o);};
}


//action according to clicked keycode on keyboard 
LocTerm.prototype.OnKeyDown = function(e){
    let ths = this,
     endInner=Global_Main_Area.childNodes[Global_Main_Area.childNodes.length-1] ,// get in main div
     TermInput =endInner.childNodes[endInner.childNodes.length-1] ,// get in main div in textinput
     
     TermInputValue =TermInput.value; // get in main div in textinput value
   
  
  
    // listen ENTER click
    if (e.isComposing || e.keyCode === 13) {
        TermInput.setAttribute("disabled","")
        if (TermInputValue != "") {
            ths.CONTROL_COMMANDS(TermInputValue)
            ths.SAVE_CODE_HISTROY(TermInputValue)   
        }
       
        terminput_i++;
        ths.ADD_TERMINPUT(Global_Main_Area);
        
        return;
      }

      //listen UP click
      if (e.isComposing || e.keyCode === 38) {

        CODEHISTORYCOUNT--;
        if (CODEHISTORYCOUNT >=0) {
            TermInput.value=""
            ths.GET_CODE_HISTROY(CODEHISTORYCOUNT,(feedback)=>{
                TermInput.value = feedback.code
                
            })
        }else{
            CODEHISTORYCOUNT=0
        }
      
      
         
        return;
      }

      //listen DOWN click
      if (e.isComposing || e.keyCode === 40) {
        CODEHISTORYCOUNT++;
        if (CODEHISTORYCOUNT <=CODEHISTORY.length-1) {  
            TermInput.value=""
            ths.GET_CODE_HISTROY(CODEHISTORYCOUNT,(feedback)=>{
                TermInput.value = feedback.code
                
            })
        }
        else  {
            CODEHISTORYCOUNT = CODEHISTORY.length 
            TermInput.value=""
        }
      
    
        return;
      }
}

// crerate termianl area
LocTerm.prototype.CREATE_TERM = function(){
    let ths = this;
    const Main_Area = document.createElement("div");
    Global_Main_Area = Main_Area
    Main_Area.style="width:100%;height:auto;background-color:" +ths.BackColor+";"
   
    ths.AREA.appendChild(Main_Area)
     ths.ADD_TERMINPUT(Main_Area);

}

// add terminal input when all time press enter 
LocTerm.prototype.ADD_TERMINPUT = function(AREA){
    let ths = this;
   const Main_TextInput_Area = document.createElement("div"),
    Main_TextInput = document.createElement("input"),
    Main_Line_Name = document.createElement("p")
   ,Main_Line_Number = document.createElement("p")
   ,Main_Line_Icon = document.createElement("p");

   Main_TextInput_Area.style="width:100%;height:"+ths.LineHeight+";float:left;display:flex"

   Main_Line_Name.style="width:auto;height:100%;color:"+ths.LineNameColor+";line-height:"+ths.LineHeight+";float:left;margin-left:5px;font-size:"+ths.FontSize+";font-family:"+ths.LineNameFamily+";background-color:"+ths.LineNameBackColor+";"
   Main_Line_Number.style="width:30px;height:100%;color:"+ths.LineNumberColor+";line-height:"+ths.LineHeight+";float:left;margin-right:0px;text-align:right;font-size:"+ths.FontSize+";font-family:"+ths.LineNumberFamily+";background-color:"+ths.LineNumberBackColor+";"
   Main_Line_Icon.style="width:auto;height:100%;color:"+ths.LineIconColor+";line-height:"+ths.LineHeight+";float:left;margin-right:4px;font-size:"+ths.FontSize+";font-family:"+ths.LineIconFamily+";background-color:"+ths.LineIconBackColor+";"
   Main_TextInput.style="width:100%;height:100%;float:left;color:"+ths.ForeColor+";font-size:"+ths.FontSize+";background-color:transparent;float:left;outline:none;font-family:"+ths.FontFamily+";caret-color:"+ths.CaretColor+";"

   Main_TextInput_Area.id="terminput"+terminput_i
    Main_TextInput.type = "text"
    Main_Line_Name.innerText=ths.LineName
    Main_Line_Icon.innerText=ths.LineIcon


    if(ths.LineNumber=="on"){ 
        Main_Line_Number.innerText = (terminput_i+1)+" "
        Main_TextInput_Area.appendChild(Main_Line_Number)
    }
    Main_TextInput_Area.appendChild(Main_Line_Name)
    Main_TextInput_Area.appendChild(Main_Line_Icon)
    Main_TextInput_Area.appendChild(Main_TextInput)
   
    AREA.appendChild(Main_TextInput_Area)
    Main_TextInput.focus()
}

//listen input value 
const LocTerm_event = new CustomEvent('listenstd',{
    detail: {
        data:" "
      },
    bubbles: true,
    cancelable: true,
    composed: false,
});

//parse words in input and send data to listenerstd
LocTerm.prototype.CONTROL_COMMANDS =function(VALUE){
    let ths = this;
 //  (\-(\w*))  -l gibi parametre seçer
 //  [(\w*)(\-(\w*))]*  - de dahil kelime kelime seçer alternative
let regexpValue = /(\S+)/gi // - de dahil kelime kelime seçer
let regexparam = /(\-(\w*))/gi
let parseValue = VALUE.match(regexpValue);
let paramsValue = VALUE.match(regexparam);
let command = findCommand(COMMANDLIST,parseValue[0]) // return command.command = command , commad.i = command array number

if (command) {
   if (paramsValue) {
    let comparams = COMMANDLIST[command.i].paramAction  //get all parameters in json by this command
    for (let i = 0; i < paramsValue.length; i++) {
        let fparam = findParam(comparams,paramsValue[i],parseValue)
          if (fparam) {
            let notparamcommand = {command:command.command ,parametre:fparam.parametre,paramvalue:fparam.paramvalue}
            LocTerm_event.detail.data = notparamcommand // input commandsend lintenerstd 
            document.dispatchEvent(LocTerm_event);
              ths.STATIC_COMMANDS(notparamcommand) // if any run static command
             // ths.STDOUT("<p style='color:green' >Komut Bulundu : parametre : "+fparam.parametre+" parametre değeri : "+fparam.paramvalue+"</p>")
          }else{
              ths.STDERR("<p style='color:#DE3163' >Parmaeter Or Arguman Error :  Look Your Command Help Contents.</p>")
          }
    }
       
   }else{
       let notparamcommand = {command:command.command ,parametre:"",paramvalue:""}
       ths.STATIC_COMMANDS(notparamcommand) // if any run static command
    LocTerm_event.detail.data =notparamcommand //input commandsend lintenerstd (if no paramter send only command)
    document.dispatchEvent(LocTerm_event);
   }
 
 
    
   
    
  
  }
  else {
    ths.STDERR("<p style='color:#DE3163' >Command Not Found :  Control Your Command Code.</p>")
  }
    
}
//input command find in  json command
function findCommand(comArray,com){
  
    
    for (let i = 0; i < comArray.length; i++) {
        let command = COMMANDLIST[i].commmandName
          if (command == com) {
              return {command,i}
          }
        
        
    }
    
}

//input params find in  json params
function findParam(conArray,paramArray,inputparams){
    for (let a = 0; a < conArray.length; a++) {
            let haveparam =  conArray[a].indexOf(paramArray)
           
            if (haveparam!=-1) {
                let locationparam = inputparams.indexOf(paramArray)
               let parametre = inputparams[locationparam],paramvalue = inputparams[locationparam+1]
                return {parametre,paramvalue}
              
            }
         
       
       
    }
}

//print output on screen after running command 
LocTerm.prototype.STDOUT = function(VALUE){
    let ths = this;
    let stdout = document.createElement("div");
    stdout.innerHTML = VALUE
    stdout.style="width:100%;height:auto;float:left;font-size:"+ths.FontSize+";font-family:"+ths.FontFamily+";margin-left:30px";
    Global_Main_Area.appendChild(stdout)
}
//if any print error on screen after running command 
LocTerm.prototype.STDERR = function(VALUE){
    let ths = this;
    let stdout = document.createElement("div");
    stdout.innerHTML = VALUE
    stdout.style="width:100%;height:auto;float:left;font-size:"+ths.FontSize+";font-family:"+ths.FontFamily+";margin-left:30px";
    Global_Main_Area.appendChild(stdout)
}


//print output on screen as table after running command 
LocTerm.prototype.STDOUT_TABLE = function(table_options={
    source:"",
    borderColor:"transparent"
}){

    let ths = this, base_table = document.createElement("table"),base_tr=document.createElement("tr"),base_td =document.createElement("td")
    , Mtable = document.createElement("table");
    base_table.appendChild( base_tr.appendChild(base_td))
  
    Mtable.style = " font-family: arial, sans-serif; border-collapse: collapse; width: 100%;";
   

    let table_source = table_options.source
    for (let i = 0; i < table_source.length; i++) {
      let tr =  document.createElement("tr")
       for (let t = 0; t < table_options.source[i].tr.length; t++) {
        let td =  document.createElement("td")
           td.innerText=table_options.source[i].tr[t]
           td.style = "border: 1px solid "+table_options.borderColor+";text-align: left;padding-left: 30px;font-size:"+ths.FontSize+";font-family:"+ths.FontFamily+";color:"+ths.ForeColor+";"
           tr.appendChild(td)
       }
      
       Mtable.appendChild(tr)
    }
    let stdout = document.createElement("div");
    stdout.appendChild(Mtable)
    stdout.style="width:100%;height:auto;float:left;font-size:"+ths.FontSize+";font-family:"+ths.FontFamily+";";
    Global_Main_Area.appendChild(stdout)
    terminput_i++;
    ths.ADD_TERMINPUT(Global_Main_Area);
}

// run listenerstd
LocTerm.prototype.ONLISTEN = function(callback){
  
    document.addEventListener('listenstd', function (e) { 
        
        callback(e.detail.data)
    }, false); 
    
 
   
}


// get all codes on history
LocTerm.prototype.CODE_HISTROY = function(callback){
    for (let i = 0; i < CODEHISTORY.length; i++) {
        const codehistory = {"code_point":i,"code":CODEHISTORY[i]} ;
        callback(codehistory)
    }
  
}

// get codes on history according to id
LocTerm.prototype.GET_CODE_HISTROY = function(id,callback){
        let codeh = {"code_point":id,"code":CODEHISTORY[id]} ;
        callback(codeh)

  
}

//save code to history array
LocTerm.prototype.SAVE_CODE_HISTROY = function(VALUE){
    CODEHISTORY.push(VALUE)
    CODEHISTORYCOUNT =CODEHISTORY.length 
}


// static Commands
LocTerm.prototype.STATIC_COMMANDS = function(command){
    let ths = this;
    if (command.command == "clear") {
        Global_Main_Area.innerHTML=""
        terminput_i=-1;
    }
    if (command.command == "root") {
        ths.STDOUT("<p style='color:aqua' >Berk Coşar @ 2021</p>")
        ths.STDOUT("<a target='_blank' href ='https://berkcosar.com' style='color:orange;'>My Websites : berkcosar.com -> click here")
    }
    if (command.command == "date") {
        let today = new Date(),date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        ths.STDOUT("<p style='color:#00ff00' >"+date+"</p>")
    }
    if (command.command == "time") {
        let today = new Date(),time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        ths.STDOUT("<p style='color:#00ff00' >"+time+"</p>")
    }
    if (command.command == "locterm") {
        let  tablesource =[
            {
                tr:[
                "Argumans :"," Description :","Usage :",
                
                ]
            },
            {
                tr:[
                "-h :"," print help screen "," locterm -h",
                ]
                
            },
            {
                tr:[
                    "-r :"," refresh -> takes two parameters 'page' (refresh this page) or '.' (reset locterm) "," locterm -r page",
                ]
                
            },
            {
                tr:[
                    "-v :"," print locterm version "," locterm -v",
                ]
                
            },
        
        ]
        if( command.parametre=="" ){
         
            
            ths.STDOUT_TABLE({source:tablesource,borderColor:"transparent"})
       }
        if( command.parametre=="-r" ){
             if (command.paramvalue == "page") {
                location.reload();
             }
             if (command.paramvalue == ".") {
                Global_Main_Area.innerHTML="" //clear page
                terminput_i=-1; 
                CODEHISTORY=[] //clear history command

            }
        }
        if( command.parametre=="-h" ){
            ths.STDOUT_TABLE({source:tablesource,borderColor:"transparent"})
       }
       if( command.parametre=="-v" ){
        ths.STDOUT("<p style='color:#00ff00' >LocTerm V1.0.1 @2021</p>")
   }
    }

    if (command.command == "help") {
        let  tablesource =[
            {
                tr:[
                "-- Static Commands --"," -- Description --",
                
                ]
            },
            {
                tr:[
                "clear"," clear terminal",
                ]
                
            },
            {
                tr:[
                    "date"," print date",
                ]
                
            },
            {
                tr:[
                    "locterm"," the LocTerm Main Command (run locterm -h for more information) ",
                ]
                
            },
            {
                tr:[
                    "root"," print author",
                ]
                
            },
            {
                tr:[
                    "time"," print time",
                ]
                
            },
        
        ]
        ths.STDOUT("<p style='color:#00ff00' >locterm is terminal shell that runs your custom commands, it's in the core structure,so you need to import your custom commands.Locterm has its own basic commands.</p>")
        ths.STDOUT("<a target='_blank' href ='https://github.com/cosarberk' style='color:orange;'>Go to Github Page For More Information -> click here")
        ths.STDOUT_TABLE({source:tablesource,borderColor:"transparent"})
    }
}


    return LocTerm;
})();


