import router from './router'
import { setTitle } from './utils/utils'

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    // console.info(to.meta.title)
    setTitle(to.meta.title)
  }
})
