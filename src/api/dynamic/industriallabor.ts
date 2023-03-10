
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  industriallaborList = '/industriallabor/clazz',
  industriallaborEdit = '/industriallabor',
  industriallaborClazzmember = '/industriallabor/clazzmember',

  notifyList = '/notify/page',
  notifyUserList = '/notifyUser/page',
  notifyEdit = '/notify',
  notifyUser='/notifyUser',
  // userEditSelect='/role/select',

  //获取劳动作业详情
  laborHomework = '/laborHomework',
  laborHomeworkStudents = '/laborHomework/students',
  laborHomeworkStudent = '/laborHomework/student',
  laborHomeworkAnswerStudent = '/laborHomework/answer/student',
  laborHomeworkAnswer = '/laborHomework/laborHomeworkAnswer',
  

}



export const industriallaborList = (params) => apiHttp.get({ url: Api.industriallaborList, params });
export const industriallaborClazzmember = (params) => apiHttp.get({ url: Api.industriallaborClazzmember + (params.clazzId ? `/${params.clazzId}` : '') });
export const industriallaborDetail = (params) => apiHttp.get({ url: Api.industriallaborEdit + (params.ids ? `/${params.ids}` : '') });
export const industriallaborDelete = (params = '') => apiHttp.delete({ url: Api.industriallaborEdit + (params ? `/${params.ids}` : '') })
export const industriallaborEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.industriallaborEdit, params })
  else return apiHttp.put({ url: Api.industriallaborEdit, params })
}

export const notifyList = (params) => apiHttp.get({ url: Api.notifyList, params });
export const notifyGet = (params) => apiHttp.get({ url: Api.notifyEdit+'/'+params.notifyId});
export const notifyUserList = (params) => apiHttp.get({ url: Api.notifyUserList, params });
export const notifyEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.notifyEdit, params })
  else return apiHttp.put({ url: Api.notifyEdit, params })
}
export const notifyUser = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.notifyUser, params })
  else return apiHttp.put({ url: Api.notifyUser, params })
}

export const laborHomeworkDetail = (params) => apiHttp.get({ url: Api.laborHomework, params });
export const laborHomeworkEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.laborHomework, params })
  else return apiHttp.put({ url: Api.laborHomework, params })
};
export const laborHomeworkStudents = (params) =>
  apiHttp.get({ url: Api.laborHomeworkStudents, params });
export const laborHomeworkStudentAnswer = (params = { studentId: '', data: {} }) => 
apiHttp.get({ url: `${Api.laborHomeworkStudent}/${params.studentId}/answer`, params:params.data });
export const laborHomeworkAnswerStudent = (params = { userId: '', data: {} }) => 
apiHttp.get({ url: `${Api.laborHomeworkAnswerStudent}/${params.userId}`, params:params.data });
export const laborHomeworkAnswer = (params) => apiHttp.put({ url: Api.laborHomeworkAnswer, params });



