import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import customUpload from './src/customUpload.vue';
import commonUpload from './src/commonUpload.vue';

export const BasicUpload = withInstall(basicUpload);
export const CustomUpload = withInstall(customUpload);
export const CommonUpload = withInstall(commonUpload);
