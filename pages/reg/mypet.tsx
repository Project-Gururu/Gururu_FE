import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../styles/components/Register.module.scss'
import Router from 'next/router'
import ArrowLeft from '../../public/images/arrow-left.svg'
import { delMyPet, editMyPet, regMyPet } from 'redux/modules/reg'
import { RootState } from 'redux/store'
import Delete from '../../public/images/icon-delete.svg'
import Edit from '../../public/images/icon-edit.svg'

const Mypet: React.FC = () => {
  const dispatch = useDispatch()
  const petList = useSelector((state: RootState) => state.reg.myPet)
  let [num, setNum] = useState(0)
  const initialState = {
    petName: '',
    petSex: '',
    petSpec: '',
    petInfo: '',
  }

  const [petinfo, setPetInfo] = useState({
    petName: '',
    petSex: '',
    petSpec: '',
    petInfo: '',
  })

  const [image, setImage] = useState()
  const [change, setChange] = useState<boolean>(false)
  const handleEdit = (idx: number) => {
    const data = {
      index: idx,
      ...petinfo,
    }
    dispatch(editMyPet(data))
    setChange(false)
    setPetInfo({ ...initialState })
  }

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target
    setPetInfo({ ...petinfo, [name]: value })
  }

  const remove = (idx: number) => {
    dispatch(delMyPet(idx))
  }

  const send = () => {
    let data = {
      petImage: image,
      ...petinfo,
    }
    console.log(data)
    {
      petinfo.petName === '' ||
      petinfo.petSex === '' ||
      petinfo.petSpec === '' ||
      petinfo.petInfo === ''
        ? null
        : dispatch(regMyPet(data))
      setPetInfo({ ...initialState })
    }
    setNum(0)
  }

  const hidden = React.useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (hidden.current) {
      hidden.current.click()
    }
  }
  const selectFile = (e:any) => {
    const _file = e.target.files[0]
    setImage(e.target.files[0])
  }

  return (
    <>
      <ArrowLeft onClick={() => Router.push('/mypage')} />
      <div className={style.Grid}>
        {num === 1 ? (
          <>
            <div className={style.Photo} onClick={handleClick}>
              ??????
            </div>
            <input
              type="file"
              ref={hidden}
              style={{ display: 'none' }}
              onChange={selectFile}
            />
            <input
              className={style.Input}
              name="petName"
              placeholder="??????"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSex"
              placeholder="?????? ???) ?????? ?????? ??????"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSpec"
              placeholder="??????????????? ???"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petInfo"
              placeholder="?????? ??????"
              onChange={onChangeHandler}
            />
            <div className={style.Button} onClick={send}>
              ????????????
            </div>
          </>
        ) : (
          <div className={style.Button} onClick={() => setNum(1)}>
            {' '}
            ????????????{' '}
          </div>
        )}
        <div className={style.Table}>
          {petList.length > 0 ? (
            petList.map((el, idx) => {
              return (
                <div className={style.Table} key={idx}>
                  <div>
                    <div className={style.Photo}>??????</div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Edit
                      style={{ position: 'absolute', top: '0', right: '0' }}
                      onClick={() => setChange(true)}
                    />
                    <Delete
                      style={{ position: 'absolute', top: '0', right: '45' }}
                      onClick={() => remove(idx)}
                    />
                    {change ? (
                      <>
                        <input
                          type="text"
                          name="petName"
                          placeholder={el.petName}
                          onChange={onChangeHandler}
                        />
                        <input
                          type="text"
                          name="petSex"
                          placeholder={el.petSex}
                          onChange={onChangeHandler}
                        />
                        <input
                          type="text"
                          name="petSpec"
                          placeholder={el.petSpec}
                          onChange={onChangeHandler}
                        />
                        <input
                          type="text"
                          name="petInfo"
                          placeholder={el.petInfo}
                          onChange={onChangeHandler}
                        />
                        <button onClick={() => handleEdit(idx)}>
                          ????????????
                        </button>
                      </>
                    ) : (
                      <>
                        <div>??????: {el.petName}</div>
                        <div>??????: {el.petSex}</div>
                        <div>???: {el.petSpec}</div>
                        <div>????????????: {el.petInfo}</div>
                      </>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div>???????????? ??????????????? ????????????!</div>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={hidden}
        style={{ display: 'none' }}
        onChange={selectFile}
      />
      <input
        className={style.Input}
        name="petName"
        placeholder="??????"
        onChange={onChangeHandler}
      />
      <input
        className={style.Input}
        name="petSex"
        placeholder="?????? ???) ?????? ?????? ??????"
        onChange={onChangeHandler}
      />
      <input
        className={style.Input}
        name="petSpec"
        placeholder="??????????????? ???"
        onChange={onChangeHandler}
      />
      <input
        className={style.Input}
        name="petInfo"
        placeholder="?????? ??????"
        onChange={onChangeHandler}
      />
      <div className={style.Button} onClick={send}>
        ????????????
      </div>
    </>
  )
}

export default Mypet
