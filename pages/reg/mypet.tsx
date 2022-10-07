import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '../../styles/components/Register.module.scss'
import Router from "next/router"
import ArrowLeft from '../../public/images/arrow-left.svg'
import { delMyPet, regMyPet } from "redux/modules/reg";
import { RootState } from "redux/store";
import Delete from '../../public/images/icon-delete.svg'
import Edit from '../../public/images/icon-edit.svg'

const Mypet: React.FC = () => {
const dispatch = useDispatch();
const petList = useSelector((state:RootState) => state.reg.myPet)
let [num, setNum] = useState(0);

const initialState = {
    petName: "",
    petSex: "",
    petSpec: "",
    petInfo: ""
}

const [petinfo, setPetInfo] = useState<any>({
    petName: "",
    petSex: "",
    petSpec: "",
    petInfo: "",
})
const [image, setImage] = useState();

const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setPetInfo({ ...petinfo, [name]: value});
}

const remove = (idx: number) => {
  dispatch(delMyPet(idx))
}

const send = () => {
    let data = {
        petImage: image,
        ...petinfo
    }
    console.log(data)
    {petinfo.petName === "" || petinfo.petSex === "" || petinfo.petSpec === ""|| petinfo.petInfo === "" ?
    null
    :
    dispatch(regMyPet(data))
    setPetInfo({...initialState})
    }
    setNum(0)
}

const hidden = React.useRef(null);
    const handleClick = () => {
        hidden.current.click();
    }
    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImage(e.target.files[0])
    }

    return(
        <>
        <ArrowLeft onClick={() => Router.push("/mypage")}/>
        <div className={style.Grid}>
        {num === 1 ?
          <>
            <div
              className={style.Photo}
              onClick={handleClick}
            >
            사진
            </div>
            <input
              type='file'
              ref={hidden}
              style={{ display: "none"}}
              onChange={selectFile}
            />
            <input
              className={style.Input}
              name="petName"
              placeholder="이름"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSex"
              placeholder="성별 예) 남자 또는 여자"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSpec"
              placeholder="반려동물의 종"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petInfo"
              placeholder="특이 사항"
              onChange={onChangeHandler}
            />
            <div
              className={style.Button}
              onClick={send}
            >저장하기
            </div>
          </>
        :
        <div
          className={style.Button}
          onClick={()=>setNum(1)}
        > 추가하기 </div>
        }

        {petList ? petList.map((el, idx) => {
          return(
          <div className={style.Table} key={idx}>
            <div>
              <div></div>
            </div>
            <div style={{position: "relative"}}>
              <Edit style={{position: "absolute", top: "0", right: "0"}}/>
              <Delete
                  style={{position: "absolute", top: "0", right: "45"}}
                  onClick={() => remove(idx)}
              />
              <div>{el.petName}</div>
              <div>{el.petSex}</div>
              <div>{el.petSpec}</div>
              <div>{el.petInfo}</div>
            </div>
          </div>
          )})
          :
          null
        }
        </div>
        </>
    )
}

export default Mypet;