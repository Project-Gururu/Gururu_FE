
import {Dispatch, SetStateAction, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editMenu, regMenu, setEdit } from 'redux/modules/reg';
import { RootState } from 'redux/store';
import style from '../../styles/components/Register.module.scss'
import Edit from '../../public/images/icon-edit.svg'
import Del from '../../public/images/icon-delete.svg'
interface CounterProps {
  numState: [number, Dispatch<SetStateAction<number>>]
}

const StepTwo: React.FC<CounterProps> =
({numState: [count, setCount]}) => {
    const dispatch = useDispatch();
    let [num, setNum] = useState(0)

    const initialState = {
        storeRegisterId: "",
        size: "",
        beautyName: "",
        beautyDesc: "",
        amount: "",
        edit: false
    }

    let [menu, setMenu] = useState({
        storeRegisterId: "",
        size: "",
        beautyName: "",
        beautyDesc: "",
        amount: "",
        edit: false
    })

    const products = useSelector((state: RootState) => state.reg.menu)
    const categories = [...new Set(products.map((e) => e.size))]
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value});
    }

    const goNext = () => {
        setCount(count + 1);
    }
    const Save = () => {
        dispatch(regMenu(menu))
        setMenu({...initialState})
        setNum(0)
    }

    const edit = (idx: number) => {
        dispatch(setEdit(idx))
    }

    const saveEdit = (idx: number) => {
        dispatch(editMenu(menu))
    }

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
                                placeholder='사이즈'
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="beautyName"
                                placeholder='미용 이름'
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="beautyDesc"
                                placeholder='미용 소개'
                                onChange={onChangeHandler}
                            />
                            <input
                                type="text"
                                name="amount"
                                placeholder='가격'
                                onChange={onChangeHandler}
                            />
                            <button onClick={Save}>저장하기</button>
                        </div>
                        }
                    </div>
                </div>
                <div className={style.Table}>
                    <div>카테고리</div>
                    {categories ?
                    categories.map((list, idx) => {
                        let subMenu = products.filter((e) => e.size == list)
                        return(
                            <div className={style.Category} key={idx}>
                                <div>{list}</div>
                                {subMenu.map((e, idx) => {
                                    return(
                                        <div key={idx}>
                                            <div className={style.Category} >
                                                <Del/>
                                                <Edit onClick={() => edit(idx)}/>
                                                {e.edit ?
                                                <>
                                                    <input
                                                    type="text"
                                                    name="beautyName"
                                                    placeholder='미용 이름'
                                                    onChange={onChangeHandler}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="beautyDesc"
                                                        placeholder='미용 소개'
                                                        onChange={onChangeHandler}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        placeholder='가격'
                                                        onChange={onChangeHandler}
                                                    />
                                                    <button onClick={() => saveEdit}>수정하기</button>
                                                </>
                                                :
                                                <>
                                                    <div>{e.beautyName}</div>
                                                    <div>{e.beautyDesc}</div>
                                                    <div>{e.amount} 원</div>
                                                </>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                        :
                        <>아직 아무런 미용이 등록되있지 않습니다</>
                    }
          </div>
        </div>
        <div className={style.Button} onClick={goNext}>
          {' '}
          다음으로
        </div>
      </div>
    </>
  )
}

export default StepTwo
