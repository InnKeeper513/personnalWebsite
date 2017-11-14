var app = angular.module('todo',[]);
var test1 = {
  project_name: "Test1",
  project_done: false,
  project_desc: "This is for testing1",
  project_sub: null,
  project_id: "ABC1",
  project_attachment: null,
  project_create_date: "1348-07-13",
  project_start_date: null,
  project_dead_line: null,
  project_level: 0,
  project_tag: "TAG1",
  project_emergence: "Can Wait",
  project_status: "Stuck"
}
var test2 = {
  project_name: "Test2",
  project_done: false,
  project_desc: "This is for testing2",
  project_sub: null,
  project_id: "ABC1",
  project_attachment: null,
  project_create_date: "1343-07-13",
  project_start_date: null,
  project_dead_line: null,
  project_level: 0,
  project_tag: "TAG1",
  project_emergence: "Emergency",
  project_status: "Planning"
}
var test3 = {
  project_name: "Test3",
  project_done: true,
  project_desc: "This is for testing3",
  project_sub: null,
  project_id: "ABC1",
  project_attachment: null,
  project_create_date: "1343-07-13",
  project_start_date: "1343-07-13",
  project_dead_line: null,
  project_level: 0,
  project_tag: "TAG1",
  project_emergence: "None",
  project_status: "Done"
}

app.controller('todoController', ['$scope',function(scope){
  scope.todoList = [test1,test2,test3];
  scope.hideDetail = true;
  scope.selectedTodo = 0;

  if(scope.todoList[0])
    scope.project_detail = scope.todoList[0];

  scope.updateDetail = function($index){
    // Used to highlight the row that has been selected
    scope.selectedTodo = $index;

    // Change the detail page to the current selected object
    scope.project_detail = scope.todoList[$index];
  };
}]);
