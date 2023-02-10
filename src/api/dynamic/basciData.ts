
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  laborCourseList='/laborCourse/page',
  laborCourseEdit='/laborCourse',
  laborCourseClazz='/laborCourse/clazz',
  laborCourseGrade='/laborCourse/grade',

  evaluationCriteriaList='/evaluationCriteria/page',
  evaluationCriteriaEdit='/evaluationCriteria',

  safetyGuideList='/safetyGuide/page',
  safetyGuideEdit='/safetyGuide',

  toolMaterialList='/toolMaterial/page',
  toolMaterialEdit='/toolMaterial',
}





export const getLaborCourseList = (params) => apiHttp.get({ url: Api.laborCourseList, params });
export const deleteLaborCourseData = (params='') => apiHttp.delete({ url: Api.laborCourseEdit+(params?`/${params.ids}`:'')})
export const laborCourseEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.laborCourseEdit, params })
  else return apiHttp.put({ url: Api.laborCourseEdit, params })
}
export const laborCourseDetail = (params) => apiHttp.get({ url: Api.laborCourseEdit+(params.id?`/${params.id}`:'')});
export const laborCourseClazz = (params) => apiHttp.get({ url: Api.laborCourseClazz+(params.clazzId?`/${params.clazzId}`:'')});
export const laborCourseGrade = (params) => apiHttp.get({ url: Api.laborCourseGrade+(params.grade?`/${params.grade}`:'')});

export const evaluationCriteriaList = (params) => apiHttp.get({ url: Api.evaluationCriteriaList, params });
export const evaluationCriteriaDelete = (params='') => apiHttp.delete({ url: Api.evaluationCriteriaEdit+(params?`/${params.ids}`:'')})
export const evaluationCriteriaEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.evaluationCriteriaEdit, params })
  else return apiHttp.put({ url: Api.evaluationCriteriaEdit, params })
}

export const safetyGuideList = (params) => apiHttp.get({ url: Api.safetyGuideList, params });
export const safetyGuideDelete = (params='') => apiHttp.delete({ url: Api.safetyGuideEdit+(params?`/${params.ids}`:'')})
export const safetyGuideEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.safetyGuideEdit, params })
  else return apiHttp.put({ url: Api.safetyGuideEdit, params })
}

export const toolMaterialList = (params) => apiHttp.get({ url: Api.toolMaterialList, params });
export const toolMaterialDelete = (params='') => apiHttp.delete({ url: Api.toolMaterialEdit+(params?`/${params.ids}`:'')})
export const toolMaterialEdit = (params, type = 'post') => {
  if (type === 'post') return apiHttp.post({ url: Api.toolMaterialEdit, params })
  else return apiHttp.put({ url: Api.toolMaterialEdit, params })
}
