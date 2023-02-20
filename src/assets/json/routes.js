export const adminRoutes=[
	{
		"id": "1000",
		"parentId": "-1",
		"children": [
			{
				"id": "1200",
				"parentId": "1000",
				"children": "",
				"icon": "mdi-menu",
				"name": "菜单管理",
				"spread": false,
				"path": "menu",
				"component": "dynamic/upms/menu/index",
				"permission": "",
				"redirect": "",
				"keepAlive": false,
				"type": "0",
				"label": "菜单管理",
				"sort": "2",
				"meta": "{\"name\":\"菜单管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
			},
			{
				"id": "1300",
				"parentId": "1000",
				"children": [],
				"icon": "mdi-shield-account",
				"name": "角色管理",
				"spread": false,
				"path": "role",
				"component": "dynamic/upms/role/index",
				"permission": "",
				"redirect": "",
				"keepAlive": false,
				"type": "0",
				"label": "角色管理",
				"sort": "3",
				"meta": "{\"name\":\"角色管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
			}
		],
		"icon": "mdi-shield-home",
		"name": "权限管理",
		"spread": false,
		"path": "/upms",
		"component": "Layout",
		"permission": "",
		"redirect": "/upms/menu",
		"keepAlive": false,
		"type": "0",
		"label": "权限管理",
		"sort": "0",
		"meta": "{\"name\":\"权限管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":false}"
	},
	{
		"id": "1541969974326849537",
		"parentId": "-1",
		"children": [
			{
				"id": "1541970565367197698",
				"parentId": "1541969974326849537",
				"children": "",
				"icon": "mdi-shield-account",
				"name": "学校管理",
				"spread": false,
				"path": "schoolAdministration",
				"component": "dynamic/agencyPersonnel/schoolAdministration/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "学校管理",
				"sort": "1",
				"meta": "{\"name\":\"学校管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1544157420690993153",
				"parentId": "1541969974326849537",
				"children": "",
				"icon": "mdi-google-classroom",
				"name": "班级管理",
				"spread": false,
				"path": "classManagement",
				"component": "dynamic/agencyPersonnel/classManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "班级管理",
				"sort": "1",
				"meta": "{\"name\":\"班级管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1542815617723265026",
				"parentId": "1541969974326849537",
				"children": "",
				"icon": "mdi-account-school",
				"name": "学生管理",
				"spread": false,
				"path": "studentManagement",
				"component": "dynamic/agencyPersonnel/studentManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "学生管理",
				"sort": "1",
				"meta": "{\"name\":\"学生管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1544948768260218882",
				"parentId": "1541969974326849537",
				"children": "",
				"icon": "mdi-human-male-board",
				"name": "教师管理",
				"spread": false,
				"path": "teacherManagement",
				"component": "dynamic/agencyPersonnel/teacherManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "教师管理",
				"sort": "1",
				"meta": "{\"name\":\"教师管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-domain",
		"name": "机构人员",
		"spread": false,
		"path": "/agencyPersonnel",
		"component": "Layout",
		"permission": "",
		"redirect": "/agencyPersonnel/schoolAdministration",
		"keepAlive": true,
		"type": "0",
		"label": "机构人员",
		"sort": "1",
		"meta": "{\"name\":\"机构人员\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "1546738459573972993",
		"parentId": "-1",
		"children": [
			{
				"id": "1546760527073996801",
				"parentId": "1546738459573972993",
				"children": "",
				"icon": "mdi-table-search",
				"name": "登录日志",
				"spread": false,
				"path": "loginLog",
				"component": "dynamic/systemLog/loginLog/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "登录日志",
				"sort": "1",
				"meta": "{\"name\":\"登录日志\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1546738757000458242",
				"parentId": "1546738459573972993",
				"children": "",
				"icon": "mdi-table-search",
				"name": "操作日志",
				"spread": false,
				"path": "operationLog",
				"component": "dynamic/systemLog/operationLog/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "操作日志",
				"sort": "1",
				"meta": "{\"name\":\"操作日志\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-database-search",
		"name": "系统日志",
		"spread": false,
		"path": "/systemLog",
		"component": "Layout",
		"permission": "",
		"redirect": "/systemLog/loginLog",
		"keepAlive": true,
		"type": "0",
		"label": "系统日志",
		"sort": "1",
		"meta": "{\"name\":\"系统日志\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "1539087479277219842",
		"parentId": "-1",
		"children": [
			{
				"id": "1541246234647457794",
				"parentId": "1539087479277219842",
				"children": [
					{
            "id": "1550019153284427778",
            "parentId": "1549959740515282945",
            "children": [],
            "icon": "",
            "name": "劳动课程预览",
            "spread": false,
            "path": "detail/:id?",
            "component": "dynamic/basciData/laborCourses/detail",
            "permission": "",
            "redirect": "",
            "keepAlive": true,
            "type": "1",
            "label": "劳动课程预览",
            "sort": "1",
            "meta": "{\"name\":\"劳动课程预览\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
          },
				],
				"icon": "mdi-book-open",
				"name": "劳动课程管理",
				"spread": false,
				"path": "laborCourses",
				"component": "dynamic/basciData/laborCourses/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "劳动课程管理",
				"sort": "1",
				"meta": "{\"name\":\"劳动课程管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
			},
			{
				"id": "1539802848967127041",
				"parentId": "1539087479277219842",
				"children": [],
				"icon": "mdi-scale-balance",
				"name": "评价标准管理",
				"spread": false,
				"path": "evaluationCriterion",
				"component": "dynamic/basciData/evaluationCriterion/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "评价标准管理",
				"sort": "1",
				"meta": "{\"name\":\"评价标准管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1539802680410632193",
				"parentId": "1539087479277219842",
				"children": [],
				"icon": "mdi-security",
				"name": "安全指南管理",
				"spread": false,
				"path": "safetyGuide",
				"component": "dynamic/basciData/safetyGuide/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "安全指南管理",
				"sort": "1",
				"meta": "{\"name\":\"安全指南管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			},
			{
				"id": "1539087726644686849",
				"parentId": "1539087479277219842",
				"children": "",
				"icon": "mdi-hammer-screwdriver",
				"name": "工具物料管理",
				"spread": false,
				"path": "toolMaterial",
				"component": "dynamic/basciData/toolMaterial/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "工具物料管理",
				"sort": "1",
				"meta": "{\"name\":\"工具物料管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-database",
		"name": "基础数据",
		"spread": false,
		"path": "/basciData",
		"component": "Layout",
		"permission": "",
		"redirect": "/basciData/laborCourses",
		"keepAlive": true,
		"type": "0",
		"label": "基础数据",
		"sort": "1",
		"meta": "{\"name\":\"基础数据\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "1542328532276998145",
		"parentId": "-1",
		"children": [
			{
				"id": "1542358277156892674",
				"parentId": "1542328532276998145",
				"children": "",
				"icon": "mdi-account-multiple",
				"name": "用户管理",
				"spread": false,
				"path": "userManagement",
				"component": "dynamic/userRights/userManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "用户管理",
				"sort": "1",
				"meta": "{\"name\":\"用户管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-shield-account",
		"name": "用户权限",
		"spread": false,
		"path": "/userRights",
		"component": "Layout",
		"permission": "",
		"redirect": "/userRights/userManagement",
		"keepAlive": true,
		"type": "0",
		"label": "用户权限",
		"sort": "1",
		"meta": "{\"name\":\"用户权限\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "1549959234401202178",
		"parentId": "-1",
		"children": [
			{
				"id": "1549959740515282945",
				"parentId": "1549959234401202178",
				"children": [
          {
            "id": "1550019153284427778",
            "parentId": "1549959740515282945",
            "children": [],
            "icon": "",
            "name": "素材管理详情",
            "spread": false,
            "path": "detail/:id?",
            "component": "dynamic/sourceMaterial/sourceManagement/detail",
            "permission": "",
            "redirect": "",
            "keepAlive": true,
            "type": "1",
            "label": "素材管理详情",
            "sort": "1",
            "meta": "{\"name\":\"素材管理详情\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
          },
          
        ],
				"icon": "mdi-image",
				"name": "素材管理",
				"spread": false,
				"path": "sourceManagement",
				"component": "dynamic/sourceMaterial/sourceManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "素材管理",
				"sort": "1",
				"meta": "{\"name\":\"素材管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
			},
			{
				"id": "1551413237156929537",
				"parentId": "1549959234401202178",
				"children": [
          {
            "id": "1550019153284427778",
            "parentId": "1549959740515282945",
            "children": [],
            "icon": "",
            "name": "专辑新增",
            "spread": false,
            "path": "add",
            "component": "dynamic/sourceMaterial/album/edit",
            "permission": "",
            "redirect": "",
            "keepAlive": true,
            "type": "1",
            "label": "专辑新增",
            "sort": "1",
            "meta": "{\"name\":\"专辑新增\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
          },
					{
            "id": "1550019153284427779",
            "parentId": "1549959740515282945",
            "children": [],
            "icon": "",
            "name": "素材详情",
            "spread": false,
            "path": "detail/:id?",
            "component": "dynamic/sourceMaterial/album/edit",
            "permission": "",
            "redirect": "",
            "keepAlive": true,
            "type": "1",
            "label": "素材详情",
            "sort": "1",
            "meta": "{\"name\":\"素材详情\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
          },
          
        ],
				"icon": "mdi-folder-image",
				"name": "专辑管理",
				"spread": false,
				"path": "album",
				"component": "dynamic/sourceMaterial/album/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "专辑管理",
				"sort": "1",
				"meta": "{\"name\":\"专辑管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
			},
			{
				"id": "1551775866425696257",
				"parentId": "1549959234401202178",
				"children": [],
				"icon": "mdi-trash-can",
				"name": "回收站管理",
				"spread": false,
				"path": "recycle",
				"component": "dynamic/sourceMaterial/recycle/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "回收站管理",
				"sort": "1",
				"meta": "{\"name\":\"回收站管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-image-multiple",
		"name": "素材管理",
		"spread": false,
		"path": "/sourceMaterial",
		"component": "Layout",
		"permission": "",
		"redirect": "/sourceMaterial/sourceManagement",
		"keepAlive": true,
		"type": "0",
		"label": "素材管理",
		"sort": "1",
		"meta": "{\"name\":\"素材管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "2000",
		"parentId": "-1",
		"children": [
			{
				"id": "2200",
				"parentId": "2000",
				"children": "",
				"icon": "mdi-book-open-blank-variant",
				"name": "字典管理",
				"spread": false,
				"path": "dictionaryManagement",
				"component": "dynamic/systemManagement/dictionaryManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": false,
				"type": "0",
				"label": "字典管理",
				"sort": "6",
				"meta": "{\"name\":\"字典管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-cog ",
		"name": "系统管理",
		"spread": false,
		"path": "/systemManagement",
		"component": "Layout",
		"permission": "",
		"redirect": "/systemManagement/dictionaryManagement",
		"keepAlive": false,
		"type": "0",
		"label": "系统管理",
		"sort": "1",
		"meta": "{\"name\":\"系统管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	}
]


export const teacherData=[
	{
			"id": "1563100312704774146",
			"parentId": "-1",
			"children": [
					{
							"id": "1563101534891405314",
							"parentId": "1563100312704774146",
							"children": [
								{
									"id": "1563100312704774147",
									"parentId": "1563101534891405314",
									"children": [],
									"icon": "",
									"name": "我的班级详情",
									"spread": false,
									"path": "detail/:id?",
									"component": "dynamic/IndustrialLabor/myClass/detail",
									"permission": "",
									"redirect": "",
									"keepAlive": true,
									"type": "1",
									"label": "我的班级详情",
									"sort": "1",
									"meta": "{\"name\":\"我的班级详情\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
								},
								
							],
							"icon": "mdi-google-classroom",
							"name": "我的班级",
							"spread": false,
							"path": "myClass",
							"component": "dynamic/IndustrialLabor/myClass/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "我的班级",
							"sort": "1",
							"meta": "{\"name\":\"我的班级\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
					}
			],
			"icon": "mdi-hammer-wrench",
			"name": "产业劳动",
			"spread": false,
			"path": "/IndustrialLabor",
			"component": "Layout",
			"permission": "",
			// "redirect": "",
	"redirect": "/IndustrialLabor/myClass",
			"keepAlive": true,
			"type": "0",
			"label": "产业劳动",
			"sort": "1",
			"meta": "{\"name\":\"产业劳动\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
			"id": "1541969974326849537",
			"parentId": "-1",
			"children": [
					{
							"id": "1542815617723265026",
							"parentId": "1541969974326849537",
							"children": [],
			"icon": "mdi-account-school",
							"name": "学生管理",
							"spread": false,
							"path": "studentManagement",
							"component": "dynamic/agencyPersonnel/studentManagement/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "学生管理",
							"sort": "1",
							"meta": "{\"name\":\"学生管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					},
					{
							"id": "1544157420690993153",
							"parentId": "1541969974326849537",
							"children": [],
							"icon": "mdi-google-classroom",
							"name": "班级管理",
							"spread": false,
							"path": "classManagement",
							"component": "dynamic/agencyPersonnel/classManagement/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "班级管理",
							"sort": "1",
							"meta": "{\"name\":\"班级管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					}
			],
			"icon": "mdi-domain",
			"name": "机构人员",
			"spread": false,
			"path": "/agencyPersonnel",
			"component": "Layout",
			"permission": "",
			"redirect": "/agencyPersonnel/studentManagement",
			"keepAlive": true,
			"type": "0",
			"label": "机构人员",
			"sort": "1",
			"meta": "{\"name\":\"机构人员\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
			"id": "1539087479277219842",
			"parentId": "-1",
			"children": [
					{
							"id": "1539802680410632193",
							"parentId": "1539087479277219842",
							"children": [],
							"icon": "mdi-security",
							"name": "安全指南管理",
							"spread": false,
							"path": "safetyGuide",
							"component": "dynamic/basciData/safetyGuide/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "安全指南管理",
							"sort": "1",
							"meta": "{\"name\":\"安全指南管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					},
					{
							"id": "1541246234647457794",
							"parentId": "1539087479277219842",
							"children": [],
							"icon": "mdi-book-open",
							"name": "劳动课程管理",
							"spread": false,
							"path": "laborCourses",
							"component": "dynamic/basciData/laborCourses/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "劳动课程管理",
							"sort": "1",
							"meta": "{\"name\":\"劳动课程管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					},
					{
							"id": "1539802848967127041",
							"parentId": "1539087479277219842",
							"children": [],
							"icon": "mdi-scale-balance",
							"name": "评价标准管理",
							"spread": false,
							"path": "evaluationCriterion",
							"component": "dynamic/views/basciData/evaluationCriterion/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "评价标准管理",
							"sort": "1",
							"meta": "{\"name\":\"评价标准管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					},
					{
							"id": "1539087726644686849",
							"parentId": "1539087479277219842",
							"children": [],
							"icon": "mdi-hammer-screwdriver",
							"name": "工具物料管理",
							"spread": false,
							"path": "toolMaterial",
							"component": "dynamic/basciData/toolMaterial/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "工具物料管理",
							"sort": "1",
							"meta": "{\"name\":\"工具物料管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
					}
			],
			"icon": "mdi-database",
			"name": "基础数据",
			"spread": false,
			"path": "/basciData",
			"component": "Layout",
			"permission": "",
			"redirect": "/basciData/safetyGuide",
			"keepAlive": true,
			"type": "0",
			"label": "基础数据",
			"sort": "1",
			"meta": "{\"name\":\"基础数据\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	{
		"id": "1549959234401202178",
		"parentId": "-1",
		"children": [
			{
				"id": "1549959740515282945",
				"parentId": "1549959234401202178",
				"children": [
				{
					"id": "1550019153284427778",
					"parentId": "1549959740515282945",
					"children": [],
					"icon": "",
					"name": "素材管理详情",
					"spread": false,
					"path": "detail/:id?",
					"component": "dynamic/sourceMaterial/sourceManagement/detail",
					"permission": "",
					"redirect": "",
					"keepAlive": true,
					"type": "1",
					"label": "素材管理详情",
					"sort": "1",
					"meta": "{\"name\":\"素材管理详情\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
				},
				
			],
				"icon": "mdi-image",
				"name": "素材管理",
				"spread": false,
				"path": "sourceManagement",
				"component": "dynamic/sourceMaterial/sourceManagement/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "素材管理",
				"sort": "1",
				"meta": "{\"name\":\"素材管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
			},
			{
				"id": "1551413237156929537",
				"parentId": "1549959234401202178",
				"children": [
				{
					"id": "1550019153284427778",
					"parentId": "1549959740515282945",
					"children": [],
					"icon": "",
					"name": "专辑新增",
					"spread": false,
					"path": "add",
					"component": "dynamic/sourceMaterial/album/edit",
					"permission": "",
					"redirect": "",
					"keepAlive": true,
					"type": "1",
					"label": "专辑新增",
					"sort": "1",
					"meta": "{\"name\":\"专辑新增\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
				},
					{
					"id": "1550019153284427779",
					"parentId": "1549959740515282945",
					"children": [],
					"icon": "",
					"name": "素材详情",
					"spread": false,
					"path": "detail/:id?",
					"component": "dynamic/sourceMaterial/album/edit",
					"permission": "",
					"redirect": "",
					"keepAlive": true,
					"type": "1",
					"label": "素材详情",
					"sort": "1",
					"meta": "{\"name\":\"素材详情\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"hideMenu\":true}"
				},
				
			],
				"icon": "mdi-folder-image",
				"name": "专辑管理",
				"spread": false,
				"path": "album",
				"component": "dynamic/sourceMaterial/album/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "专辑管理",
				"sort": "1",
				"meta": "{\"name\":\"专辑管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
			},
			{
				"id": "1551775866425696257",
				"parentId": "1549959234401202178",
				"children": [],
				"icon": "mdi-trash-can",
				"name": "回收站管理",
				"spread": false,
				"path": "recycle",
				"component": "dynamic/sourceMaterial/recycle/index",
				"permission": "",
				"redirect": "",
				"keepAlive": true,
				"type": "0",
				"label": "回收站管理",
				"sort": "1",
				"meta": "{\"name\":\"回收站管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true}"
			}
		],
		"icon": "mdi-image-multiple",
		"name": "素材管理",
		"spread": false,
		"path": "/sourceMaterial",
		"component": "Layout",
		"permission": "",
		"redirect": "/sourceMaterial/sourceManagement",
		"keepAlive": true,
		"type": "0",
		"label": "素材管理",
		"sort": "1",
		"meta": "{\"name\":\"素材管理\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	
]


export const studentData=[
	{
			"id": "1563100312704774146",
			"parentId": "-1",
			"children": [
					{
							"id": "1563101534891405314",
							"parentId": "1563100312704774146",
							"children": [],
							"icon": "mdi-google-classroom",
							"name": "我的劳动",
							"spread": false,
							"path": "myCourse",
							"component": "dynamic/IndustrialLabor/myCourse/index",
							"permission": "",
							"redirect": "",
							"keepAlive": true,
							"type": "0",
							"label": "我的劳动",
							"sort": "1",
							"meta": "{\"name\":\"我的劳动\",\"isDynamicRoute\":false,\"dynamicRouteData\":[],\"redirect\":true,\"hideChildrenInMenu\":true}"
					}
			],
			"icon": "mdi-hammer-wrench",
			"name": "产业劳动",
			"spread": false,
			"path": "/IndustrialLabors",
			"component": "Layout",
			"permission": "",
			// "redirect": "",
			"redirect": "/IndustrialLabors/myCourse",
			"keepAlive": true,
			"type": "0",
			"label": "产业劳动",
			"sort": "1",
			"meta": "{\"name\":\"产业劳动\",\"isDynamicRoute\":false,\"dynamicRouteData\":[]}"
	},
	
	
]
