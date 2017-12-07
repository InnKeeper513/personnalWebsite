var app = angular.module('todo',[]).config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken'
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
});

var test1 = {
  project_name: "Test1",
  project_done: false,
  project_desc: "This is for testing1",
  project_sub: ['AA2','AA3'],
  project_id: "ABC1",
  project_attachment: null,
  project_create_date: new Date("2000-07-13"),
  project_start_date: null,
  project_dead_line: null,
  project_level: 0,
  project_tag: ['TAG1'],
  project_emergence: "wait",
  project_status: "stuck",
  project_spent_time: 100
}
var test2 = {
  project_name: "Test2",
  project_done: false,
  project_desc: "This is for testing2",
  project_sub: [],
  project_id: 'AA2',
  project_attachment: null,
  project_create_date: new Date("2000-07-13"),
  project_start_date: null,
  project_dead_line: null,
  project_level: 1,
  project_tag: ['TAG1'],
  project_emergence: "emergency",
  project_status: "planning",
  project_spent_time: 100
}
var test3 = {
  project_name: "Test3",
  project_done: true,
  project_desc: "This is for testing3",
  project_sub: [],
  project_id: 'AA3',
  project_attachment: null,
  project_create_date: new Date("2000-07-13"),
  project_start_date: new Date("2000-07-13"),
  project_dead_line: null,
  project_level: 1,
  project_tag: ['TAG1','tag2'],
  project_emergence: "none",
  project_status: "done",
  project_spent_time: 100
}



function taskobj(name,done,desc,sub,id,attachment,createDate,startDate,deadLine,level,tag,emergence,status,spentTime){
  this.project_name = name;
  this.project_done = done;
  this.project_desc = desc;
  this.project_sub = sub;
  this.project_id = id;
  this.project_attachment = attachment;
  this.project_create_date = createDate;
  this.project_start_date = startDate;
  this.project_dead_line = deadLine;
  this.project_level = level;
  this.project_tag = tag;
  this.project_emergence = emergence;
  this.project_status = status;
  this.project_spent_time = spentTime;
};

app.controller('todoController', ['$scope','$http',function(scope,http){
  //scope.todoList = [test1,test2,test3];
  scope.todoList = [];
  http.get('http://127.0.0.1:8000/simplenote/todo/api/').then(function(response){
    for(var i = 0; i < response.data.length; i++){

      var todo = new taskobj(response.data[i].project_name,
                             response.data[i].project_done,
                             response.data[i].project_desc,
                             response.data[i].project_sub,
                             response.data[i].project_id,
                             response.data[i].project_attachment,
                             response.data[i].project_create_date,
                             response.data[i].project_start_date,
                             response.data[i].project_dead_line,
                             response.data[i].project_level,
                             response.data[i].project_tag,
                             response.data[i].project_emergence,
                             response.data[i].project_status);
      scope.todoList.push(todo);
    }

  });



  scope.multiTodo = [scope.todoList];
  scope.currentMulti = 0;
  scope.hideDetail = true;
  scope.selectedTodo = null;
  scope.currentTask = null;
  scope.project_detail = null;
  scope.levels = [];
  scope.subTasks = [];
  scope.checkboxList = [];
  scope.tagList = []
  // This field is used for managing the collapse level elements
  scope.collapseDict = {};
  scope.addTag = "";
  scope.newTag = null;
  scope.editMode = false;
  scope.tagSearch = null;
  scope.emergencyList = ["none","emergency","wait"];
  scope.statusList = ["none","planning","research","stuck","doing","done"];

  var initRootLevelTask = function(){
    var rootLevelArr = [];

    for(var i = 0; i < scope.todoList.length; i++){
      if(scope.todoList[i].project_level == 0){
        rootLevelArr.push(scope.todoList[i]);
      }
    }
    scope.multiTodo.push(rootLevelArr);
    scope.multiTodo.push(scope.tagList);
  };

  // Initialize the project order
  var init = function(){
    // TODO get the data from the database
    // getData();
    initRootLevelTask();
  };
  init();
  // Use to find the list of project that matches with the given id,
  // and then store these objects into scope.subTasks array
  var findTask = function(subIds){
    for(var i = 0; i < scope.multiTodo[scope.currentMulti].length; i++){
      // There is a match of id
      if(subIds.includes(scope.multiTodo[scope.currentMulti][i].project_id)){

        scope.subTasks.push(scope.multiTodo[scope.currentMulti][i]);
      }
    }
  }

  var levelScan = function(sub){
    findTask(sub.project_sub);
    // If the level does not exist, add it
    for(var i = 0; i < scope.subTasks.length; i++){
      if(!scope.levels.includes(scope.subTasks[i].project_level)){
        scope.levels.push(scope.subTasks[i].project_level);
        scope.collapseDict[scope.subTasks[i].project_level]=false;
      }
    }
  }

  scope.getProjectList = function(level){
    var projectArr = [];
    for(var i = 0; i < scope.subTasks.length; i++){
      if(scope.subTasks[i].project_level == level)
        projectArr.push(scope.subTasks[i]);
    }
    return projectArr;
  }

  // This will actually be called once created this page
  if(scope.multiTodo[scope.currentMulti][0]){
    scope.project_detail = scope.multiTodo[scope.currentMulti][0];
    scope.selectedTodo = scope.multiTodo[scope.currentMulti][0].project_name;
    levelScan(scope.project_detail);
  }

  scope.updateDetail = function(name){
    // Used to highlight the row that has been selected
    scope.selectedTodo = name;
    var hasValue = false;
    // Change the detail page to the current selected object
    for(var a = 0; a < scope.multiTodo[scope.currentMulti].length; a++){
      if(scope.multiTodo[scope.currentMulti][a].project_name == name){
        scope.project_detail = scope.multiTodo[scope.currentMulti][a];
        hasValue = true;
        break;
      }
    }

    // Clear contents and reset its sub tasks
    scope.levels = [];
    scope.subTasks = [];
    scope.collapseDict = [];

    if(!hasValue)
      scope.project_detail = null;
    else
      levelScan(scope.project_detail);
  }

  // This function will be used to manage the collapse levels
  scope.collapseManager = function(level){
    scope.collapseDict[level] = !scope.collapseDict[level];
  }
  scope.isCollapse = function(level){
    return scope.collapseDict[level];
  }
  scope.getParent = function(){
    for(var i = 0; i < scope.multiTodo[0].length; i++){
      for(var j = 0; j < scope.multiTodo[0][i].project_sub.length; j++){
        if(scope.multiTodo[0][i].project_sub[j] == scope.project_detail.project_id){
          return scope.multiTodo[0][i]
        }
      }
    }
    return null;
  }
  scope.hasSubTaks = function(){
    if(project_detail.project_sub.length != 0)
      return false;
    return true;
  }
  // Check if the current task is parent
  scope.isParent = function(){

    if(!scope.project_detail || scope.project_detail.project_level == 0 )
      return true;
    return false;
  }
  // Go to the parent task
  scope.gotoParent = function(){
    scope.updateDetail(scope.getParent().project_name);
  }

  scope.edit = function(){
    scope.editMode = true;
  }
  scope.save = function(){
    // TODO do something to save


    scope.editMode = false;
    // delete scope.selectedTodo
    http.delete('http://127.0.0.1:8000/simplenote/todo/api/930afec4-71c3-6e39-853b-40e1b045cace/');
    // Create scope.selectedTodo in the database

  }

  scope.idGenerator = function(){
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
  }
  scope.showAllTasks = function(){
    scope.currentMulti = 0;
    scope.checkboxList = [];
    scope.multiTodo[2] = [];
  }

  scope.getCurrentDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = yyyy+'/'+mm+'/'+ dd;
    return new Date(today);
  }
  // Will generate id
  scope.addSubTask = function(){
    //TODO to add this subtask to its parent
    var id = scope.idGenerator();
    var number = scope.multiTodo[0].length;
    var newTask = new taskobj("new_task"+number,false,"",[],id,[],scope.getCurrentDate(),null,null,scope.project_detail.project_level+1,[],"none","none",null);
    var data =  {
        "project_name": newTask.project_name,
        "project_done": newTask.project_done,
        "project_desc": newTask.project_desc,
        "project_sub": newTask.project_sub,
        "project_id": newTask.project_id,
        "project_attachment": newTask.project_attachment,
        "project_create_date": newTask.project_create_date,
        "project_start_date": newTask.project_start_date,
        "project_dead_line": newTask.project_dead_line,
        "project_level": newTask.project_level,
        "project_tag": newTask.project_tag,
        "project_emergence": newTask.project_emergence,
        "project_status": newTask.project_status
    };
    http.put('http://127.0.0.1:8000/simplenote/todo/api/',data);
    scope.multiTodo[0].push(newTask);
    scope.currentMulti = 0;
    scope.project_detail.project_sub.push(id);
    scope.selectedTodo = null;
    scope.checkboxList = [];
    scope.updateDetail("new_task"+number);
  }

  // Add a new task at the parent layer
  scope.addTask = function(){
    //TODO will get back to the parent
    var id = scope.idGenerator();
    var number = scope.multiTodo[0].length;
    var newTask = new taskobj("new_task"+number,false,"",[],id,[],scope.getCurrentDate(),null,null,0,[],"none","none",null);
    var data =  {
        "project_name": newTask.project_name,
        "project_done": newTask.project_done,
        "project_desc": newTask.project_desc,
        "project_sub": newTask.project_sub,
        "project_id": newTask.project_id,
        "project_attachment": newTask.project_attachment,
        "project_create_date": newTask.project_create_date,
        "project_start_date": newTask.project_start_date,
        "project_dead_line": newTask.project_dead_line,
        "project_level": newTask.project_level,
        "project_tag": newTask.project_tag,
        "project_emergence": newTask.project_emergence,
        "project_status": newTask.project_status
    };
    http.put('http://127.0.0.1:8000/simplenote/todo/api/',data);
    scope.multiTodo[0].push(newTask);
    scope.multiTodo[1].push(newTask);
    scope.selectedTodo = null;
    scope.updateDetail("new_task"+number);
  }

  scope.showRootLevelTask = function(){
    scope.currentMulti = 1;
    scope.selectedTodo = null;
    scope.checkboxList = [];
    scope.tagList = [];

    if(scope.multiTodo[scope.currentMulti].length != 0)
      scope.updateDetail(scope.multiTodo[scope.currentMulti][0].project_name);
  }

  scope.addCheckBox = function(todo){
    scope.checkboxList.push(todo);
  }
  // recursive delete child once
  scope.recursiveDeletion = function(subId){
    // Once parent object is deleted, all of its child task will be deleted as well
    for(var i = 0; i < scope.multiTodo[0].length; i++){
      if(scope.multiTodo[0][i].project_id == subId){
        for(var j = 0; j < scope.multiTodo[0][i].project_sub.length; j++){
          scope.recursiveDeletion(scope.multiTodo[0][i].project_sub[j]);
        }
        scope.multiTodo[0].splice(i,1);
        scope.todoList.splice(i,1);
        break;
      }
    }
    for(var i = 0; i < scope.multiTodo[1].length; i++){

      if(scope.multiTodo[1][i].project_id == subId){
        for(var j = 0; j < scope.multiTodo[1][i].project_sub.length; j++){
          scope.recursiveDeletion(scope.multiTodo[1][i].project_sub[j]);
        }

        scope.multiTodo[1].splice(i,1);
        break;
      }
    }
  }

  scope.deleteSelectedTask = function(){
    // Once parent object is deleted, all of its child task will be deleted as well

    for(var i = 0; i < scope.checkboxList.length; i++){

      // If already parent, then do nothing
      if(scope.checkboxList[i].project_sub.length != 0){
        for(var j = 0; j < scope.checkboxList[i].project_sub.length; j++){
          scope.recursiveDeletion(scope.checkboxList[i].project_sub[j]);
        }
      }

      var index1 = scope.multiTodo[0].indexOf(scope.checkboxList[i]);
      var index2 = scope.multiTodo[1].indexOf(scope.checkboxList[i]);

      if(scope.multiTodo[0].includes(scope.checkboxList[i]) && index1 != -1){
        scope.multiTodo[0].splice(index1,1);
        scope.todoList.splice(index1,1);
      }
      if(scope.multiTodo[1].includes(scope.checkboxList[i]) && index2 != -1){
        scope.multiTodo[1].splice(index2,1);
      }
      if(scope.multiTodo[2].includes(scope.checkboxList[i]) && index2 != -1){
        scope.multiTodo[2].splice(index2,1);
      }
    }
    scope.checkboxList = [];
    if(scope.multiTodo[scope.currentMulti][0])
      scope.updateDetail(scope.multiTodo[scope.currentMulti][0].project_name);
    else scope.updateDetail(null);
    // After deleting selected task, check if
  }

  scope.addATag = function(){
    if(!scope.project_detail.project_tag.includes(scope.newTag) && scope.newTag)
      scope.project_detail.project_tag.push(scope.newTag);
    scope.newTag = "";
  }

  // For button click
  scope.gotoTag = function(tag){
    scope.multiTodo[2] = [];
    for(var i = 0; i < scope.todoList.length; i++){
      if(scope.todoList[i].project_tag.includes(tag)){
        scope.multiTodo[2].push(scope.todoList[i]);
      }
    }
    scope.currentMulti = 2;
    scope.updateDetail(scope.multiTodo[2][0].project_name);
  }
  // For search bar
  scope.searchTag = function(){
    scope.multiTodo[2] = [];
    for(var i = 0; i < scope.todoList.length; i++){
      if(scope.tagSearch && scope.todoList[i].project_tag.includes(scope.tagSearch)){
        scope.multiTodo[2].push(scope.todoList[i]);
      }
    }
    scope.tagSearch = "";
    scope.currentMulti = 2;

    if(scope.multiTodo[2].length > 0)
      scope.updateDetail(scope.multiTodo[2][0].project_name);
    else scope.updateDetail("qwertyuiop");
  }

  scope.addANewTag = function(){
    var exist = false;
    for(var i = 0; i < scope.project_detail.project_tag.length; i++){
      if(scope.project_detail.project_tag[i] == scope.addTag)
          exist = true;
    }

    if(!exist)
      scope.project_detail.project_tag.push(scope.addTag);
    scope.addTag = "";
  }
}]);
