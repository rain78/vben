
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  schoolList='/school/page',
  schoolEdit='/school',
  schoolSelect='/school/select',

  classList='/clazz/page',
  classEdit='/clazz',
  classSelect='/clazz/select',

  studentList='/student/page',
  studentEdit='/student',

  teacherList='/teacher/page',
  teacherEdit='/teacher',
  teacherDetail='/teacher',


}





export const getsSchoolList = (params) => apiHttp.get({ url: Api.schoolList, params });
export const schoolSelect = () => apiHttp.get({ url: Api.schoolSelect});
export const upSchooldate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.schoolEdit, params })
  else return apiHttp.put({ url: Api.schoolEdit, params })
}
export const deleteSchoolData = (params='') => apiHttp.delete({ url: Api.schoolEdit+params })

export const getsClassList = (params) => apiHttp.get({ url: Api.classList, params });
export const classSelect = (params) => apiHttp.get({ url: Api.classSelect,params});
export const classStu = (params) => apiHttp.get({ url: `${Api.classEdit}/${params.clazzId}`,});

export const upClassdate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.classEdit, params })
  else return apiHttp.put({ url: Api.classEdit, params })
}
export const deleteClassData = (params='') => apiHttp.delete({ url: Api.classEdit+params })

export const getsStudentList = (params) => apiHttp.get({ url: Api.studentList, params });
export const upStudentdate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.studentEdit, params })
  else return apiHttp.put({ url: Api.studentEdit, params })
}
export const deleteStudentData = (params='') => apiHttp.delete({ url: Api.studentEdit+params })

export const getTeacherList = (params) => apiHttp.get({ url: Api.teacherList, params });
export const getTeacherDetail = (params) => apiHttp.get({ url: Api.teacherDetail+(params.id?`/${params.id}`:'')});
export const upTeacherdate = (params,type='post') =>{
  if(type==='post') return apiHttp.post({ url: Api.teacherEdit, params })
  else return apiHttp.put({ url: Api.teacherEdit, params })
}
export const deleteTeacherData = (params='') => apiHttp.delete({ url: Api.teacherEdit+params })

