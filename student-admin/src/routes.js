import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Job.vue'
// import Form from './views/nav1/Form.vue'
import User from './views/nav1/User.vue'
import Page4 from './views/nav2/JobInfo.vue'
import Page5 from './views/nav2/EducationInfo.vue'
import Page6 from './views/nav3/Notice.vue'
import echarts from './views/charts/echarts.vue'
import Job from "./views/nav1/Job";
import Student from "./views/nav1/Student";
import JobInfo from './views/nav2/JobInfo'
import EducationInfo from './views/nav2/EducationInfo'
import Notice from './views/nav3/Notice'
import NoticeList from "./views/nav3/NoticeList";
import Intern from "./views/nav3/Intern";
import ResumeList from "./views/Resume/ResumeList";
import BusinessInfo from "./views/business/BusinessInfo";
import BusinessJob from "./views/business/BusinessJob";
import BusinessResumeList from "./views/business/BusinessResumeList";
import ColleageList from "./views/collage/ColleageList";
import SubjectList from "./views/Subject/SubjectList";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-book',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '个人信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-wrench',
        leaf: true,//只有一个节点
        children: [
            { path: '/jobs', component: Job, name: '就业信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user-circle',
        leaf: true,//只有一个节点
        children: [
            { path: '/user', component: User, name: '用户管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/student', component: Student, name: '学生管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-sticky-note',
        leaf: true,//只有一个节点
        children: [
            { path: '/notice', component: Notice, name: '发布公告' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '登记信息',
        iconCls: 'fa fa-pencil-square',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '个人信息'},
            // { path: '/table', component: Table, name: 'Table' },
            { path: '/jobInfo', component: JobInfo, name: '就业登记' },
            { path: '/educationInfo', component: EducationInfo, name: '升学登记' },
            // { path: '/user', component: User, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/noticelist', component: NoticeList, name: '公告列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-check-square',
        leaf: true,//只有一个节点
        children: [
            { path: '/intern', component: Intern, name: '实习报告' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/resumelist', component: ResumeList, name: '我的简历' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/businessInfo', component: BusinessInfo, name: '企业信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/businessJob', component: BusinessJob, name: '企业岗位' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/businessResumeList', component: BusinessResumeList, name: '查看简历' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/colleageList', component: ColleageList, name: '学院管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-ul',
        leaf: true,//只有一个节点
        children: [
            { path: '/subjectList', component: SubjectList, name: '专业管理' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/echarts', component: echarts, name: '统计分析' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;