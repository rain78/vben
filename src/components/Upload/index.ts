import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import customUpload from './src/customUpload.vue';

export const BasicUpload = withInstall(basicUpload);
export const CustomUpload = withInstall(customUpload);
