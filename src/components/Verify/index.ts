import { withInstall } from '/@/utils/index';
import basicDragVerify from './src/DragVerify.vue';
import rotateDragVerify from './src/ImgRotate.vue';
import verifition from './src/verifition/Verify.vue';
//verifition
export const BasicDragVerify = withInstall(basicDragVerify);
export const RotateDragVerify = withInstall(rotateDragVerify);
export const Verifition = withInstall(verifition);
export * from './src/typing';
