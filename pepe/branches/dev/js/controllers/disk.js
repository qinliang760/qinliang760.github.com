'use strict';


var diskController = angular.module('diskController', ['ngFileUpload']);

diskController.controller('mainController',['$scope','$rootScope','$http','Fts','$location','Upload','$timeout', function($scope, $rootScope, $http, Fts, $location, Upload, $timeout) {
    Fts.checkLogin($scope, location.href, "rewrite"); //验证登录
    $rootScope.page = "素材库后台"; //页面title
    $scope.id = []; //文件和图片id
    $scope.folderId = []; //文件id
    $scope.fileId = []; //图片id
    $scope.num = 0; // 选中文件个数 
    $scope.isTips = false; //控制图片上传按钮和提示框  false为提示框隐藏
    $scope.isAllchecked = false; //控制全部图片选中框
    $scope.isEdit = false; //控制新增文件夹确认框
    $scope.isDelete = false; //控制文件删除按钮

    var cacheData = {};

    var locHash = $location.hash(),
        customPrefix;

    if (locHash == '') { //判断url是否有文件路径
        customPrefix = '/';
    } else {
        customPrefix = locHash;
    }

    $scope.getData = {
        parent_id: '0', // 父节点ID，如果为根节点传0
        custom_prefix: customPrefix, // 自定义前缀（目录路径）
        node_name: 'new' // 节点名称（文件名称）
    };

    $scope.setFile = function(customPrefix) { //获取文件
        var params = {
            custom_prefix: customPrefix
        }

        if (cacheData[customPrefix]) {
           $scope.setFileData(cacheData[customPrefix], customPrefix) //全部数据
        } else {
            Fts.getJson('/storage/prefix_lists', params).success(function(data) {
                $scope.setFileData(data, customPrefix, true)
                cacheData[customPrefix] = data;
            })
        }
    }

    $scope.setFileData = function(data, customPrefix, isTrue){
        var diskData = data; //全部数据
        $scope.folderData = diskData.folders; //文件数据
        $scope.fileData = diskData.files; //图片数据
        $scope.navData = diskData.nav; //导航数据

        if(isTrue){
            $scope.navData.splice(0, 1); //删除根目
        }
        
        $scope.getData['parent_id'] = diskData.parent_id;
        $scope.getData['custom_prefix'] = customPrefix;

        //console.log($scope.getData);
        $location.hash(customPrefix); //获取文件路径,修改url
        $scope.num = 0; //重置已选择文件

        $scope.folderId = [];
        $scope.fileId = [];
        $scope.id = $scope.folderId.concat($scope.fileId);
    }

    $scope.setFile($scope.getData.custom_prefix) //默认获取根目录数据

    $scope.setAddFileHtml = function() { //新增文件html
        var defult = {
            "id": "",
            "custom_prefix": "",
            "node_name": "-"
        };
        $scope.folderData.unshift(defult);
        $scope.isEdit = true;
    }

    $scope.setRemoveFileHtml = function() { //删除新增文件html
        $scope.folderData.splice(0, 1);
        $scope.isEdit = false;
    }

    $scope.setAddFile = function() { //新增文件
        var customPrefix = $scope.getData.custom_prefix

        if (customPrefix == '/') { //删除根目录
            customPrefix = '';
        }

        var params = {
            parent_id: $scope.getData.parent_id,
            custom_prefix: customPrefix + '/' + $scope.getData.node_name,
            node_name: $scope.getData.node_name
        }

        Fts.postJson('/storage/add_prefix', params).success(function(data) {
            $scope.folderData.splice(0, 1);

            if (data.msg == 'prefix_exist') {
                alert('文件名已存在！');
            } else if (data.msg == 'role') {
                alert('权限不足，请联系管理员！');
            } else if (data.msg == 'custom_prefix_not_null') {
                alert('文件名不能为空！');
            } else if (data.msg == 'add_fail') {
                alert('服务器繁忙，请稍后再试！');
            } else if (data.msg == 'custom_prefix_not_null' || data.msg == 'node_name_not_null' || data.msg == 'parent_id_not_null' || data.msg == 'parent_id_invalid_len24' || data.msg == 'parent_not_exist') {
                alert('格式错误，请稍后再试！');
            } else if (data.msg == 'login') {
                alert('请先登录！');
            } else if (data.status == 'success') {
                $scope.folderData.unshift(data.folder);
                delete cacheData[$scope.getData.custom_prefix]; //删除缓存过的数据
                $scope.isTips = true;
                $scope.tipsText = '创建成功';
                $timeout(function() {
                    $scope.isTips = false;
                }, 1000)
            }

            $scope.isEdit = false;
        })
    }

    $scope.setRemoveFile = function() { //删除文件
        var c = confirm("确定要删除吗？");
        if (c) {
            var params = {
                ids_json: JSON.stringify($scope.id)
            }

            Fts.postJson('/storage/batch_delete_prefix', params).success(function(data) {
                if (data.msg == 'delete_success') {
                    for (var i = 0; i < $scope.folderId.length; i++) { //删除选中文件
                        $scope.folderData.map(function(item, index) {
                            if (item.id == $scope.folderId[i]) {
                                $scope.folderData.splice(index, 1);
                            }
                        })
                    }

                    for (var i = 0; i < $scope.fileId.length; i++) { //删除选中图片
                        $scope.fileData.map(function(item, index) {
                            if (item.id == $scope.fileId[i]) {
                                $scope.fileData.splice(index, 1);
                            }
                        })
                    }

                    $scope.num = 0; //重置已选择文件个数
                    $scope.folderId = [];
                    $scope.fileId = [];
                    $scope.id = $scope.folderId.concat($scope.fileId);

                    $scope.isTips = true;
                    $scope.tipsText = '删除成功';
                    $timeout(function() {
                        $scope.isTips = false;
                    }, 1000)

                } else if (data.msg == 'login') {
                    alert('请先登录！');
                } else if (data.msg == 'invalid' || data.msg == 'parent_id_not_null' || data.msg == 'parent_id_invalid_len24') {
                    alert('服务器繁忙，请稍后再试！');
                } else if (data.msg == 'role') {
                    alert('权限不足，请联系管理员！');
                } else if (data.msg == 'delete_fail') {
                    alert('系统错误！');
                }

                $scope.isAllchecked = false;
                $scope.isDelete = false;
            })
        }
    }

    $scope.handleId = function(id, type) { //获取文件ID  type:文件夹or文件
        if (type == 'folder') {
            for (var i = 0; i < $scope.folderId.length; i++) {
                if ($scope.folderId[i] == id) {
                    $scope.folderId.splice(i, 1);
                    $scope.id = $scope.folderId.concat($scope.fileId);
                    $scope.num = $scope.id.length;
                    if ($scope.num <= 0) {
                        $scope.isDelete = false;
                    }
                    return;
                }
            }
            $scope.folderId.push(id);
        } else if (type == 'file') {
            for (var i = 0; i < $scope.fileId.length; i++) {
                if ($scope.fileId[i] == id) {
                    $scope.fileId.splice(i, 1);
                    $scope.id = $scope.folderId.concat($scope.fileId);
                    $scope.num = $scope.id.length;
                    if ($scope.num <= 0) {
                        $scope.isDelete = false;
                    }
                    return;
                }
            }
            $scope.fileId.push(id);
        }

        $scope.id = $scope.folderId.concat($scope.fileId);
        $scope.num = $scope.id.length;
        $scope.isDelete = true;

    }

    $scope.allHandleId = function() { //获取全部文件ID
        if (!$scope.isAllchecked) {
            $scope.folderId = [];
            $scope.fileId = [];
            for (var i = 0; i < $scope.folderData.length; i++) {
                $scope.folderId.push($scope.folderData[i].id);
            }
            for (var i = 0; i < $scope.fileData.length; i++) {
                $scope.fileId.push($scope.fileData[i].id);
            }
            $scope.isAllchecked = true;
        } else {
            $scope.folderId = [];
            $scope.fileId = [];
            $scope.isAllchecked = false;
        }

        $scope.id = $scope.folderId.concat($scope.fileId);
        $scope.num = $scope.id.length;

        if ($scope.num > 0) {
            $scope.isDelete = true;
        } else {
            $scope.isDelete = false;
        }
    }

    $scope.uploadFiles = function(file, fileType) { //上传图片
        if (!file || !fileType) {
            return;
        }

        if (file.length > 120) {
            alert('上传文件数量超出限制，请重新选择！');
            return;
        }

        var params = {
            custom_prefix: $scope.getData.custom_prefix
        }
        for (var i = 0; i < file.length; i++) {
            var num = 0;
            var checkJson = {
                image: ['.jpg', '.png']
            };
            if (checkJson[fileType]) {
                for (var k = 0; k < checkJson[fileType].length; k++) {
                    if (file[i].name.indexOf(checkJson[fileType][k]) > -1) {
                        num++;
                        break;
                    }
                }
                if (num == 0) {
                    alert("上传文件格式错误，请重新选择。");
                    return;
                }
            } else {
                alert("无类型。");
                return;
            }

            if (file[i].size > 10000000000) {
                alert('上传文件大小超出限制，请重新选择！');
                return;
            }

            eval("params.file" + i + "=file[" + i + "]"); //分开上传数据
        }

        Upload.upload({
            url: '/storage/batch_put',
            data: params
        }).then(function(resp) {
            var data = resp.data;

            if (data.msg == 'login') {
                alert('请先登录！');
            } else if (data.msg == 'role') {
                alert('权限不足，请联系管理员！');
            } else if (data.msg == 'type_limit') {
                alert('上传文件格式错误，请重新选择！');
            } else if (data.msg == 'max') {
                alert('上传文件大小超出限制，请重新选择！');
            } else if (data.status == 'success') {
                if (data.current_id == $scope.getData.parent_id) {
                    $scope.fileData = data.msg.concat($scope.fileData);
                }

                delete cacheData[$scope.getData.custom_prefix]; //删除缓存过的数据
            }
            $timeout(function() {
                $scope.isTips = false;
            }, 1000);
        }, function(resp) {
            //console.log('Error status: ' + resp.status);
        }, function(evt) {
            if (evt.type == 'load') {
                $scope.tipsText = '上传成功';
            } else {
                $scope.tipsText = '上传中...';
            }
            $scope.isTips = true;
        });
    };
}]);
