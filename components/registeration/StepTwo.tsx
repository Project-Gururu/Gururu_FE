import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delMenu, editMenu, getMenus, regMenu } from 'redux/modules/reg'
import { RootState } from 'redux/store'
import style from '../../styles/components/Register.module.scss'
import Edit from '../../public/images/icon-edit.svg'
import Del from '../../public/images/icon-delete.svg'
import { useAppSelector } from 'redux/hooks'
import Modal from 'react-modal';
interface CounterProps {
  numState: [number, Dispatch<SetStateAction<number>>]
}

const StepTwo: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
  const dispatch = useDispatch()
  let [num, setNum] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false);
  const storeId = useAppSelector((state) => state.user.userInfo.storeId)
  const initialState = {
    storeRegisterId: storeId,
    sizeName: '',
    beautyName: '',
    beautyDesc: '',
    amount: '',
  }
  let [menu, setMenu] = useState({
    storeRegisterId: storeId,
    sizeName: '',
    beautyName: '',
    beautyDesc: '',
    amount: '',
  })
  const customStyles = {
      overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
      },
      content: {
          left: "0",
          margin: "auto",
          width: "500px",
          height: "600px",
          padding: "0",
          overflow: "hidden",
      },
  };
  const products = useSelector((state: RootState) => state.reg.menu)
  const categories = [...new Set<any>(products.map((e) => e.sizeName))]
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target
    setMenu({ ...menu, [name]: value })
  }
  const openModal = (e: any) =>{
    setMenu({...e})
    setIsOpen(true);
  }
  const closeModal = () =>{
    dispatch(getMenus(storeId))
    setIsOpen(false);
  }
  const goNext = () => {
    setCount(count + 1)
  }
  const Save = () => {
    dispatch(regMenu(menu, products))
    setMenu({ ...initialState })
    setNum(0)
  }

  const saveEdit = () => {
    dispatch(editMenu(menu))
  }

  const deleteMenu = (idx: number, info: object) => {
    let data = {
      ...info,
      idx: idx
    }
    dispatch(delMenu(data))
  }

  useEffect(() => {
    dispatch(getMenus(storeId))
  }, [])

  return (
    <>
      <div className={style.Grid}>
        <div className={style.Grid}>
          <div className={style.Table}>
            <div className={style.Menu}>
              <div>미용</div>
              {num === 0 ? (
                <button
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setNum(1)}
                >
                  추가하기
                </button>
              ) : (
                <div className={style.Category}>
                  <input
                    type="text"
                    name="sizeName"
                    placeholder="사이즈"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="beautyName"
                    placeholder="미용 이름"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="beautyDesc"
                    placeholder="미용 소개"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="amount"
                    placeholder="가격"
                    onChange={onChangeHandler}
                  />
                  <button onClick={Save}>저장하기</button>
                </div>
              )}
            </div>
          </div>
          <div className={style.Table}>
            <div>카테고리</div>
            {categories ? (
              categories.map((list, idx) => {
                let subMenu = products.filter((e) => e.sizeName == list)
                return (
                  <div className={style.Category} key={idx}>
                    <div>{list}</div>
                    {subMenu.map((e, idx) => {
                      return (
                        <div key={idx}>
                          <div className={style.Category}>
                            <Del onClick={() => deleteMenu(idx, e)}/>
                            <Edit onClick={()=> openModal(e)}/>
                              <>
                                <div>{e.beautyName}</div>
                                <div>{e.beautyDesc}</div>
                                <div>{e.amount} 원</div>
                              </>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            ) : (
              <>아직 아무런 미용이 등록되있지 않습니다</>
            )}
          </div>
        </div>
        <div className={style.Button} onClick={goNext}>
          {' '}
          다음으로
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>닫기</button>
        <div>사이즈</div>
        <input name='sizeName' value={menu.sizeName} onChange={onChangeHandler}/>
        <div>미용 이름</div>
        <input name='beautyName' value={menu.beautyName} onChange={onChangeHandler}/>
        <div>미용 소개</div>
        <input name='beautyDesc' value={menu.beautyDesc} onChange={onChangeHandler}/>
        <div>가격</div>
        <input name='amount' value={menu.amount} onChange={onChangeHandler}/>
        <button onClick={saveEdit}>수정</button>
      </Modal>
    </>
  )
}

export default StepTwo