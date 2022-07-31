const useReducer = (reducer, initialState) => {
    const [state, setState] = useState(initialState)
    let dispatch = (action) => {
        setState(reducer(state, action))
    }
    return [state, dispatch]
}

const useDidMount = (fn) => {
    useEffect(() => {
        fn()
    }, [])
}

const useUnmount = (fn) => {
    useEffect(() => {
        return () => {
            fn()
        }
    }, [])
}

// 保存上一次渲染时的 state 的值
const usePrevious = (state) => {
    const preRef = useRef();
    const curRef = useRef();

    preRef.current = curRef.current
    curRef.current = state

    return preRef.current
}
