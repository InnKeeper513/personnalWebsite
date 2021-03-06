var app = angular.module('todo',[]);
var test1 = {
  project_name: "Test1",
  project_done: false,
  project_desc: "This is for testing1",
  project_sub: ['AA2','AA3'],
  project_id: "ABC1",
  project_attachment: null,
  project_create_date: "1348-07-13",
  project_start_date: null,
  project_dead_line: null,
  project_level: 0,
  project_tag: "TAG1",
  project_emergence: "Can Wait",
  project_status: "Stuck",
  project_spent_time: 100
}
var test2 = {
  project_name: "Test2",
  project_done: false,
  project_desc: "This is for testing2",
  project_sub: [],
  project_id: 'AA2',
  project_attachment: null,
  project_create_date: "1343-07-13",
  project_start_date: null,
  project_dead_line: null,
  project_level: 1,
  project_tag: "TAG1",
  project_emergence: "Emergency",
  project_status: "Planning",
  project_spent_time: 100
}
var test3 = {
  project_name: "Test3",
  project_done: true,
  project_desc: "This is for testing3",
  project_sub: [],
  project_id: 'AA3',
  project_attachment: null,
  project_create_date: "1343-07-13",
  project_start_date: "1343-07-13",
  project_dead_line: null,
  project_level: 1,
  project_tag: "TAG1",
  project_emergence: "None",
  project_status: "Done",
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

app.controller('todoController', ['$scope',function(scope){
  scope.todoList = [test1,test2,test3];
  scope.hideDetail = true;
  scope.selectedTodo = null;
  scope.currentTask = null;
  scope.project_detail = null;
  scope.levels = [];
  scope.subTasks = [];
  // This field is used for managing the collapse level elements
  scope.collapseDict = {};
  scope.editMode = false;


  // Use to find the list of project that matches with the given id,
  // and then store these objects into scope.subTasks array
  var findTask = function(subIds){
    for(var i = 0; i < scope.todoList.length; i++){
      // There is a match of id
      if(subIds.includes(scope.todoList[i].project_id)){

        scope.subTasks.push(scope.todoList[i]);
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
  if(scope.todoList[0]){
    scope.project_detail = scope.todoList[0];
    scope.selectedTodo = scope.todoList[0].project_name;
    levelScan(scope.project_detail);
  }

  scope.updateDetail = function(name){
    // Used to highlight the row that has been selected
    scope.selectedTodo = name;

    // Change the detail page to the current selected object
    for(var a = 0; a < scope.todoList.length; a++){

      if(scope.todoList[a].project_name == name){
        scope.project_detail = scope.todoList[a];
        break;
      }
    }

    // Clear contents and reset its sub tasks
    scope.levels = [];
    scope.subTasks = [];
    scope.collapseDict = [];
    levelScan(scope.project_detail);
  };

  // This function will be used to manage the collapse levels
  scope.collapseManager = function(level){
    scope.collapseDict[level] = !scope.collapseDict[level];
  }
  scope.isCollapse = function(level){
    return scope.collapseDict[level];
  }
  scope.getParent = function(){
    for(var i = 0; i < scope.todoList.length; i++){
      for(var j = 0; j < scope.todoList[i].project_sub.length; j++){
        if(scope.todoList[i].project_sub[j] == scope.project_detail.project_id && scope.todoList[i].project_level == 0){
          return scope.todoList[i]
        }
      }
    }
    return null;
  }

  // Check if the current task is parent
  scope.isParent = function(){
    if(scope.project_detail.project_level == 0)
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
  }

  scope.idGenerator = function(){
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  // Will generate id
  scope.addSubTask = function(){
    var id = scope.idGenerator();
    var newTask = new taskobj("new_task"+scope.todoList.length,null,null,[],id,null,null,null,null,scope.project_detail.project_level+1,null,null,null,null);
    scope.todoList.push(newTask);
    scope.project_detail.project_sub.push(id);
    scope.selectedTodo = null;
    scope.updateDetail("new_task"+scope.todoList.length);
  }

  scope.addTask = function(){
    var id = scope.idGenerator();
    var newTask = new taskobj("new_task"+scope.todoList.length,null,null,[],id,null,null,null,null,0,null,null,null,null);
    scope.todoList.push(newTask);
    scope.selectedTodo = null;
    scope.updateDetail("new_task"+scope.todoList.length);
  }
}]);
