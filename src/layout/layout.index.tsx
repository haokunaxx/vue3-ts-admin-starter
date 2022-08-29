import AppLayout from './layout.app'
import { ElDrawer } from 'element-plus'
import DrawerThemeConfiger from './PageConfig/config.theme.vue'
import DrawerLayoutConfiger from './PageConfig/config.layout.vue'

import { UseLayoutStore } from '@/store/layout/layout.index'
import { storeToRefs } from 'pinia'
const Layout = () => {
  const layoutStore = UseLayoutStore()
  const AppContainer = AppLayout[layoutStore.layoutMode]
  const showDrawer = () => {
    layoutStore.toggleDrawerDisplay(true)
  }
  const { drawer } = storeToRefs(layoutStore)
  return (
    <>
      <AppContainer showDrawer={showDrawer}></AppContainer>
      <ElDrawer
        modelValue={drawer.value}
        onUpdate:modelValue={value => layoutStore.toggleDrawerDisplay(value)}
        title="系统页面配置">
        <DrawerThemeConfiger />
        <DrawerLayoutConfiger />
      </ElDrawer>
    </>
  )
}


export default Layout