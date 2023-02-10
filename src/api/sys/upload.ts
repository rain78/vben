import { UploadApiResult } from './model/uploadModel';
import { apiHttp ,api as uploadUrl} from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

// const { uploadUrl = '' } = useGlobSetting();
// const uploadUrl='http://ioteduendpoint.stepiot.com/file'

/**
 * @description: Upload interface
 */
export function uploadApi(
  params,
  // onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return apiHttp.uploadFile(
    {
      url: uploadUrl+'/file',
      // onUploadProgress,
    },
    params,
  );
}
