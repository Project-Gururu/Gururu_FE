import {Dispatch, SetStateAction, useState} from 'react'
import style from '../styles/components/Register.module.scss'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepTwo: React.FC<CounterProps> =
({numState: [count, setCount]}) => {

    let [list, setList] = useState([{
        size: "",
    },])
    let [menu, setMenu] = useState([{
        name: "",
        desc: "",
        price: "",
    }])
    const addList = () => {
        setList([...list, { size: ""}])
    }

    const goNext = () => {
        setCount(count + 1);
    }

    const del = (idx: number) => {
        list.splice(idx, 1);
        console.log(list)
    }



    console.log(list)

    return (
        <>
        <div className={style.Grid}>
            <div className={style.Grid}>
                <div className={style.Table}>
                    <div onClick={addList}>카테고리 추가</div>
                    {list.map((list, idx) => {
                        return(
                        <div className={style.Category} key={idx}>
                            <input
                                type="text"
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    list.size = e.currentTarget.value;
                                }}
                            />
                            <div className={style.del} onClick={() => del(idx)}>X</div>
                            <div className={style.open}> 열기 </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className={style.Button} onClick={goNext}> 다음으로</div>
        </div>
        </>
    )
}

export default StepTwo;

