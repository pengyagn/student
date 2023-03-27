const routes = [

    {path: '/login',component: () => import('@/views/Login.vue'),name: '',hidden: true},
    {path: '/404',component: () => import('@/views/404.vue'),name: '',hidden: true},
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-address-book',leaf: true,
        children: [
            { path: '/main', component: () => import('@/views/Main.vue'), name: '个人信息' }
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-wrench',leaf: true,
        children: [
            { path: '/jobs', component: ()=>import('@/views/nav1/Job.vue'), name: '招聘信息' }
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-user-circle',leaf: true,
        children: [
            { path: '/user', component: () => import('@/views/nav1/User.vue'), name: '用户管理' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-address-card',leaf: true,
        children: [
            { path: '/student', component: () => import('@/views//nav1/Student.vue') , name: '学生管理' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-sticky-note',leaf: true,
        children: [
            { path: '/notice', component: () => import('@/views/nav3/Notice.vue'), name: '发布公告' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'), name: '登记信息',iconCls: 'fa fa-pencil-square',
 
        children: [
            { path: '/jobInfo', component: () => import('@/views/nav2/JobInfo.vue'), name: '就业登记' },
            { path: '/educationInfo', component: () => import('@/views/nav2/EducationInfo.vue'), name: '升学登记' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/noticelist', component: () => import('@/views/nav3/NoticeList.vue'), name: '公告列表' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-check-square',leaf: true,
        children: [
            { path: '/intern', component: () => import('@/views/nav3/Intern.vue'), name: '实习报告' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/resumelist', component: () => import('@/views/Resume/ResumeList.vue'), name: '我的简历' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/businessInfo', component: () => import('@/views/business/BusinessInfo.vue'), name: '企业信息' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/businessJob', component: () => import('@/views/business/BusinessJob.vue'), name: '企业岗位' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/businessResumeList', component: () => import('@/views/business/BusinessResumeList.vue'), name: '查看简历' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,
        children: [
            { path: '/colleageList', component: () => import('@/views/collage/ColleageList.vue'), name: '学院管理' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-list-ul',leaf: true,//只有一个节点
        children: [
            { path: '/subjectList', component: () => import('@/views/Subject/SubjectList.vue'), name: '专业管理' },
        ]
    },
    {path: '/',component: ()=>import('@/views//Home.vue'),name: '',iconCls: 'fa fa-bar-chart',leaf: true,//只有一个节点
        children: [
            { path: '/echarts', component: () => import('@/views/charts/echarts.vue'), name: '统计分析' }
        ]
    },
    {path: '*',hidden: true,redirect: { path: '/404' }}
];

export default routes;