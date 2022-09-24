import {Dispatch, SetStateAction, useState} from 'react'
import styled from 'styled-components'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepTwo: React.FC<CounterProps> =
({numState: [count, setCount]}) => {

    let [list, setList] = useState([{
        size: "",
    },])
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
        <Grid>
            <Grid>
                <Table>
                    <div onClick={addList}>카테고리 추가</div>
                    {list.map((list, idx) => {
                        return(
                        <Category key={idx}>
                            <input
                                type="text"
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    list.size = e.currentTarget.value;
                                }}
                            />
                            <div className='delete' onClick={() => del(idx)}>X</div>
                            <div className='open'> 열기 </div>
                        </Category>
                        )
                    })}
                </Table>
            </Grid>
            <Button onClick={goNext}> 다음으로 -></Button>
        </Grid>
        </>
    )
}

export default StepTwo;

const Button = styled.button`
width: 147px;
height: 44px;
border-radius: 12px;
border: 1px solid black;
margin: auto;
align-items: center;
justify-content: center;
display: flex;
`

const Grid = styled.div`
padding: 16px;
`
const Table = styled.div`
padding: 16px;
border: 1px solid black;
`

const Category = styled.div`
padding: 16px;
border: 1px solid black;
margin-top: 8px;
display: flex;

.delete {
    margin-left: auto;
}

.open {
padding-left: 9px;
}
`

