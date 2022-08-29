import { defineComponent } from 'vue'
import Header from './header.vue'
import SidebarMenu from './SidebarMenu/index.vue'
import { ElContainer, ElHeader, ElAside, ElMain, ElFooter, ElIcon, ElRow, ElCol } from 'element-plus'
import { Tools } from '@element-plus/icons-vue'
import { LayoutEnum } from '@/store/layout/layout.index'

const FullPageLayout = () => {
  return (
    <ElContainer>
      <ElHeader>
        <Header />
        {/* <SidebarMenu mode='horizontal' /> */}
      </ElHeader>
      <ElContainer>
        <ElAside width="200px">
          <SidebarMenu />
        </ElAside>
        <ElContainer>
          <ElMain class="el-main-wrapper">
            <div class="el-main-wrapper-content">
              <router-view />
            </div>
            {/* <div class="setting-trigger">
              <i-ep-tools />
            </div> */}
          </ElMain>
          <ElFooter></ElFooter>
        </ElContainer>
      </ElContainer>
    </ElContainer>
  )
}
type Props = {
  showDrawer: () => void
}
const NoSidebarLayout = (props: Props, ctx: any) => {
  console.log(props, ctx)
  const handleClick = () => {
    console.log(props)
    props.showDrawer()
  }
  return (
    <ElContainer>
      <ElHeader>
        <SidebarMenu mode='horizontal' />
      </ElHeader>
      <ElContainer>
        {/* <ElAside width="200px">
            <SidebarMenu />
          </ElAside> */}
        <ElContainer>
          <ElMain class="el-main-wrapper">
            <ElRow gutter={24}>
              <ElCol span={23}>
                <div class="el-main-wrapper-content">
                  <router-view />
                </div>
              </ElCol>
              <ElCol span={1}>
                <div class="setting-trigger" onClick={handleClick}>
                  {/* <i-ep-tools /> */}
                  <ElIcon>
                    <Tools />
                  </ElIcon>
                </div>
              </ElCol>
            </ElRow>
          </ElMain>
          <ElFooter></ElFooter>
        </ElContainer>
      </ElContainer>
    </ElContainer >
  )
}


export default {
  [LayoutEnum.FullPageLayout]: FullPageLayout,
  [LayoutEnum.NoSidebarLayout]: NoSidebarLayout
}

