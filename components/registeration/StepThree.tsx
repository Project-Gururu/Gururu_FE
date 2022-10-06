import React, {Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regStylist } from "redux/modules/reg";
import { RootState } from "redux/store";
import style from '../../styles/components/Register.module.scss'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepThree: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
    const dispatch = useDispatch();
    let [num, setNum] = useState(0)
    const stylists = useSelector((state: RootState) => state.reg.stylists);

    const initialState = {
        beauticianName:"",
        beauticianDesc:"",
        beauticianHoliday:"",
        beauticianOpenTime:"",
        beauticianCloseTime:""
    }
    let [stylist, setStylist] = useState<any>({
        beauticianName:"",
        beauticianDesc:"",
        beauticianHoliday:"",
        beauticianOpenTime:"",
        beauticianCloseTime:"",
    })
    const clearState = () => {
        setStylist({...initialState})
    }
    const [image, setImage] = useState();
    const hidden = React.useRef(null);
    const handleClick = () => {
        hidden.current.click();
    }
    const selectFile = (e: any) => {
        setImage(e.target.files[0])
    }
    const goNext = () => {
        setCount(count + 1);
    }
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setStylist({ ...stylist, [name]: value});
    }
    const Save = () => {
        let data = {
            beauticianImg: image,
            ...stylist
        }
        if(stylist.beauticianName.trim() == "" ||
           stylist.beauticianDesc.trim() == "" ||
           stylist.beauticianImg == "" ||
           stylist.beauticianHoliday.trim() == "" ||
           stylist.beauticianOpenTime.trim() == "" ||
           stylist.beauticianCloseTime.trim() == ""
          ) {
            setNum(0);
            return;
          }
        dispatch(regStylist(data)).then(clearState);
        setNum(0);
    }

    return (
        <>
        <div className={style.Grid}>
            <div className={style.Grid}>
                <div className={style.Table}>
                    <div>스타일리스트</div>
                    {num === 0 ?
                    <button onClick={() => setNum(1)}>추가하기</button>
                    :
                    <div className={style.Stylelist}>
                    <div
                        className={style.photo}
                        onClick={handleClick}
                    >
                    사진
                    </div>
                    <input
                        type="text"
                        name="beauticianName"
                        placeholder="이름"
                        onChange={onChangeHandler}
                        />
                    <input
                        type="text"
                        name="beauticianDesc"
                        placeholder="미용사소개"
                        onChange={onChangeHandler}
                    />
                    <input
                        type='file'
                        ref={hidden}
                        style={{ display: "none"}}
                        onChange={selectFile}
                    />
                    <input
                        type="text"
                        name="beauticianHoliday"
                        placeholder="미용사휴무"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="number"
                        name="beauticianOpenTime"
                        placeholder="미용사출근시간"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="number"
                        name="beauticianCloseTime"
                        placeholder="미용사퇴근시간"
                        onChange={onChangeHandler}
                    />
                    <button onClick={Save}>저장하기</button>
                    </div>
                    }
                    {stylists.length === 0 ?
                    <>
                        <div>아직 스타일리스트가 없습니다!</div>
                    </>
                    :
                    stylists.map((list,idx) => {
                        return(
                            <div className={style.Stylelist} key={idx}>
                                <div>이름: {list.beauticianName}</div>
                                <div>소개: {list.beauticianDesc}</div>
                                <div>휴뮤: {list.beauticianHoliday}</div>
                                <div>출근: {list.beauticianOpenTime} 시</div>
                                <div>퇴근: {list.beauticianCloseTime} 시</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className={style.Button} onClick={goNext}> 다음으로</div>
        </div>
        </>
    )
}

export default StepThree;

