
import { apiHttp } from '/@/utils/http/axios';

enum Api {
  laborCourseList='/laborCourse/page',
  laborCourseEdit='/laborCourse',

}





export const getLaborCourseList = (params) => apiHttp.get({ url: Api.laborCourseList, params });

export const deleteLaborCourseData = (params='') => apiHttp.delete({ url: Api.laborCourseEdit+(params?`/${params.ids}`:'')})

