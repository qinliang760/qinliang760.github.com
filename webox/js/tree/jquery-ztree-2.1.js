/*
 * JQuery zTree 2.1
 * http://code.google.com/p/jquerytree/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Date: 2010-10-12
 *
 */

(function($) {

	var ZTREE_CLICK = "ZTREE_CLICK";
	var ZTREE_CHANGE = "ZTREE_CHANGE";
	var ZTREE_RENAME = "ZTREE_RENAME";
	var ZTREE_REMOVE = "ZTREE_REMOVE";
	var ZTREE_DRAG = "ZTREE_DRAG";
	var ZTREE_DROP = "ZTREE_DROP";
	var ZTREE_EXPAND = "ZTREE_EXPAND";
	var ZTREE_COLLAPSE = "ZTREE_COLLAPSE";
	var ZTREE_ASYNC_SUCCESS = "ZTREE_ASYNC_SUCCESS";
	var ZTREE_ASYNC_ERROR = "ZTREE_ASYNC_ERROR";

	var IDMark_Switch = "_switch";
	var IDMark_Icon = "_ico";
	var IDMark_Span = "_span";
	var IDMark_Input = "_input";
	var IDMark_Edit = "_edit";
	var IDMark_Remove = "_remove";
	var IDMark_Ul = "_ul";
	var IDMark_A = "_a";

	var LineMark_Root = "root";
	var LineMark_Roots = "roots";
	var LineMark_Center = "center";
	var LineMark_Bottom = "bottom";
	var LineMark_NoLine = "noLine";
	var LineMark_Line = "line";

	var FolderMark_Open = "open";
	var FolderMark_Close = "close";
	var FolderMark_Docu = "docu";

	var Class_CurSelectedNode = "curSelectedNode";
	var Class_CurSelectedNode_Edit = "curSelectedNode_Edit";
	var Class_TmpTargetTree = "tmpTargetTree";
	var Class_TmpTargetNode = "tmpTargetNode";
	
	var Check_Style_Box = "checkbox";
	var Check_Style_Radio = "radio";
	var CheckBox_Default = "chk";
	var CheckBox_False = "false";
	var CheckBox_True = "true";
	var CheckBox_Full = "full";
	var CheckBox_Part = "part";
	var CheckBox_Focus = "focus";
	var Radio_Type_All = "all";
	var Radio_Type_Level = "level";
	
	var MinMoveSize = "5";

	var settings = new Array();
	var zTreeId = 0;

	//zTree构造函数
	$.fn.zTree = function(zTreeSetting, zTreeNodes) {

		var setting = {
			//Tree 唯一标识，主UL的ID
			treeObjId: "",
			//是否显示CheckBox
			checkable: false,
			//是否在编辑状态
			editable: false,
			//编辑状态是否显示修改按钮
			edit_renameBtn:true,
			//编辑状态是否显示删除节点按钮
			edit_removeBtn:true,
			//是否显示树的线
			showLine: true,
			//当前被选择的TreeNode
			curTreeNode: null,
			//当前正被编辑的TreeNode
			curEditTreeNode: null,
			//是否处于拖拽期间 0: not Drag; 1: doing Drag
			dragStatus: 0,
			dragNodeShowBefore: false,
			//选择CheckBox 或 Radio
			checkStyle: Check_Style_Box,
			//checkBox点击后影响父子节点设置（checkStyle=Check_Style_Radio时无效） 			
			checkType: {
				"Y": "ps",
				"N": "ps"
			},
			//radio 最大个数限制类型，每一级节点限制 或 整棵Tree的全部节点限制（checkStyle=Check_Style_Box时无效）
			checkRadioType:Radio_Type_Level,
			//checkRadioType = Radio_Type_All 时，保存被选择节点的堆栈
			checkRadioCheckedList:[],
			//是否异步获取节点数据
			async: false,
			//获取节点数据的URL地址
			asyncUrl: "",
			//获取节点数据时，必须的数据名称，例如：id、name
			asyncParam: [],
			//其它参数
			asyncParamOther: [],
			//用户自定义名称列
			nameCol: "name",
			//用户自定义子节点列
			nodesCol: "nodes", 
			//折叠、展开特效速度
			expandSpeed: "fast",
			//折叠、展开Trigger开关
			expandTriggerFlag:false,
			root: {
				isRoot: true,
				nodes: []
			},
			//event Function
			callback: {
				beforeClick:null,
				beforeChange:null,
				beforeDrag:null,
				beforeDrop:null,
				beforeRename:null,
				beforeRemove:null,
				beforeExpand:null,
				beforeCollapse:null,
				
				click:null,
				change:null,
				drag:null,
				drop:null,
				rename:null,
				remove:null,
				expand:null,
				collapse:null,
				asyncSuccess:null,
				asyncError:null
			}			
		};
		
		if (zTreeSetting) {
			var tmp_checkType = zTreeSetting.checkType;
			zTreeSetting.checkType = undefined;
			var tmp_callback = zTreeSetting.callback;
			zTreeSetting.callback = undefined;
			var tmp_root = zTreeSetting.root;
			zTreeSetting.root = undefined;
			
			$.extend(setting, zTreeSetting);
			
			zTreeSetting.checkType = tmp_checkType;				
			$.extend(true, setting.checkType, tmp_checkType);
			zTreeSetting.callback = tmp_callback;				
			$.extend(setting.callback, tmp_callback);
			zTreeSetting.root = tmp_root;				
			$.extend(setting.root, tmp_root);
		}

		setting.treeObjId = this.attr("id");
		setting.treeObj = this;
		setting.root.tId = -1;
		setting.root.name = "ZTREE ROOT";
		setting.root.isRoot = true;
		setting.checkRadioCheckedList = [];
		setting.curTreeNode = null;
		setting.curEditTreeNode = null;
		setting.dragNodeShowBefore = false;
		setting.dragStatus = 0;
		setting.expandTriggerFlag = false;
		if (!setting.root[setting.nodesCol]) setting.root[setting.nodesCol]= [];
		zTreeId = 0;

		if (zTreeNodes) {
			setting.root[setting.nodesCol] = zTreeNodes;
		}
		settings[setting.treeObjId] = setting;

		$("#" + setting.treeObjId).empty();

		bindTreeNodes(setting, this);

		if (setting.root[setting.nodesCol] && setting.root[setting.nodesCol].length > 0) {
			initTreeNodes(setting, 0, setting.root[setting.nodesCol]);
		} else if (setting.async && setting.asyncUrl && setting.asyncUrl.length > 0) {
			asyncGetNode(setting);
		}
		

		return new zTreePlugin().init(this);

	};

	//绑定事件
	function bindTreeNodes(setting, treeObj) {
		treeObj.unbind(ZTREE_CLICK);		
		treeObj.bind(ZTREE_CLICK, function (event, treeId, treeNode) {
		  if ((typeof setting.callback.click) == "function") setting.callback.click(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_CHANGE);
		treeObj.bind(ZTREE_CHANGE, function (event, treeId, treeNode) {
		  if ((typeof setting.callback.change) == "function") setting.callback.change(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_RENAME);
		treeObj.bind(ZTREE_RENAME, function (event, treeId, treeNode) {
			if ((typeof setting.callback.rename) == "function") setting.callback.rename(event, treeId, treeNode);
		});
		
		treeObj.unbind(ZTREE_REMOVE);
		treeObj.bind(ZTREE_REMOVE, function (event, treeId, treeNode) {
			if ((typeof setting.callback.remove) == "function") setting.callback.remove(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_DRAG);
		treeObj.bind(ZTREE_DRAG, function (event, treeId, treeNode) {
		  if ((typeof setting.callback.drag) == "function") setting.callback.drag(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_DROP);
		treeObj.bind(ZTREE_DROP, function (event, treeId, treeNode, targetNode) {
		  if ((typeof setting.callback.drop) == "function") setting.callback.drop(event, treeId, treeNode, targetNode);
		});

		treeObj.unbind(ZTREE_EXPAND);
		treeObj.bind(ZTREE_EXPAND, function (event, treeId, treeNode) {
			if ((typeof setting.callback.expand) == "function") setting.callback.expand(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_COLLAPSE);
		treeObj.bind(ZTREE_COLLAPSE, function (event, treeId, treeNode) {
			if ((typeof setting.callback.collapse) == "function") setting.callback.collapse(event, treeId, treeNode);
		});

		treeObj.unbind(ZTREE_ASYNC_SUCCESS);
		treeObj.bind(ZTREE_ASYNC_SUCCESS, function (event, treeId, treeNode, msg) {
		  if ((typeof setting.callback.asyncSuccess) == "function") setting.callback.asyncSuccess(event, treeId, treeNode, msg);
		});

		treeObj.unbind(ZTREE_ASYNC_ERROR);
		treeObj.bind(ZTREE_ASYNC_ERROR, function (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		  if ((typeof setting.callback.asyncError) == "function") setting.callback.asyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown);
		});
		
	}

	//初始化并显示节点Json对象
	function initTreeNodes(setting, level, treeNodes, parentNode) {
		if (!treeNodes) return;
		
		for (var i = 0; i < treeNodes.length; i++) {
			var node = treeNodes[i];
			node.level = level;
			//node.tId = setting.treeObjId + "_" + (++zTreeId);
			node.tId = (treeNodes[i].tId) ? treeNodes[i].tId : setting.treeObjId + "_" + (++zTreeId);
			node.parentNode = parentNode;
			node.checkedNew = (node.checkedNew == undefined)? (node.checked == true) : node.checkedNew;
			node.check_Focus = false;
			node.check_True_Full = true;
			node.check_False_Full = true;
			node.editNameStatus = false;

			var tmpParentNode = (parentNode) ? parentNode: setting.root;

			//允许在非空节点上增加节点
			node.isFirstNode = (tmpParentNode[setting.nodesCol].length == treeNodes.length) && (i == 0);
			node.isLastNode = (i == (treeNodes.length - 1));

			if (node[setting.nodesCol] && node[setting.nodesCol].length > 0) {
				node.open = (node.open) ? true: false;
				node.isParent = true;
				showTree(setting, node);
				initTreeNodes(setting, level + 1, node[setting.nodesCol], node);

			} else {
				node.isParent = (node.isParent) ? true: false;
				showTree(setting, node);
				
				//只在末级节点的最后一个进行checkBox修正
				if (setting.checkable && i == treeNodes.length - 1) {
					repairParentChkClass(setting, node);
				}
			}
		}
	}

	//显示单个节点
	function showTree(setting, treeNode) {
		//console.log(treeNode.name);
		//获取父节点
		var p = treeNode.parentNode;
		if (!p) {
			p = $("#" + setting.treeObjId);
		} else {
			p = $("#" + treeNode.parentNode.tId + IDMark_Ul);
		}

		var html = "<li id='" + treeNode.tId + "' class='tree-node'>" + "<button type=\"button\" class=\"switch\" id='" + treeNode.tId + IDMark_Switch + "' title='' onfocus='this.blur();'></button>" + "<a id='" + treeNode.tId + IDMark_A + "' onclick=\"" + (treeNode.click || '') + "\" ><button type=\"button\" class=\"" + (treeNode.iconSkin ? treeNode.iconSkin : "") + " ico\" id='" + treeNode.tId + IDMark_Icon + "' title='' onfocus='this.blur();'></button><span id='" + treeNode.tId + IDMark_Span + "'></span></a>" + "<ul id='" + treeNode.tId + IDMark_Ul + "'></ul>" + "</li>";
		p.append(html);
		
		var switchObj = $("#" + treeNode.tId + IDMark_Switch);
		var aObj = $("#" + treeNode.tId + IDMark_A);
		var nObj = $("#" + treeNode.tId + IDMark_Span);
		var ulObj = $("#" + treeNode.tId + IDMark_Ul);
		
		nObj.text(treeNode[setting.nameCol]);
		var icoObj = $("#" + treeNode.tId + IDMark_Icon);

		//设置Line、Ico等css属性
		if (setting.showLine) {
			if (treeNode.level == 0 && treeNode.isFirstNode && treeNode.isLastNode) {
				switchObj.attr("class", switchObj.attr("class") + "_" + LineMark_Root);
			} else if (treeNode.level == 0 && treeNode.isFirstNode) {
				switchObj.attr("class", switchObj.attr("class") + "_" + LineMark_Roots);
			} else if (treeNode.isLastNode) {
				switchObj.attr("class", switchObj.attr("class") + "_" + LineMark_Bottom);
			} else {
				switchObj.attr("class", switchObj.attr("class") + "_" + LineMark_Center);
			}
			if (!treeNode.isLastNode) {
				ulObj.addClass(LineMark_Line);
			}
		} else {
			switchObj.attr("class", switchObj.attr("class") + "_" + LineMark_NoLine);
		}
		if (treeNode.isParent) {
			var tmpOpen = (treeNode.open ? ("_" + FolderMark_Open) : ("_" + FolderMark_Close));
			switchObj.attr("class", switchObj.attr("class") + tmpOpen);
			icoObj.attr("class", icoObj.attr("class") + tmpOpen);
		} else {
			switchObj.attr("class", switchObj.attr("class") + "_" + FolderMark_Docu);
			icoObj.attr("class", icoObj.attr("class") + "_" + FolderMark_Docu);
		}
		if (treeNode.icon) icoObj.attr("style", "background:url(" + treeNode.icon + ") 0 0 no-repeat;");

		//增加树节点展开、关闭事件
		ulObj.css({
			"display": (treeNode.open ? "block": "none")
		});
		if (treeNode.isParent) {
			switchObj.unbind('click');
			switchObj.bind('click', {
				treeObjId: setting.treeObjId,
				treeNode: treeNode
			},
			onSwitchNode);
			aObj.bind('dblclick', {
				treeObjId: setting.treeObjId,
				treeNode: treeNode
			},
			onSwitchNode);
		}
		aObj.bind('click', 
		function() {
			var beforeClick = true;
			if ((typeof setting.callback.beforeClick) == "function") beforeClick = setting.callback.beforeClick(setting.treeObjId, treeNode);
			if (beforeClick == false) return;
			//除掉默认事件，防止文本被选择
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			//设置节点为选中状态
			selectNode(setting, treeNode);
			//触发click事件
			$("#" + setting.treeObjId).trigger(ZTREE_CLICK, [setting.treeObjId, treeNode]);
		});
		icoObj.bind('mousedown',
		function() {
			treeNode.editNameStatus = false;
		});

		//显示CheckBox Or Radio
		if (setting.checkable) {
			switchObj.after("<BUTTON type='BUTTON' ID='" + treeNode.tId + "_check' onfocus='this.blur();' ></BUTTON>");
			
			var checkObj = $("#" + treeNode.tId + "_check");
			
			if (setting.checkStyle == Check_Style_Radio && setting.checkRadioType == Radio_Type_All && treeNode.checkedNew ) {
				setting.checkRadioCheckedList = setting.checkRadioCheckedList.concat([treeNode]);
			}
			
			setChkClass(setting, checkObj, treeNode);
			
			checkObj.bind('click',
			function() {
				var beforeChange = true;
				if ((typeof setting.callback.beforeChange) == "function") beforeChange = setting.callback.beforeChange(setting.treeObjId, treeNode);
				if (beforeChange == false) return;
				
				treeNode.checkedNew = !treeNode.checkedNew;
				if (setting.checkStyle == Check_Style_Radio) {
					if (treeNode.checkedNew) {
						if (setting.checkRadioType == Radio_Type_All) {
							for (var i = setting.checkRadioCheckedList.length-1; i >= 0; i--) {
								var pNode = setting.checkRadioCheckedList[i];
								pNode.checkedNew = false;
								setting.checkRadioCheckedList.splice(i, 1);
								
								setChkClass(setting, $("#" + pNode.tId + "_check"), pNode);
								if (pNode.parentNode != treeNode.parentNode) {
									repairParentChkClassWithSelf(setting, pNode);
								}
							}
							setting.checkRadioCheckedList = setting.checkRadioCheckedList.concat([treeNode]);
						} else {
							var parentNode = (treeNode.parentNode) ? treeNode.parentNode : setting.root;
							for (var son = 0; son < parentNode[setting.nodesCol].length; son++) {
								var pNode = parentNode[setting.nodesCol][son];
								if (pNode.checkedNew && pNode != treeNode) {
									pNode.checkedNew = false;
									setChkClass(setting, $("#" + pNode.tId + "_check"), pNode);
								}
							}
						}
					} else if (setting.checkRadioType == Radio_Type_All) {
						for (var i = 0; i < setting.checkRadioCheckedList.length; i++) {
							if (treeNode == setting.checkRadioCheckedList[i]) {
								setting.checkRadioCheckedList.splice(i, 1);
								break;
							}
						}
					}
					
				} else {
					if (treeNode.checkedNew && setting.checkType.Y.indexOf("s") > -1) {
						setSonNodeCheckBox(setting, treeNode, true);
						repairSonChkClass(setting, treeNode);
					}
					if (treeNode.checkedNew && setting.checkType.Y.indexOf("p") > -1) {
						setParentNodeCheckBox(setting, treeNode, true);
					}
					if (!treeNode.checkedNew && setting.checkType.N.indexOf("s") > -1) {
						setSonNodeCheckBox(setting, treeNode, false);
						repairSonChkClass(setting, treeNode);
					}
					if (!treeNode.checkedNew && setting.checkType.N.indexOf("p") > -1) {
						setParentNodeCheckBox(setting, treeNode, false);
					}
				}
				setChkClass(setting, checkObj, treeNode);
				repairParentChkClassWithSelf(setting, treeNode);

				//触发 CheckBox 点击事件
				$("#" + setting.treeObjId).trigger(ZTREE_CHANGE, [setting.treeObjId, treeNode]);

			});
			
			checkObj.bind('mouseover',
			function() {
				treeNode.checkboxFocus = true;
				setChkClass(setting, checkObj, treeNode);
			});

			checkObj.bind('mouseout',
			function() {
				treeNode.checkboxFocus = false;
				setChkClass(setting, checkObj, treeNode);
			});
		}

		aObj.attr("target", (treeNode.target || "_blank"));
		if (treeNode.url && !setting.editable) aObj.attr("href", treeNode.url);
		
		//编辑、删除按钮
		if (setting.editable) {
			aObj.hover(
				function() {
					if (setting.dragStatus == 0) {
						removeEditBtn(treeNode); 
						removeRemoveBtn(treeNode);
						addEditBtn(setting, treeNode);
						addRemoveBtn(setting, treeNode);
						
					}
				},
				function() {
					removeEditBtn(treeNode); 
					removeRemoveBtn(treeNode); 
				}
			);
		}

		aObj.bind('mousedown',
		function(eventMouseDown) {

			//右键不能拖拽
			if (eventMouseDown.button == 2 || !setting.editable) return;

			var doc = document;
			var curNode;
			var tmpTarget;
			var mouseDownX = eventMouseDown.clientX;
			var mouseDownY = eventMouseDown.clientY;

			$(doc).mousemove(function(event) {
				
				//为便于输入框正常操作，在输入框内移动鼠标不能拖拽节点
				if (treeNode.editNameStatus) {
					return true;
				}

				//除掉默认事件，防止文本被选择
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				
				//避免鼠标误操作，对于第一次移动小于MinMoveSize时，不开启拖拽功能
				if (setting.dragStatus == 0 && Math.abs(mouseDownX - event.clientX) < MinMoveSize
						 && Math.abs(mouseDownY - event.clientY) < MinMoveSize) {
					return true;
				}

				$("body").css("cursor", "pointer");
				var switchObj = $("#" + treeNode.tId + IDMark_Switch);

				if (setting.dragStatus == 0 && treeNode.isParent && treeNode.open) {
					expandAndCollapseNode(setting, treeNode, !treeNode.open);
					setting.dragNodeShowBefore = true;
				}

				if (setting.dragStatus == 0) {
					//避免beforeDrag alert时，得到返回值之前仍能拖拽的Bug
					setting.dragStatus = -1;
					var beforeDrag = true;
					if ((typeof setting.callback.beforeDrag) == "function") beforeDrag = setting.callback.beforeDrag(setting.treeObjId, treeNode);
					if (beforeDrag == false) return;
					
					setting.dragStatus = 1;
					showIfameMask(true);

					//设置节点为选中状态
					selectNode(setting, treeNode);
					removeEditBtn(treeNode);
					removeRemoveBtn(treeNode);

					var tmpNode = $("#" + treeNode.tId).clone();
					tmpNode.attr("id", treeNode.tId + "_tmp");
					tmpNode.css("padding", "0");
					tmpNode.children("#" + treeNode.tId + IDMark_A).removeClass(Class_CurSelectedNode);
					tmpNode.children("#" + treeNode.tId + IDMark_Ul).css("display", "none");

					curNode = $("<ul class='zTreeDragUL'></ul>").append(tmpNode);
					curNode.attr("id", treeNode.tId + IDMark_Ul + "_tmp");
					curNode.addClass($("#" + setting.treeObjId).attr("class"));
					curNode.appendTo("body");

					//触发 DRAG 拖拽事件，返回正在拖拽的源数据对象
					$("#" + setting.treeObjId).trigger(ZTREE_DRAG, [setting.treeObjId, treeNode]);
				}

				if (setting.dragStatus == 1) {
					if (tmpTarget) {
						tmpTarget.removeClass(Class_TmpTargetTree);
						tmpTarget.removeClass(Class_TmpTargetNode);
					}
					tmpTarget = null;

					if (event.target.id == setting.treeObjId && treeNode.parentNode != null) {
						//非根节点 移到 根
						tmpTarget = $("#" + setting.treeObjId);
						tmpTarget.addClass(Class_TmpTargetTree);

					} else if (event.target.id && $("#" + setting.treeObjId).find("#" + event.target.id).length > 0) {
						//任意节点 移到 其他节点
						var targetObj = $("#" + event.target.id);
						while (!targetObj.is("li") && targetObj.attr("id") != setting.treeObjId) {
							targetObj = targetObj.parent();
						};

						//如果移到自己 或者自己的父级/子集，则不能当做临时目标
						if (treeNode.parentNode && targetObj.attr("id") != treeNode.tId && targetObj.attr("id") != treeNode.parentNode.tId && $("#" + treeNode.tId).find("#" + targetObj.attr("id")).length == 0) {
							//非根节点移动
							targetObj.children("a").addClass(Class_TmpTargetNode);
							tmpTarget = targetObj.children("a");
						} else if (treeNode.parentNode == null && targetObj.attr("id") != treeNode.tId && $("#" + treeNode.tId).find("#" + targetObj.attr("id")).length == 0) {
							//根节点移动
							targetObj.children("a").addClass(Class_TmpTargetNode);
							tmpTarget = targetObj.children("a");
						}
					}
					var dX = (doc.body.scrollLeft == 0) ? doc.documentElement.scrollLeft: doc.body.scrollLeft;
					var dY = (doc.body.scrollTop == 0) ? doc.documentElement.scrollTop: doc.body.scrollTop;
					curNode.css({
						"top": (event.clientY + dY + 3) + "px",
						"left": (event.clientX + dX + 3) + "px"
					});
				}
				
				return false;

			});

			$(doc).mouseup(function(event) {
				$(doc).unbind("mousemove");
				$(doc).unbind("mouseup");
				$("body").css("cursor", "auto");
				if (tmpTarget) {
					tmpTarget.removeClass(Class_TmpTargetTree);
					tmpTarget.removeClass(Class_TmpTargetNode);
				}
				showIfameMask(false);

				if (setting.dragStatus == 0) return;
				setting.dragStatus = 0;

				if (treeNode.isParent && setting.dragNodeShowBefore && !treeNode.open) {
					expandAndCollapseNode(setting, treeNode, !treeNode.open);
					setting.dragNodeShowBefore = false;
				}

				if (curNode) curNode.remove();
				

				//显示树上 移动后的节点							
				if (tmpTarget) {
					var tmpTargetNodeId = "";
					if (tmpTarget.attr("id") == setting.treeObjId) {
						//转移到根节点
						tmpTargetNodeId = null;
					} else {
						//转移到子节点
						tmpTarget = tmpTarget.parent();
						while (!tmpTarget.is("li") && tmpTarget.attr("id") != setting.treeObjId) {
							tmpTarget = tmpTarget.parent();
						};
						tmpTargetNodeId = tmpTarget.attr('id');
					}
					var dragTargetNode = tmpTargetNodeId == null ? null: getTreeNodeByTId(setting, setting.root[setting.nodesCol], tmpTargetNodeId);

					var beforeDrop = true;
					if ((typeof setting.callback.beforeDrop) == "function") beforeDrop = setting.callback.beforeDrop(setting.treeObjId, treeNode, dragTargetNode);
					if (beforeDrop == false) return;

					moveTreeNode(setting, dragTargetNode, treeNode);

					//触发 DROP 拖拽事件，返回拖拽的目标数据对象
					$("#" + setting.treeObjId).trigger(ZTREE_DROP, [setting.treeObjId, treeNode, dragTargetNode]);

				} else {
					//触发 DROP 拖拽事件，返回null
					$("#" + setting.treeObjId).trigger(ZTREE_DROP, [setting.treeObjId, null, null]);
				}
			});
			
//			return false;
		});

	}

	//获取对象的绝对坐标
	function getAbsPoint(obj) {
		var r = new Array(2);
		oRect = obj.getBoundingClientRect();
		r[0] = oRect.left;
		r[1] = oRect.top;
		return r;
	}
	
	//设置光标位置函数
	function setCursorPosition(obj, pos){
		if(obj.setSelectionRange) {
			obj.focus();
			obj.setSelectionRange(pos,pos);
		} else if (obj.createTextRange) {
			var range = obj.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}

	var dragMaskList = new Array();
	//显示、隐藏 Iframe的遮罩层（主要用于避免拖拽不流畅）
	function showIfameMask(showSign) {
		//清空所有遮罩
		while (dragMaskList.length > 0) {
			dragMaskList[0].remove();
			dragMaskList.shift();
		}
		if (showSign) {
			//显示遮罩
			var iframeList = $("iframe");
			for (var i = 0; i < iframeList.length; i++) {
				var obj = iframeList.get(i);
				var r = getAbsPoint(obj);
				var dragMask = $("<div id='zTreeMask_" + i + "' class='zTreeMask' style='top:" + r[1] + "px; left:" + r[0] + "px; width:" + obj.offsetWidth + "px; height:" + obj.offsetHeight + "px;'></div>");
				dragMask.appendTo("body");
				dragMaskList.push(dragMask);
			}
		}
	}

	//对于button替换class 拼接字符串
	function replaceSwitchClass(obj, newName) {
		if (!obj) return;

		var tmpName = obj.attr("class");
		if (tmpName == undefined) return;
		var tmpList = tmpName.split("_");
		switch (newName) {
		case LineMark_Root:
		case LineMark_Roots:
		case LineMark_Center:
		case LineMark_Bottom:
		case LineMark_NoLine:
			tmpList[1] = newName;
			break;
		case FolderMark_Open:
		case FolderMark_Close:
		case FolderMark_Docu:
			tmpList[2] = newName;
			break;
		}

		obj.attr("class", tmpList.join("_"));
	}
	function replaceIcoClass(obj, newName) {
		if (!obj) return;

		var tmpName = obj.attr("class");
		if (tmpName == undefined) return;
		var tmpList = tmpName.split("_");
		switch (newName) {
		case FolderMark_Open:
		case FolderMark_Close:
		case FolderMark_Docu:
			tmpList[1] = newName;
			break;
		}

		obj.attr("class", tmpList.join("_"));
	}
	
	//删除 编辑、删除按钮
	function removeEditBtn(treeNode) {		
		$("#" + treeNode.tId + IDMark_Edit).unbind().remove();
	}
	function removeRemoveBtn(treeNode) {		
		$("#" + treeNode.tId + IDMark_Remove).unbind().remove();
	}
	function addEditBtn(setting, treeNode) {		
		if (!setting.edit_renameBtn || treeNode.editNameStatus || $("#" + treeNode.tId + IDMark_Edit).length > 0) {
			return;
		}

		var aObj = $("#" + treeNode.tId + IDMark_A);
		var editStr = "<button type='button' class='edit' id='" + treeNode.tId + IDMark_Edit + "' title='' onfocus='this.blur();' style='display:none;'></button>";
		aObj.append(editStr);
		
		var editBtnObj = $("#" + treeNode.tId + IDMark_Edit);
		var right = (setting.treeObj.attr("offsetLeft") + setting.treeObj.attr("offsetWidth") + setting.treeObj.attr("scrollLeft") - aObj.attr("offsetLeft") - aObj.attr("offsetWidth") - 2*editBtnObj.width() - 15);
		if (right < 0) {
			//如果节点处于tree的最右侧，为避免无法正常操作按钮，则在左侧显示
			editBtnObj.remove();
			aObj.prepend(editStr);
			editBtnObj = $("#" + treeNode.tId + IDMark_Edit);
		}
		editBtnObj.bind('click', 
			function() {
				var beforeRename = true;
				if ((typeof setting.callback.beforeRename) == "function") beforeRename = setting.callback.beforeRename(setting.treeObjId, treeNode);
				if (beforeRename == false) return;
				removeEditBtn(treeNode); removeRemoveBtn(treeNode); editTreeNode(setting, treeNode);
				return false;
			}
		).bind('mousedown',
			function(eventMouseDown) {return true;}
		).show();
	}
	function addRemoveBtn(setting, treeNode) {		
		if (!setting.edit_removeBtn || $("#" + treeNode.tId + IDMark_Remove).length > 0) {
			return;
		}
		
		var aObj = $("#" + treeNode.tId + IDMark_A);
		var removeStr = "<button type='button' class='remove' id='" + treeNode.tId + IDMark_Remove + "' title='' onfocus='this.blur();' style='display:none;'></button>";
		aObj.append(removeStr);
		
		var removeBtnObj = $("#" + treeNode.tId + IDMark_Remove);
		var right = (setting.treeObj.attr("offsetLeft") + setting.treeObj.attr("offsetWidth") - aObj.attr("offsetLeft") - aObj.attr("offsetWidth") - 1*removeBtnObj.width() - 15);
		if (right < 0) {
			//如果节点处于tree的最右侧，为避免无法正常操作按钮，则在左侧显示
			removeBtnObj.remove();
			aObj.prepend(removeStr);
			removeBtnObj = $("#" + treeNode.tId + IDMark_Remove);
		}
		
		$("#" + treeNode.tId + IDMark_Remove).bind('click', 
			function() {
				var beforeRemove = true;
				if ((typeof setting.callback.beforeRemove) == "function") beforeRemove = setting.callback.beforeRemove(setting.treeObjId, treeNode);
				if (beforeRemove == false) return;
				removeTreeNode(setting, treeNode);
				//触发remove事件
				$("#" + setting.treeObjId).trigger(ZTREE_REMOVE, [setting.treeObjId, treeNode]);
				return false;
			}
		).bind('mousedown',
			function(eventMouseDown) {return true;}
		).show();
	}
	
	//设置CheckBox的Class类型，主要用于显示子节点是否全部被选择的样式
	function setChkClass(setting, obj, treeNode) {
		if (!obj) return;
		obj.removeClass();
		var chkName = setting.checkStyle + "_" + (treeNode.checkedNew ? CheckBox_True : CheckBox_False)
			+ "_" + ((treeNode.checkedNew || setting.checkStyle == Check_Style_Radio) ? (treeNode.check_True_Full? CheckBox_Full:CheckBox_Part) : (treeNode.check_False_Full? CheckBox_Full:CheckBox_Part) );
		chkName = treeNode.checkboxFocus ? chkName + "_" + CheckBox_Focus : chkName;
		obj.addClass(CheckBox_Default);
		obj.addClass(chkName);
	}
	//修正父节点选择的样式
	function repairParentChkClass(setting, treeNode) {
		if (!treeNode || !treeNode.parentNode) return;
		repairChkClass(setting, treeNode.parentNode);
		repairParentChkClass(setting, treeNode.parentNode);
	}	
	function repairParentChkClassWithSelf(setting, treeNode) {
		if (treeNode[setting.nodesCol] && treeNode[setting.nodesCol].length > 0) {
			repairParentChkClass(setting, treeNode[setting.nodesCol][0]);
		} else {
			repairParentChkClass(setting, treeNode);
		}
	}
	//修正子节点选择的样式
	function repairSonChkClass(setting, treeNode) {
		if (!treeNode || !treeNode[setting.nodesCol]) return;
		for (var son = 0; son < treeNode[setting.nodesCol].length; son++) {
			if (treeNode[setting.nodesCol][son][setting.nodesCol]) {
				repairSonChkClass(setting, treeNode[setting.nodesCol][son]);
			}
		}
		repairChkClass(setting, treeNode);
	}	
	function repairChkClass(setting, treeNode) {
		if (!treeNode || !treeNode[setting.nodesCol]) return;
		var trueSign = true;
		var falseSign = true;
		for (var son = 0; son < treeNode[setting.nodesCol].length; son++) {
			if (setting.checkStyle == Check_Style_Radio && (treeNode[setting.nodesCol][son].checkedNew || !treeNode[setting.nodesCol][son].check_True_Full)) {
				trueSign = false;
			} else if (setting.checkStyle != Check_Style_Radio && treeNode.checkedNew && (!treeNode[setting.nodesCol][son].checkedNew || !treeNode[setting.nodesCol][son].check_True_Full)) {
				trueSign = false;
			} else if (setting.checkStyle != Check_Style_Radio && !treeNode.checkedNew && (treeNode[setting.nodesCol][son].checkedNew || !treeNode[setting.nodesCol][son].check_False_Full)) {
				falseSign = false;
			}
			if (!trueSign || !falseSign) break;
		}
		treeNode.check_True_Full = trueSign;
		treeNode.check_False_Full = falseSign;
		var checkObj = $("#" + treeNode.tId + "_check");
		setChkClass(setting, checkObj, treeNode);
	}

	//点击展开、折叠节点
	function onSwitchNode(event) {
		var setting = settings[event.data.treeObjId];
		var treeNode = event.data.treeNode;
		
		setting.expandTriggerFlag = true;
		
		if (treeNode.open) {
			var beforeCollapse = true;
			if ((typeof setting.callback.beforeCollapse) == "function") beforeCollapse = setting.callback.beforeCollapse(setting.treeObjId, treeNode);
			if (beforeCollapse == false) {setting.expandTriggerFlag = false; return;}
			switchNode(setting, treeNode);
		} else {
			var beforeExpand = true;
			if ((typeof setting.callback.beforeExpand) == "function") beforeExpand = setting.callback.beforeExpand(setting.treeObjId, treeNode);
			if (beforeExpand == false) {setting.expandTriggerFlag = false; return;}
			switchNode(setting, treeNode);
		}
	}

	function switchNode(setting, treeNode) {
		//if (treeNode && treeNode[setting.nodesCol] && treeNode[setting.nodesCol].length > 0) {
		if (treeNode) {
			if(treeNode[setting.nodesCol] && treeNode[setting.nodesCol].length > 0){
				expandAndCollapseNode(setting, treeNode, !treeNode.open);
			} else {// add by mediav
				var switchObj = $("#" + treeNode.tId + IDMark_Switch);
				var icoObj = $("#" + treeNode.tId + IDMark_Icon);
				replaceSwitchClass(switchObj, FolderMark_Docu);
				//replaceIcoClass(icoObj, FolderMark_Open);
			}
		} else if (setting.async && !setting.editable) {
			asyncGetNode(setting, treeNode);
		}
		//.net下刷新页面的bug可能还是button造成的，因此将一下代码暂时屏蔽
//		if(window.event) window.event.returnValue = null;
//        return false;
	}

	function asyncGetNode(setting, treeNode) {

		var tmpParam = "";
		for (var i = 0; treeNode && i < setting.asyncParam.length; i++) {
			tmpParam += (tmpParam.length > 0 ? "&": "") + setting.asyncParam[i] + "=" + treeNode[setting.asyncParam[i]];
		}
		for (var i = 0; i < setting.asyncParamOther.length; i += 2) {
			tmpParam += (tmpParam.length > 0 ? "&": "") + setting.asyncParamOther[i] + "=" + setting.asyncParamOther[i + 1];
		}

		$.ajax({
			type: "POST",
			url: setting.asyncUrl,
			data: tmpParam,
			success: function(msg) {
				if (!msg || msg.length == 0) {
					return;
				}
				var newNodes = "";
				try {
					newNodes = eval("(" + msg + ")");
				} catch(err) {}

				if (newNodes && newNodes != "") {
					addTreeNodes(setting, treeNode, newNodes, false);
				}
				$("#" + setting.treeObjId).trigger(ZTREE_ASYNC_SUCCESS, [setting.treeObjId, treeNode, msg]);

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				setting.expandTriggerFlag = false;
				$("#" + setting.treeObjId).trigger(ZTREE_ASYNC_ERROR, [setting.treeObjId, treeNode, XMLHttpRequest, textStatus, errorThrown]);
			}
		});
	}

	// 展开 或者 折叠 节点下级
	function expandAndCollapseNode(setting, treeNode, expandSign, animateSign, callback) {
		if (!treeNode || treeNode.open == expandSign) {
			if (typeof callback == "function") callback();
			return;
		}
		
		if (setting.expandTriggerFlag) {
			callback = function(){
				if (treeNode.open) {
					//触发expand事件
					$("#" + setting.treeObjId).trigger(ZTREE_EXPAND, [setting.treeObjId, treeNode]);
				} else {
					//触发collapse事件
					$("#" + setting.treeObjId).trigger(ZTREE_COLLAPSE, [setting.treeObjId, treeNode]);
				}
			};
			setting.expandTriggerFlag = false;
		}
		
		var switchObj = $("#" + treeNode.tId + IDMark_Switch);
		var icoObj = $("#" + treeNode.tId + IDMark_Icon);
		var ulObj = $("#" + treeNode.tId + IDMark_Ul);

		if (treeNode.isParent && treeNode[setting.nodesCol] && treeNode[setting.nodesCol].length > 0) {
			if (!treeNode.open) {
				replaceSwitchClass(switchObj, FolderMark_Open);
				replaceIcoClass(icoObj, FolderMark_Open);
				treeNode.open = true;
				if (animateSign == false) {
					ulObj.show();
					if (typeof callback == "function") callback();
				} else {
					ulObj.show(setting.expandSpeed, callback);
				}
			} else {
				replaceSwitchClass(switchObj, FolderMark_Close);
				replaceIcoClass(icoObj, FolderMark_Close);
				treeNode.open = false;
				if (animateSign == false) {
					ulObj.hide();
					if (typeof callback == "function") callback();
				} else {
					ulObj.hide(setting.expandSpeed, callback);
				}
			}
		}
	}

	//遍历子节点展开 或 折叠
	function expandCollapseSonNode(setting, treeNode, expandSign, animateSign, callback) {
		var treeNodes = (treeNode) ? treeNode[setting.nodesCol]: setting.root[setting.nodesCol];
		
		//针对动画进行优化,一般来说只有在第一层的时候，才进行动画效果
		var selfAnimateSign = (treeNode) ? false : animateSign;
		if (treeNodes) {
			for (var son = 0; son < treeNodes.length; son++) {
				if (treeNodes[son]) expandCollapseSonNode(setting, treeNodes[son], expandSign, selfAnimateSign);
			}
		}
		//保证callback只执行一次
		expandAndCollapseNode(setting, treeNode, expandSign, animateSign, callback );

	}

	//遍历父节点展开 或 折叠
	function expandCollapseParentNode(setting, treeNode, expandSign, animateSign, callback) {
		//针对动画进行优化,一般来说只有在第一层的时候，才进行动画效果
		if (!treeNode.parentNode) {
			//保证callback只执行一次
			expandAndCollapseNode(setting, treeNode, expandSign, animateSign, callback);
			return ;
		} else {
			expandAndCollapseNode(setting, treeNode, expandSign, animateSign);
		}
		
		if (treeNode.parentNode) {
			expandCollapseParentNode(setting, treeNode.parentNode, expandSign, animateSign, callback);
		}
	}

	//遍历父节点设置checkbox
	function setParentNodeCheckBox(setting, treeNode, value) {
		var checkObj = $("#" + treeNode.tId + "_check");
		treeNode.checkedNew = value;
		setChkClass(setting, checkObj, treeNode);
		if (treeNode.parentNode) {
			var pSign = true;
			if (!value) {
				for (var son = 0; son < treeNode.parentNode[setting.nodesCol].length; son++) {
					if (treeNode.parentNode[setting.nodesCol][son].checkedNew) {
						pSign = false;
						break;
					}
				}
			}
			if (pSign) {
				setParentNodeCheckBox(setting, treeNode.parentNode, value);
			}
		}
	}

	//遍历子节点设置checkbox
	function setSonNodeCheckBox(setting, treeNode, value) {
		if (!treeNode) return;
		var checkObj = $("#" + treeNode.tId + "_check");
		
		treeNode.checkedNew = value;
		setChkClass(setting, checkObj, treeNode);
		
		if (!treeNode[setting.nodesCol]) return;
		for (var son = 0; son < treeNode[setting.nodesCol].length; son++) {
			if (treeNode[setting.nodesCol][son]) setSonNodeCheckBox(setting, treeNode[setting.nodesCol][son], value);
		}
	}

	//遍历子节点设置level,主要用于移动节点后的处理
	function setSonNodeLevel(setting, parentNode, treeNode) {
		if (!treeNode) return;
		treeNode.level = (parentNode)? parentNode.level + 1 : 0;
		if (!treeNode[setting.nodesCol]) return;
		for (var son = 0; son < treeNode[setting.nodesCol].length; son++) {
			if (treeNode[setting.nodesCol][son]) setSonNodeLevel(setting, treeNode, treeNode[setting.nodesCol][son]);
		}
	}

	//增加子节点
	function addTreeNodes(setting, parentNode, newNodes, isSilent) {
		if (parentNode) {
			//目标节点必须在当前树内
			if ($("#" + setting.treeObjId).find("#" + parentNode.tId).length == 0) return;

			target_switchObj = $("#" + parentNode.tId + IDMark_Switch);
			target_icoObj = $("#" + parentNode.tId + IDMark_Icon);
			target_aObj = $("#" + parentNode.tId + IDMark_A);
			target_ulObj = $("#" + parentNode.tId + IDMark_Ul);

			//处理节点在目标节点的图片、线
			if (!parentNode.open) {
				replaceSwitchClass(target_switchObj, FolderMark_Close);
				replaceIcoClass(target_icoObj, FolderMark_Close);			
				parentNode.open = false;
				target_ulObj.css({
					"display": "none"
				});
			}

			//如果目标节点不是父节点，增加树节点展开、关闭事件
			if (!parentNode.isParent) {
				target_switchObj.unbind('click');
				target_switchObj.bind('click',
				function() {
					expandAndCollapseNode(setting, parentNode, !parentNode.open);
				});
				target_aObj.unbind('dblclick');
				target_aObj.bind('dblclick', {
					treeObjId: setting.treeObjId,
					treeNode: parentNode
				},
				onSwitchNode);
			}

			addTreeNodesData(setting, parentNode, newNodes);
			initTreeNodes(setting, parentNode.level + 1, newNodes, parentNode);
			//如果选择某节点，则必须展开其全部父节点
			if (!isSilent) {
				expandCollapseParentNode(setting, parentNode, true);
			}
		} else {
			addTreeNodesData(setting, setting.root, newNodes);
			initTreeNodes(setting, 0, newNodes, null);
		}
	}

	//增加节点数据
	function addTreeNodesData(setting, parentNode, treenodes) {
		if (!parentNode[setting.nodesCol]) parentNode[setting.nodesCol] = [];
		if (parentNode[setting.nodesCol].length > 0) {
			var tmpId = parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].tId;
			parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].isLastNode = false;
			//if (parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].isFirstNode) { // bug
			if (parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].isFirstNode) { // modify by mediav
				(parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].level === 0) ? replaceSwitchClass($("#" + tmpId + IDMark_Switch), LineMark_Roots)
																									: replaceSwitchClass($("#" + tmpId + IDMark_Switch), LineMark_Center);
			} else {
				replaceSwitchClass($("#" + tmpId + IDMark_Switch), LineMark_Center);
			}
			$("#" + tmpId + IDMark_Ul).addClass(LineMark_Line);
		}
		parentNode.isParent = true;
		parentNode[setting.nodesCol] = parentNode[setting.nodesCol].concat(treenodes);
	}

	//移动子节点
	function moveTreeNode(setting, targetNode, treeNode, animateSign) {
		if (targetNode == treeNode) return;
		var oldParentNode = treeNode.parentNode == null ? setting.root: treeNode.parentNode;

		var targetNodeIsRoot = (targetNode === null || targetNode == setting.root);
		if (targetNodeIsRoot && targetNode === null) targetNode = setting.root;

		var src_switchObj = $("#" + treeNode.tId + IDMark_Switch);
		var src_ulObj = $("#" + treeNode.tId + IDMark_Ul);

		var targetObj;
		var target_switchObj;
		var target_icoObj;
		var target_aObj;
		var target_ulObj;

		if (targetNodeIsRoot) {
			//转移到根节点
			targetObj = $("#" + setting.treeObjId);
			target_ulObj = targetObj;

		} else {
			//转移到子节点
			target_switchObj = $("#" + targetNode.tId + IDMark_Switch);
			target_icoObj = $("#" + targetNode.tId + IDMark_Icon);
			target_aObj = $("#" + targetNode.tId + IDMark_A);
			target_ulObj = $("#" + targetNode.tId + IDMark_Ul);
		}

		//处理节点在目标处的图片、线
		replaceSwitchClass(target_switchObj, FolderMark_Open);
		replaceIcoClass(target_icoObj, FolderMark_Open);
		targetNode.open = true;
		target_ulObj.css({
			"display": "block"
		});

		//如果目标节点不是父节点，且不是根，增加树节点展开、关闭事件
		if (!targetNode.isParent && !targetNodeIsRoot) {
			target_switchObj.unbind('click');
			target_switchObj.bind('click',
			function() {
				expandAndCollapseNode(setting, targetNode, !targetNode.open);
			});
			target_aObj.unbind('dblclick');
			target_aObj.bind('dblclick', {
				treeObjId: setting.treeObjId,
				treeNode: targetNode
			},
			onSwitchNode);
		}

		target_ulObj.append($("#" + treeNode.tId).detach());

		//进行数据结构修正
		var tmpSrcIndex = -1;
		for (var i = 0; i < oldParentNode[setting.nodesCol].length; i++) {
			if (oldParentNode[setting.nodesCol][i].tId == treeNode.tId) tmpSrcIndex = i;
		}
		if (tmpSrcIndex >= 0) {
			oldParentNode[setting.nodesCol].splice(tmpSrcIndex, 1);
		}

		if (!targetNode[setting.nodesCol]) {
			targetNode[setting.nodesCol] = new Array();
		} else if (setting.showLine && targetNode[setting.nodesCol].length > 0) {
			//处理目标节点中当前最后一个节点的图标、线
			targetNode[setting.nodesCol][targetNode[setting.nodesCol].length - 1].isLastNode = false;
			var tmp_ulObj = $("#" + targetNode[setting.nodesCol][targetNode[setting.nodesCol].length - 1].tId + IDMark_Ul);
			var tmp_switchObj = $("#" + targetNode[setting.nodesCol][targetNode[setting.nodesCol].length - 1].tId + IDMark_Switch);
			tmp_ulObj.addClass(LineMark_Line);
			if (targetNodeIsRoot && targetNode[setting.nodesCol][targetNode[setting.nodesCol].length - 1].isFirstNode) {
				//节点 移到 根，并且原来只有一个根节点
				replaceSwitchClass(tmp_switchObj, LineMark_Roots);

			} else {
				replaceSwitchClass(tmp_switchObj, LineMark_Center);
			}
		}

		//数据节点转移
		if (targetNodeIsRoot) {
			//成为根节点，则不操作目标节点数据
			treeNode.parentNode = null;
		} else {
			//成为子节点		
			targetNode.isParent = true;
			treeNode.parentNode = targetNode;
		}
		setSonNodeLevel(setting, treeNode.parentNode, treeNode);
		targetNode[setting.nodesCol].splice(targetNode[setting.nodesCol].length, 0, treeNode);

		treeNode.isLastNode = true;
		treeNode.isFirstNode = (targetNode[setting.nodesCol].length == 1);
		//设置被移动节点为最后一个节点
		if (setting.showLine) {
			replaceSwitchClass(src_switchObj, LineMark_Bottom);
			src_ulObj.removeClass(LineMark_Line);
		}

		//处理原节点的父节点的图标、线
		if (oldParentNode[setting.nodesCol].length < 1) {
			//原所在父节点无子节点
			oldParentNode.isParent = false;
			var tmp_ulObj = $("#" + oldParentNode.tId + IDMark_Ul);
			var tmp_switchObj = $("#" + oldParentNode.tId + IDMark_Switch);
			var tmp_icoObj = $("#" + oldParentNode.tId + IDMark_Icon);
			replaceSwitchClass(tmp_switchObj, FolderMark_Docu);
			replaceIcoClass(tmp_icoObj, FolderMark_Docu);
			tmp_ulObj.css("display", "none");

		} else if (setting.showLine) {
			//原所在父节点有子节点
			oldParentNode[setting.nodesCol][oldParentNode[setting.nodesCol].length - 1].isLastNode = true;
			oldParentNode[setting.nodesCol][oldParentNode[setting.nodesCol].length - 1].isFirstNode = (oldParentNode[setting.nodesCol].length == 1);
			var tmp_ulObj = $("#" + oldParentNode[setting.nodesCol][oldParentNode[setting.nodesCol].length - 1].tId + IDMark_Ul);
			var tmp_switchObj = $("#" + oldParentNode[setting.nodesCol][oldParentNode[setting.nodesCol].length - 1].tId + IDMark_Switch);
			var tmp_icoObj = $("#" + oldParentNode[setting.nodesCol][oldParentNode[setting.nodesCol].length - 1].tId + IDMark_Icon);
			if (oldParentNode == setting.root) {
				if (oldParentNode[setting.nodesCol].length == 1) {
					//原为根节点 ，且移动后只有一个根节点
					replaceSwitchClass(tmp_switchObj, LineMark_Root);
				} else {
					var tmp_first_switchObj = $("#" + oldParentNode[setting.nodesCol][0].tId + IDMark_Switch);
					replaceSwitchClass(tmp_first_switchObj, LineMark_Roots);
					replaceSwitchClass(tmp_switchObj, LineMark_Bottom);
				}

			} else {
				replaceSwitchClass(tmp_switchObj, LineMark_Bottom);
			}

			tmp_ulObj.removeClass(LineMark_Line);
		}

		//移动后，则必须展开新位置的全部父节点
		expandCollapseParentNode(setting, targetNode, true, animateSign);
	}
	
	//编辑子节点名称
	function editTreeNode(setting, treeNode) {
		treeNode.editNameStatus = true;
		selectNode(setting, treeNode);
	}

	//删除子节点
	function removeTreeNode(setting, treeNode) {
		var parentNode = treeNode.parentNode == null ? setting.root: treeNode.parentNode;
		if (setting.curTreeNode === treeNode) setting.curTreeNode = null;
		if (setting.curEditTreeNode === treeNode) setting.curEditTreeNode = null;

		$("#" + treeNode.tId).remove();

		//进行数据结构修正
		var tmpSrcIndex = -1;
		for (var i = 0; i < parentNode[setting.nodesCol].length; i++) {
			if (parentNode[setting.nodesCol][i].tId == treeNode.tId) tmpSrcIndex = i;
		}
		if (tmpSrcIndex >= 0) {
			parentNode[setting.nodesCol].splice(tmpSrcIndex, 1);
		}

		//处理原节点的父节点的图标、线
		if (parentNode[setting.nodesCol].length < 1) {
			//原所在父节点无子节点
			parentNode.isParent = false;
			var tmp_ulObj = $("#" + parentNode.tId + IDMark_Ul);
			var tmp_switchObj = $("#" + parentNode.tId + IDMark_Switch);
			var tmp_icoObj = $("#" + parentNode.tId + IDMark_Icon);
			replaceSwitchClass(tmp_switchObj, FolderMark_Docu);
			replaceIcoClass(tmp_icoObj, FolderMark_Docu);
			tmp_ulObj.css("display", "none");

		} else if (setting.showLine) {
			//原所在父节点有子节点
			parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].isLastNode = true;
			parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].isFirstNode = (parentNode[setting.nodesCol].length == 1);
			var tmp_ulObj = $("#" + parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].tId + IDMark_Ul);
			var tmp_switchObj = $("#" + parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].tId + IDMark_Switch);
			var tmp_icoObj = $("#" + parentNode[setting.nodesCol][parentNode[setting.nodesCol].length - 1].tId + IDMark_Icon);
			if (parentNode == setting.root) {
				if (parentNode[setting.nodesCol].length == 1) {
					//原为根节点 ，且移动后只有一个根节点
					replaceSwitchClass(tmp_switchObj, LineMark_Root);
				} else {
					var tmp_first_switchObj = $("#" + parentNode[setting.nodesCol][0].tId + IDMark_Switch);
					replaceSwitchClass(tmp_first_switchObj, LineMark_Roots);
					replaceSwitchClass(tmp_switchObj, LineMark_Bottom);
				}

			} else {
				replaceSwitchClass(tmp_switchObj, LineMark_Bottom);
			}

			tmp_ulObj.removeClass(LineMark_Line);
		}
	}

	//根据 tId 获取 节点的数据对象
	function getTreeNodeByTId(setting, treeNodes, treeId) {
		if (!treeNodes || !treeId) return null;
		for (var i = 0; i < treeNodes.length; i++) {
			if (treeNodes[i].tId == treeId) {
				return treeNodes[i];
			}
			var tmp = getTreeNodeByTId(setting, treeNodes[i][setting.nodesCol], treeId);
			if (tmp) return tmp;
		}
		return null;
	}

	//取消之前选中节点状态
	function canclePreSelectedNode(setting) {
		if (setting.curTreeNode) {
			removeEditBtn(setting.curTreeNode); 
			removeRemoveBtn(setting.curTreeNode);
			$("#" + setting.curTreeNode.tId + IDMark_A).removeClass(Class_CurSelectedNode);
			$("#" + setting.curTreeNode.tId + IDMark_Span).text(setting.curTreeNode[setting.nameCol]);
			setting.curTreeNode = null;
		}
	}
	//取消之前编辑节点状态
	function canclePreEditNode(setting) {
		if (setting.curEditTreeNode) {
			$("#" + setting.curEditTreeNode.tId + IDMark_A).removeClass(Class_CurSelectedNode_Edit);
			$("#" + setting.curEditTreeNode.tId + IDMark_Input).unbind();
			$("#" + setting.curEditTreeNode.tId + IDMark_Span).text(setting.curEditTreeNode[setting.nameCol]);
			setting.curEditTreeNode.editNameStatus = false;
			setting.curEditTreeNode = null;
		}
	}
	
	//设置节点为当前选中节点
	function selectNode(setting, treeNode) {
		
		if (setting.curTreeNode == treeNode && !setting.editable) return;
		
		canclePreSelectedNode(setting);	
		canclePreEditNode(setting);
		
		if (setting.editable) {
			addEditBtn(setting, treeNode);
			addRemoveBtn(setting, treeNode);
		}
			
		if (treeNode.editNameStatus) {
			$("#" + treeNode.tId + IDMark_Span).html("<input type=text class='rename' id='" + treeNode.tId + IDMark_Input + "'>");
			
			var inputObj = $("#" + treeNode.tId + IDMark_Input);
			inputObj.attr("value", treeNode[setting.nameCol]);
			inputObj.focus();
			setCursorPosition(inputObj.get(0), treeNode[setting.nameCol].length);
			
			//拦截A的click dblclick监听
			inputObj.bind('blur',
					function(event) {
				treeNode[setting.nameCol] = this.value;
				//触发rename事件
				$("#" + setting.treeObjId).trigger(ZTREE_RENAME, [setting.treeObjId, treeNode]);
			}).bind('click',
					function(event) {
				return false;
			}).bind('dblclick',
					function(event) {
				return false;
			});
			
			
			$("#" + treeNode.tId + IDMark_A).addClass(Class_CurSelectedNode_Edit);
			setting.curEditTreeNode = treeNode;
		} else {
			$("#" + treeNode.tId + IDMark_A).addClass(Class_CurSelectedNode);
		}
		setting.curTreeNode = treeNode;
	}
	
	//获取全部 checked = true or false 的节点集合
	function getTreeCheckedNodes(setting, treeNodes, checked) {
		if (!treeNodes) return [];
		var results = [];
		for (var i = 0; i < treeNodes.length; i++) {
			if (treeNodes[i].checkedNew == checked) {
				results = results.concat([treeNodes[i]]);
			}
			var tmp = getTreeCheckedNodes(setting, treeNodes[i][setting.nodesCol], checked);
			if (tmp.length > 0) results = results.concat(tmp);
		}
		return results;
	}

	function zTreePlugin(){
		return {
			container:null,

			init: function(obj) {
				this.container = obj;
				return this;
			},

			refresh : function() {
				var treeObjId = this.container.attr("id");
				$("#" + treeObjId).empty();
				settings[treeObjId].curTreeNode = null;
				settings[treeObjId].curEditTreeNode = null;
				settings[treeObjId].dragStatus = 0;
				settings[treeObjId].dragNodeShowBefore = false;
				settings[treeObjId].checkRadioCheckedList = [];
				zTreeId = 0;
				initTreeNodes(settings[treeObjId], 0, settings[treeObjId].root[settings[treeObjId].nodesCol]);
			},

			setEditable : function(editable) {
				var treeObjId = this.container.attr("id");
				settings[treeObjId].editable = editable;
				return this.refresh();
			},

			getNodes : function() {
				var treeObjId = this.container.attr("id");
				return settings[treeObjId].root[settings[treeObjId].nodesCol];
			},

			getSelectedNode : function() {
				var treeObjId = this.container.attr("id");
				return settings[treeObjId].curTreeNode;
			},

			getCheckedNodes : function(selected) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId) return;
				selected = (selected != false);
				return getTreeCheckedNodes(settings[treeObjId], settings[treeObjId].root[settings[treeObjId].nodesCol], selected);
			},

			getNodeByTId : function(treeId) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeId) return;
				return getTreeNodeByTId(settings[treeObjId], settings[treeObjId].root[settings[treeObjId].nodesCol], treeId);
			},
			
			getNodeIndex : function(treeNode) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;
				var parentNode = (treeNode.parentNode == null) ? settings[treeObjId].root : treeNode.parentNode;
				for (var i=0; i<parentNode[settings[treeObjId].nodesCol].length; i++) {
					if (parentNode[settings[treeObjId].nodesCol][i] == treeNode) return i;
				}
				return -1;
			},
			
			getSetting : function() {
				var treeObjId = this.container.attr("id");
				if (!treeObjId) return;
				var zTreeSetting = settings[treeObjId];
				var setting = {checkType:{}, callback:{}};
				
				var tmp_checkType = zTreeSetting.checkType;
				zTreeSetting.checkType = undefined;
				var tmp_callback = zTreeSetting.callback;
				zTreeSetting.callback = undefined;
				var tmp_root = zTreeSetting.root;
				zTreeSetting.root = undefined;
				
				$.extend(setting, zTreeSetting);
				
				zTreeSetting.checkType = tmp_checkType;				
				zTreeSetting.callback = tmp_callback;				
				zTreeSetting.root = tmp_root;				

				//不能获取root信息
				$.extend(true, setting.checkType, tmp_checkType);
				$.extend(setting.callback, tmp_callback);
				
				return setting;
			},
			
			updateSetting : function(zTreeSetting) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !zTreeSetting) return;
				var setting = settings[treeObjId];
				
				var tmp_checkType = zTreeSetting.checkType;
				zTreeSetting.checkType = undefined;
				var tmp_callback = zTreeSetting.callback;
				zTreeSetting.callback = undefined;
				var tmp_root = zTreeSetting.root;
				zTreeSetting.root = undefined;
				
				$.extend(setting, zTreeSetting);
				
				zTreeSetting.checkType = tmp_checkType;				
				zTreeSetting.callback = tmp_callback;				
				zTreeSetting.root = tmp_root;				
				
				//不提供root信息update
				$.extend(true, setting.checkType, tmp_checkType);
				$.extend(setting.callback, tmp_callback);
				setting.treeObjId = treeObjId;
				
			},

			expandAll : function(expandSign) {
				var treeObjId = this.container.attr("id");
				expandCollapseSonNode(settings[treeObjId], null, expandSign, true);
			},

			expandNode : function(treeNode, expandSign, sonSign) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;

				if (expandSign) {
					//如果展开某节点，则必须展开其全部父节点
					expandCollapseParentNode(settings[treeObjId], treeNode, expandSign, false);
				}

				if (sonSign) {
					//多个图层同时进行动画，导致产生的延迟很难用代码准确捕获动画最终结束时间
					//因此为了保证准确将节点focus进行定位，则对于js操作节点时，不进行动画
					expandCollapseSonNode(settings[treeObjId], treeNode, expandSign, false, function() {
						$("#" + treeNode.tId + IDMark_Icon).focus().blur();
					});
				} else if (treeNode.open != expandSign) {
					switchNode(settings[treeObjId], treeNode);
					$("#" + treeNode.tId + IDMark_Icon).focus().blur();
				}
			},

			selectNode : function(treeNode) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;

				selectNode(settings[treeObjId], treeNode);
				//如果选择某节点，则必须展开其全部父节点
				//多个图层同时进行动画，导致产生的延迟很难用代码准确捕获动画最终结束时间
				//因此为了保证准确将节点focus进行定位，则对于js操作节点时，不进行动画				
				expandCollapseParentNode(settings[treeObjId], treeNode, true, false, function() {
					$("#" + treeNode.tId + IDMark_Icon).focus().blur();
				});
			},
			
			cancleSelectedNode : function() {
				var treeObjId = this.container.attr("id");
				if (!treeObjId) return;
				
				canclePreSelectedNode(settings[treeObjId]);
			},

			addNodes : function(parentNode, newNodes, isSilent) {	
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !newNodes) return;
				if (!parentNode) parentNode = null;
				addTreeNodes(settings[treeObjId], parentNode, newNodes, (isSilent==true));

			},
			
			// add by mediav begin
			addParentNodes : function(curNode) {	
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !curNode) return;
				
				addParentTreeNodes(settings[treeObjId], curNode);

			},
			// add by mediav end
			
			updateNode : function(treeNode) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;
				
				//$("#" + treeNode.tId + IDMark_Span).text(treeNode[settings[treeObjId].nameCol]); licai
			},

			moveNode : function(targetNode, treeNode) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;
				
				if (targetNode && (treeNode.parentNode == targetNode || $("#" + treeNode.tId).find("#" + targetNode.tId).length > 0)) {
					return;
				} else if (!targetNode) {
					targetNode = null;
				}
				moveTreeNode(settings[treeObjId], targetNode, treeNode, false);
			},

			removeNode : function(treeNode) {
				var treeObjId = this.container.attr("id");
				if (!treeObjId || !treeNode) return;
				removeTreeNode(settings[treeObjId], treeNode);
			}

		};
	};
})(jQuery);