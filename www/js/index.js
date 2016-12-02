var foodApp = angular.module('foodModule', ['ui.router', 'me-lazyload'], function($compileProvider) {
        // html标签解析的compile方法
        $compileProvider.directive('compile', function($compile) {
            // directive factory creates a link function
            return function(scope, element, attrs) {
                scope.$watch(
                    function(scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.compile);
                    },
                    function(value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);
                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            };
        });
    })
    // 预先设置各种请求地址
    .run(function($rootScope) {
        $rootScope.globaVar = {
            // 食物分类数据请求接口
            foodCategories: 'http://localhost/food-categories.php',
            //  食物列表数据请求接口
            foodList: "http://localhost/food-list.php",
             //  图片接口
            prefixImage: 'http://tnfs.tngou.net/image',
             //  食物详情数据请求接口
            foodDetail: 'http://localhost/food-detail.php',
             //  图书分类数据请求接口
            bookCategories: 'http://localhost/book-categories.php',
             //  图书列表数据请求接口
            bookList: "http://localhost/book-list.php",
             //  图书详情数据请求接口
            bookDetail: "http://localhost/book-detail.php",
             //  资讯最新列表数据请求接口
            infoNewsList: 'http://localhost/info-news-list.php',
             //  资讯详情数据请求接口
            infoDetail: 'http://localhost/info-detail.php',
             //  资讯列白哦数据请求接口
            infocategories: 'http://localhost/info-categories.php',
             //  资讯列表数据请求接口
            infoList: 'http://localhost/info-list.php',
            // 详细资料数据请求接口
            diseaseDetail: "http://localhost/disease-detail.php",
            // 科室列表数据请求接口
            diseaseDepartmentList: "http://localhost/disease-department-list.php",
            // 身体列表数据请求接口
            diseasePlaceListUrl: 'http://localhost/disease-place-list.php',
            // 身体分类数据请求接口
            diseasePclassifyCategories: 'http://localhost/disease-pclassify-categories.php',
            // 科室分类数据请求接口
            diseaseDclassify: 'http://localhost/disease-dclassify-categories.php',
            // 资讯分类数据请求接口
            askCategories:'http://localhost/ask-categories.php',
            // 资讯列表数据请求接口
            askLists:"http://localhost/ask-list.php",
            // 资讯详情数据请求接口
            askDetail:'http://localhost/ask-detail.php',
            // 资讯新列表数据请求接口
            askNewsList:"http://localhost/ask-news-list.php"
        }
    })
    // congfig路由配置
    .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise('/navbar/home');
        $stateProvider
            // 请求3个下拉菜单的信息
            .state('navbar', {
                url: "/navbar",
                templateUrl: "template/navbar.html",
                controller: "navbarController",

                resolve: {
                    employeesList: function($http, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.foodCategories
                        }).then(function(res) {
                            return res.data.tngou;
                        })
                    },
                    booksList: function($http, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.bookCategories
                        }).then(function(res) {
                            return res.data.tngou;
                        })
                    },
                    infocategories: function($http, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.infocategories
                        }).then(function(res) {
                            return res.data.tngou;
                        })
                    }

                }
            })
            // 在首页显示的健康咨询、疾病信息的信息请求
            .state('navbar.home', {
                url: "/home",
                templateUrl: "template/home.html",
                controller: "homeController",
                resolve: {
                    foodList: function($http, $stateParams, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.foodList,
                            params: {
                                id: 1,
                                page: 6
                            }
                        }).then(function(res) {

                            return res.data;
                        })
                    },
                    diseaseshome: function($http, $stateParams, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.diseaseDepartmentList,
                            params: {
                                id: "2",
                                page: "1",
                                rows: "6"
                            }
                        }).then(function(res) {
                            return res.data.list;
                        })
                    },
                    info: function($http, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.infoNewsList
                        }).then(function(res) {
                            return res.data;
                        })
                    },
                    askNewsList:function($http,$stateParams,$rootScope){
                // console.log($stateParams.id);
                        return $http({
                            url:$rootScope.globaVar.askNewsList,
                            params:{
                             id:0
                            }
                        }).then(function(res){
                     
                         return res.data;
                     })
            }

                }
            })
        //食物列表路由配置
        .state('navbar.foodList', {
                url: '/foodList/:id/:page',
                templateUrl: 'template/foodList.html',
                controller: 'foodListController',
                resolve: {
                    foodList: function($http, $stateParams, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.foodList,
                            params: {
                                id: $stateParams.id,
                                page: $stateParams.page
                            }
                        }).then(function(res) {
                            return res.data;
                        })
                    }
                }
            })
            //食物详情路由配置
            .state('navbar.foodDetail', {
                url: '/foodDetail/:id',
                templateUrl: 'template/foodDetail.html',
                controller: 'foodDetailController',
                resolve: {
                    foodDetail: function($http, $stateParams, $rootScope) {
                        console.log($stateParams.id)
                        return $http({
                            url: $rootScope.globaVar.foodDetail,
                            params: {
                                id: $stateParams.id
                            }
                        }).then(function(res) {

                            return res.data;

                        })
                    }
                }
            })
            //食物结束
            // --------------------疾病------------------------
            /*疾病信息开始*/
            .state('navbar.diseaseparent.diseaseDetail', {
                url: '/diseaseDetail/:id',
                views: {
                    "detail": {
                        templateUrl: 'template/diseaseDetail.html',
                        controller: 'diseaseDetailController',
                        resolve: {
                            diseaseDetail: function($http, $stateParams, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseaseDetail, //这里的globalVar需要修改
                                    params: {
                                        id: $stateParams.id
                                    }
                                }).then(function(res) {
                                    console.log(res.data);
                                    return res.data;
                                })
                            }
                        }

                    }
                }
            })
            /*疾病信息结束*/

        //多view主体
        .state("navbar.diseaseparent", {
                url: "/diseaseparent",
                templateUrl: 'template/diseaseparent.html',
            })
            .state("navbar.diseaseparent.classes", {
                url: "/classes",
                views: {
                    "classes1": {
                        templateUrl: '/template/diseaseDclassifyCategories.html',
                        controller: 'diseaseDclassifyCategoriesController',
                        resolve: {
                            'diseaseDclassifyCategories': function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseaseDclassify
                                }).then(function(res) {
                                    return res.data.tngou;
                                })
                            }
                        }
                    },
                    "classes2": {
                        templateUrl: '/template/diseasePclassifyCategories.html',
                        controller: 'diseasePclassifyCategoriesController',
                        resolve: {
                            diseasePclassifyCategories: function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseasePclassifyCategories
                                }).then(function(res) {
                                    return res.data;
                                })
                            }
                        }
                    }
                }
            })
            //身体列表
            .state('navbar.diseaseparent.place', {
                url: '/classes/place/:id/:page',
                views: {
                    "lists": {
                        templateUrl: 'template/diseasePlaceList.html',
                        controller: 'diseaseplacelistController',
                        resolve: {
                            diseaseplaceLists: function($http, $stateParams, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseasePlaceListUrl,
                                    params: {
                                        id: $stateParams.id,
                                        page: $stateParams.page
                                    }
                                }).then(function(res) {
                                    console.log(res.data)
                                    return res.data
                                })
                            }
                        }
                    },
                    "classes1": {
                        templateUrl: '/template/diseaseDclassifyCategories.html',
                        controller: 'diseaseDclassifyCategoriesController',
                        resolve: {
                            'diseaseDclassifyCategories': function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseaseDclassify
                                }).then(function(res) {
                                    console.log('class1-->', res)
                                    return res.data.tngou;
                                })
                            }
                        }
                    },
                    "classes2": {
                        templateUrl: '/template/diseasePclassifyCategories.html',
                        controller: 'diseasePclassifyCategoriesController',
                        resolve: {
                            diseasePclassifyCategories: function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseasePclassifyCategories
                                }).then(function(res) {
                                    console.log(res.data)
                                    return res.data;
                                })
                            }
                        }
                    }
                }
            })
            //科室列表
            .state('navbar.diseaseparent.classesList', {
                url: '/classes/classesList/:id/:page',
                views: {
                    "lists": {
                        templateUrl: 'template/diseaseDepartmentList.html',
                        controller: 'diseaseDepartmentListController',
                        resolve: {
                            diseaseDepartmentList: function($http, $stateParams, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseaseDepartmentList,
                                    params: {
                                        id: $stateParams.id,
                                        page: $stateParams.page
                                    }
                                }).then(function(res) {
                                    return res.data;
                                })
                            }
                        }

                    },
                    "classes1": {
                        templateUrl: '/template/diseaseDclassifyCategories.html',
                        controller: 'diseaseDclassifyCategoriesController',
                        resolve: {
                            'diseaseDclassifyCategories': function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseaseDclassify
                                }).then(function(res) {
                                    return res.data.tngou;
                                })
                            }
                        }
                    },
                    "classes2": {
                        templateUrl: '/template/diseasePclassifyCategories.html',
                        controller: 'diseasePclassifyCategoriesController',
                        resolve: {
                            diseasePclassifyCategories: function($http, $rootScope) {
                                return $http({
                                    url: $rootScope.globaVar.diseasePclassifyCategories
                                }).then(function(res) {
                                    return res.data;
                                })
                            }
                        }
                    }
                }
            })
            // --------------------疾病 End---------------------
            //图书开始
            //图书列表
            .state('navbar.bookList', {
                url: '/bookList/:id/:page',
                templateUrl: 'template/bookList.html',
                controller: 'bookListController',
                resolve: {
                    bookList: function($http, $stateParams, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.bookList,
                            params: {
                                id: $stateParams.id,
                                page: $stateParams.page
                            }
                        }).then(function(res) {
                            return res.data;
                        })
                    }
                }
            })
            //图书详情
            .state('navbar.bookDetail', {
                url: '/bookDetail/:id',
                templateUrl: 'template/bookDetail.html',
                controller: 'bookDetailController',
                resolve: {
                    bookDetail: function($http, $stateParams, $rootScope) {

                        return $http({
                            url: $rootScope.globaVar.bookDetail,
                            params: {
                                id: $stateParams.id
                            }
                        }).then(function(res) {

                            return res.data;

                        })
                    }
                }
            })
             //图书结束
            

            //咨询开始
            //咨询详情
        .state('navbar.infoDetail', {
                url: '/infoDetail/:id',
                templateUrl: 'template/infoDetail.html',
                controller: 'infoDetailController',
                resolve: {
                    infoDetail: function($http, $stateParams, $rootScope) {
                        return $http({
                            url: $rootScope.globaVar.infoDetail,
                            params: {
                                id: $stateParams.id
                            }
                        }).then(function(res) {
                            return res.data;

                        })
                    }
                }
            })
           

             //咨询列表
            .state('navbar.infolist', {
                url: '/infoList/:id/:page',
                templateUrl: 'template/infoList.html',
                controller: 'infoListController',
                resolve: {
                    infoList: function($http, $stateParams, $rootScope) {

                        return $http({
                            url: $rootScope.globaVar.infoList,
                            params: {
                                id: $stateParams.id,
                                page: $stateParams.page
                            }
                        }).then(function(res) {
                            return res.data;

                        })
                    }
                }
            })
            //询问结束


            //问答开始
            //问答分类
            .state('navbar.ask',{
        url:'/ask',
        templateUrl:'template/ask.html',
        controller:'askController',
          resolve:{
            askCategories:function($http,$rootScope){
                return $http({
                    url:$rootScope.globaVar.askCategories,
                }).then(function(res){ 
                    return res.data.tngou;
                })
            }
        }
    })
            //问答列表
    .state('navbar.ask.askLists',{
        url:'/askLists/:id/:page',
        templateUrl:'template/askLists.html',
        controller:'askListsController',
        resolve:{
            askLists:function($http,$stateParams,$rootScope){
                return $http({
                    url:$rootScope.globaVar.askLists,
                    params:{
                        id:$stateParams.id,
                        page:$stateParams.page,
                        rows:30
                    }
                }).then(function(res){
                    console.log(res.data);
                    return res.data;
                })
            }
        }
    })
    //问答详情
    .state('navbar.ask.askDetail',{
        url:'/askDetail/:id',
        templateUrl:'template/askDetail.html',
        controller:'askDetailController',
          resolve:{
            askDetail:function($http,$stateParams,$rootScope){ 
                return $http({
                    url:$rootScope.globaVar.askDetail,
                    params:{
                        id:$stateParams.id
                    }
                }).then(function(res){ 
                    return res.data;
                })
            }
        }
    })

    })
    




// -------------------疾病控制器--------------------
    //疾病症状
    .controller('diseaseDepartmentListController',function($scope,$stateParams, diseaseDepartmentList){
            $scope.diseaseDepartmentList=diseaseDepartmentList.list;
            $scope.total=diseaseDepartmentList.total;
            var pageList=new Array;
            for (var i = 1; i <= Math.ceil(diseaseDepartmentList.total/30); i++) {
                pageList.push(i);
            }
            $scope.pageList=pageList;
            $scope.id=$stateParams.id;
    })

    /*疾病信息*/
    .controller("diseaseDetailController",function($scope,diseaseDetail,$stateParams){
        $scope.diseaseDetail = diseaseDetail;
    })

    //身体列表
    .controller("diseaseplacelistController",function($scope,diseaseplaceLists,$stateParams){
       $scope.diseaseplaceLists=diseaseplaceLists.list;
        $scope.total = diseaseplaceLists.total;
        console.log($scope.total);
        pageList = [];
        for (var i = 1; i <= Math.ceil(diseaseplaceLists.total/30); i++) {
            pageList.push(i);
        };
        $scope.pageList = pageList;
        $scope.id = $stateParams.id;
    })

    /*身体分类*/
    .controller("diseasePclassifyCategoriesController",function($scope,diseasePclassifyCategories){
        $scope.bodyLists=diseasePclassifyCategories.tngou;
    
        $scope.showBlist=function(index){
            console.log(this);
        }
    })
    .controller('TestController', ['$rootScope', '$scope', function($rootScope, $scope) {
    }])
    .directive('accordion', function() {
          return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function() {
              var expanders = [];
              this.gotOpened = function(selectedExpander) {
                angular.forEach(expanders, function(expander) {
                  if (selectedExpander != expander) {
                    expander.showMe = false;
                  }
                });
              };
              this.addExpander = function(expander) {
                expanders.push(expander);
              };
            }
          };
        })

        .directive('expander', function() {
          return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^?accordion',
            scope: {
              expanderTitle: '='
            },
            template: '<div>' + '<div class="ex-title" ng-click="toggle()">{{expanderTitle}}</div>' + '<div class="ex-body" ng-show="showMe" ng-transclude></div>' + '</div>',
            link: function(scope, iElement, iAttrs, accordionController) {
              scope.showMe = false;
              accordionController.addExpander(scope);
              scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
              };
            }
          };
        })
        //科室控制器开始
        .controller('diseaseDclassifyCategoriesController',function($scope,diseaseDclassifyCategories){
            $scope.dclassify=diseaseDclassifyCategories;
           
        })

// -------------------疾病控制器 End-----------------


    // 开始时的下拉菜单控制器
    .controller("navbarController", function($scope, employeesList, booksList, infocategories) {
        $scope.employees = employeesList;
        $scope.booksList = booksList;
        $scope.infocategories = infocategories;
    })
    // 显示在home页的信息
    .controller("homeController", function($scope, foodList, diseaseshome, info,askNewsList) {
        $scope.foodList = foodList.tngou;
        $scope.diseases=diseaseshome;
        $scope.infos = info;
        $scope.askNewsList=askNewsList.list;

    })
    // 食物列表控制器
    .controller("foodListController", function($scope, foodList, $stateParams) {

        $scope.foodModule = foodList.tngou;

        $scope.total = foodList.total;

        pageList = [];

        for (var i = 1; i <= Math.ceil(foodList.total / 30); i++) {
            pageList.push(i);
        };

        $scope.pageList = pageList;

        $scope.id = $stateParams.id;

    })
    .controller("foodDetailController", function($scope, foodDetail) {

        $scope.foodDetail = foodDetail;
        console.log(foodDetail);
    })
    // 健康图书列表控制器
    .controller("bookListController", function($scope, bookList, $stateParams) {

        $scope.bookLists = bookList.list;

        $scope.total = bookList.total;

        // 计算页码
        pageList = [];

        for (var i = 1; i <= Math.ceil(bookList.total / 30); i++) {
            pageList.push(i);
        };

        $scope.pageList = pageList;

        $scope.id = $stateParams.id;

    })
    // 健康图书详情页控制器
    .controller("bookDetailController", function($scope, bookDetail) {

        $scope.bookDetail = bookDetail;
        console.log(bookDetail);
    })
    // 健康咨询详情页控制器
    .controller("infoDetailController", function($scope, infoDetail) {

        $scope.infoDetail = infoDetail;

        // 将时间戳格式化为时间节点
        var d = new Date()
        d.setTime(infoDetail.time)
        $scope.d = d;
    })
    // 健康咨询控制器
    .controller("infoListController", function($scope, infoList, $stateParams) {

        $scope.infoLists = infoList.tngou;

        $scope.infoTotal = infoList.total;

        // 健康咨询页码计算
        pageList = [];
        for (var i = 1; i <= Math.ceil(infoList.total / 30); i++) {
            pageList.push(i);

        }


        $scope.pageList = pageList;
        $scope.id = $stateParams.id;
    })
    .controller("askController",function($scope,askCategories){
  
    $scope.askCategories=askCategories;

    })
    .controller('askListsController',function($scope,askLists,$stateParams){
       $scope.askLists=askLists.tngou;
       $scope.total=askLists.total;
       var pageList=[];
       for(var i=1;i<Math.ceil(askLists.total/30);i++){
           pageList.push(i);
       }
       $scope.pageList=pageList;
       $scope.id=$stateParams.id;
       $scope.page=$stateParams.page;
    })

    .controller('askDetailController',function($rootScope,$scope,$stateParams,askDetail){
        $scope.askDetail=askDetail;
        $scope.id=$stateParams.id;
        $scope.src=askDetail.img;
        console.log($rootScope.globaVar.prefixImage);
        if(askDetail.message!="undefined"){
            function mess(){
                $(".askDetail_mes").append(askDetail.message);
            };
        }
        mess();

    });