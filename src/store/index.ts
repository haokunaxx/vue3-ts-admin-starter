// const moduleFiles = import.meta.globEager('./*/*.index.ts')

// function CaptialFirstLetter(str: string) {
//   return str[0].toUpperCase() + str.slice(1)
// }

// export default Object.keys(moduleFiles).reduce((prev, next) => {
//   let key = `Use${CaptialFirstLetter(next.split('/')[1])}Store`
//   prev[key] = moduleFiles[next]
//   return prev
// }, {} as typeof moduleFiles)

export { UsePermissionStore } from "./permission/permission.index";
export { UseUserStore } from "./user/user.index";
