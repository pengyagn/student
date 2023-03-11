import axios from 'axios';

let base = '/api';
// let base = 'http://localhost:8000';


export const requestLogin = params => { return axios.post(`${base}/login/`, {params:params}) };
// export const requestLogin = params => { return axios.get(`http://127.0.0.1:8000/login2`, {params:params}) };

export const getUser = params => {return axios.get(`${base}/getUser/`,{params:params})}
export const editUser = params => { return axios.get(`${base}/editUser/`, { params: params }); };
export const getUserList = params => { return axios.get(`${base}/allUsers/`, { params: params }); };

export const addJob = params => { return axios.post(`${base}/addJob/`, { params: params }); };
export const removeJob = params => { return axios.get(`${base}/removeJob/`, { params: params }); };
export const editJob = params => { return axios.post(`${base}/editJob/`, { params: params }); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
export const editAuth = params => { return axios.get(`${base}/editAuth/`, { params: params }); };
export const addAuth = params => { return axios.post(`${base}/addAuth/`, { params: params }); };
export const removeAuth = params => { return axios.get(`${base}/removeAuth/`, { params: params }); };
export const getJobListPage = params => { return axios.get(`${base}/allJobs/`, { params: params }); };


export const getSutdentList = params => { return axios.get(`${base}/allStudents/`, { params: params }); };
export const editStudentInfo = params => { return axios.post(`${base}/editStudentInfo/`, { params: params }); };
export const removeStu = params => { return axios.get(`${base}/removeStu/`, { params: params }); };
export const removeJobInfo = params => { return axios.get(`${base}/removeJobInfo/`, { params: params }); };
export const removeEduInfo = params => { return axios.get(`${base}/removeEduInfo/`, { params: params }); };



export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };


export const addJobInfo = params => { return axios.post(`${base}/addJobInfo/`, { params: params }); };
export const addEduInfo = params => { return axios.post(`${base}/addEduInfo/`, { params: params }); };
export const getOnesJob = params => { return axios.get(`${base}/getOnesJob/`, { params: params }); };
export const getOnesEdu = params => { return axios.get(`${base}/getOnesEdu/`, { params: params }); };

export const editJobInfo = params => { return axios.get(`${base}/editJobInfo/`, { params: params }); };
export const editEduInfo = params => { return axios.get(`${base}/editEduInfo/`, { params: params }); };

export const addNotice = params => { return axios.post(`${base}/addNotice/`, { params: params }); };
export const editNotice = params => {return axios.get(`${base}/editNotice/`, { params: params });}
export const removeNotice = params => {return axios.get(`${base}/removeNotice/`, { params: params });}
export const getNoticeList = params => {return axios.get(`${base}/allNotices/`, { params: params });}

export const getStuNoticeState = params => {return axios.get(`${base}/getStuNoticeState/`, { params: params }); }
export const makeAllNoticeReaded = params => {return axios.get(`${base}/makeAllNoticeReaded/`, { params: params });}

export const getSutdentInfo = params => {return axios.get(`${base}/getSutdentInfo/`, { params: params });}

export const addResume = params => { return axios.post(`${base}/addResume/`, { params: params }); };
export const editResume = params => {return axios.get(`${base}/editResume/`, { params: params });}
export const removeResume = params => {return axios.get(`${base}/removeResume/`, { params: params });}
export const getResumeList = params => {return axios.get(`${base}/allResumes/`, { params: params });}
export const sendStudentResume = params => {return axios.get(`${base}/sendStudentResume/`, { params: params });}

export const addBusinessPerson = params => {return axios.post(`${base}/addBusinessPerson/`, { params: params });}

export const getBusinessInfo = params => {return axios.get(`${base}/getBusinessInfo/`, { params: params });}
export const editBusiness = params => {return axios.get(`${base}/editBusiness/`, { params: params });}
// export const getBusInfo = params => {return axios.get(`${base}/getBusInfo/`, { params: params });}

export const addCollege = params => { return axios.post(`${base}/addCollege/`, { params: params }); };
export const editCollege = params => {return axios.get(`${base}/editCollege/`, { params: params });}
export const removeCollege = params => {return axios.get(`${base}/removeCollege/`, { params: params });}
export const getCollegeList = params => {return axios.get(`${base}/allColleges/`, { params: params });}

export const addSubject = params => { return axios.post(`${base}/addSubject/`, { params: params }); };
export const editSubject = params => {return axios.get(`${base}/editSubject/`, { params: params });}
export const removeSubject = params => {return axios.get(`${base}/removeSubject/`, { params: params });}
export const getSubjectList = params => {return axios.get(`${base}/allSubjects/`, { params: params });}

export const getCharts = params => {return axios.get(`${base}/getCharts/`, { params: params });}

export const getAllMajorAndCollege = params => {return axios.get(`${base}/getAllMajorAndCollege/`, { params: params });}