import { defineConfig } from 'vite'
import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite' //按需引入
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
// export default defineConfig({
export default ({ command }: ConfigEnv): UserConfigExport => defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      localEnabled: command === 'serve',
      mockPath: './src/mock'
    }),
    ElementPlus({}),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
         // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ]
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true,
    }),
    // Components({
    //   // allow auto load markdown components under `./src/components/`
    //   extensions: ['vue', 'md'],
    //   // allow auto import and register components used in markdown
    //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'sass',
    //     }),
    //   ],
    //   dts: 'src/components.d.ts',
    // }),
  ],
  resolve: {
    alias: {
      '@': "/src"
    }
  }
})
