import NProgress from 'nprogress'
import "nprogress/nprogress.css";

const progress = {
    start: () => NProgress.start(),
    done: () => NProgress.done(),
    error: () => NProgress.done(),
}

export default progress