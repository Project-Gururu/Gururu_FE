import {Dispatch, SetStateAction, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { regMenu } from 'redux/modules/reg';
import { RootState } from 'redux/store';
import style from '../styles/components/Register.module.scss'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepTwo: React.FC<CounterProps> =
({numState: [count, setCount]}) => {
    const dispatch = useDispatch();
    let [num, setNum] = useState(0)
    let [menu, setMenu] = useState({
        storeRegisterId: "",
        size: "",
        beautyName: "",
        beautyDesc: "",
        amount: ""
    })

    const products = useSelector((state: RootState) => state.reg.menu)
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value});
    }

    const goNext = () => {
        setCount(count + 1);
    }
    const Save = () => {
        dispatch(regMenu(menu))
        setNum(0)
    }

    console.log(menu)

    return (
        <>
        <div className={style.Grid}>
            <div className={style.Grid}>
                <div className={style.Table}>
                    <div className={style.Menu}>
                        <div>미용</div>
                    {num === 0 ?
                    <button style={{marginLeft: "auto"}} onClick={() => setNum(1)}>추가하기</button>
                    :
                        <div className={style.Category}>
                            <input
                                type="text"
                                name="size"
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="beautyName"
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="beautyDesc"
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="amount"
                                onChange={onChangeHandler}
                            />
                            <button onClick={Save}>저장하기</button>
                        </div>
                        }
                    </div>
                </div>
                <div className={style.Table}>
                    <div>카테고리</div>
                    {products ?
                    products.map((list, idx) => {
                        return(
                            <div className={style.Category} key={idx}>
                                {list.size}
                            </div>
                        )
                    })
                        :
                        <>아직 아무런 미용이 등록되있지 않습니다</>
                    }
                </div>
            </div>
            <div className={style.Button} onClick={goNext}> 다음으로</div>
        </div>
        </>
    )
}

export default StepTwo;

