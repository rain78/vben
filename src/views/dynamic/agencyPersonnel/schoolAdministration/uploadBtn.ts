import {
  defineComponent,
  h,
} from 'vue';
import {
  Input,
  Button
} from 'ant-design-vue';
import {CustomUpload } from '/@/components/Upload';
import { uploadApi } from '/@/api/sys/upload';



export default defineComponent({
  name: '',
  components: { Input,CustomUpload },
  setup(props) {
    const {model, field,}=props
    

    return () =>
      h(
        'div',
        {
          style:{width:'100%'}
        },
        [
          
          h(CustomUpload,{
            api:uploadApi
          }),
        ]
       
      );
  },
});
