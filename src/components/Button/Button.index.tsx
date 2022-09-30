import { defineComponent, PropType } from 'vue'
import { ElButton } from 'element-plus'
import { useModel } from '@/uses/useModel'
interface Props {
  modelValue: string
}
export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<Props['modelValue']>
    }
  },
  emits: ['update:modelValue'],
  components: {
    ElButton
  },
  setup(props, { emit }) {
    const name = ref<string>('')
    const handleInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      // name.value = value
      emit('update:modelValue', value)
    }
    const model = useModel(
      () => props.modelValue,
      (value) => emit('update:modelValue', value)
    )
    return () => (
      <>
        <input value={props.modelValue} onInput={handleInput} />
        <input v-model={model.value} />
        <el-button>btn</el-button>
        {props.modelValue}
        {name.value}
      </>
    )
  }
})
