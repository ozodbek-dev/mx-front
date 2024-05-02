import {Button, Checkbox, FormControlLabel, FormGroup, Modal} from '@mui/material';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import LoopIcon from '@mui/icons-material/Loop';
import ClearIcon from '@mui/icons-material/Clear';
import primary from "../../../assets/img/Primary.svg";
import "./muassasa.scss";
import {useTranslation} from "react-i18next";
import {Link} from 'react-router-dom';

function Mmodal (){
    const { t } = useTranslation();
        const [open, setOpen] = useState(false);
        const [popone, setPopone] = useState(false);
        const [poptwo, setPoptwo] = useState(false);
        const [count,setCount] = useState(0);
        const [count2,setCount2] = useState(0);
        const [timerid,setTimerid] = useState(0)
        const [timer,setTimer] = useState(5)
        const [state,setState] = useState([]);
        const [visable,setVisable] =  useState(false);
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };
           
          function addsort (){
            setState([
                ...state,
                {
                    id:Math.floor(Math.random()*1000),
                    prev:count,
                    next:count2
                }
            ])
        }

  

        function subzayavka(e){
            e.preventDefault();
            setPopone(false);
            setOpen(true);
            setTimerid(setInterval(() => {
                setTimer(state => state-1)
            },1000))
            setTimeout(() => {
                setOpen(false);
                setPoptwo(true);
            },5500)
        }
       
        if (timer < 1 ){
            clearInterval(timerid);
            setTimer(5)
        }
        useEffect(() => {
            return () => clearInterval(timerid);
          }, [timerid]);
         
       function Delete (e) {
            const Data = state.filter(el => +el.id !== +e.target.id)
            setState(Data)
        }



    return (
        <>
             <Button
                variant="contained"
                color="primary"
                size="large"
                className='zayavka-process'
                onClick={() => setPopone(true)}
                startIcon={<LoopIcon />}
              >
                Arizaga o’zgartirish
              </Button>
              <Modal
               open={popone} 
               onClose={() => setPopone(false)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               >
               <Box  className='zayavka-process__modal' sx={style}>
                <form onSubmit={subzayavka}>
                   <Button
                   style={{
                    width:"100%",
                    justifyContent:"end"
                   }}
                   variant="text"
                   color="primary"
                   size="large"
                   onClick={() => setPopone(false)}
                   startIcon={<ClearIcon />}
                   />
                   <h1 className="zayavka-process__age">{t("input.yosh1")}</h1>
                   <div style={{display:"flex",alignItmes:"center",justifyContent:"center",marginBottom:"12px"}}>
                        <div className="zayavka-process__before">
                            <div className="zayavka-process__prev">
                                    <Button onClick={() => setCount(count - 1)} disabled={count === 0}>
                                        &minus;
                                    </Button>
                                        <span>
                                            {count}
                                        </span>
                                    <Button onClick={() => setCount(count + 1)}>
                                        &#43;
                                    </Button>
                            </div>
                        </div>
                        <div className="zayavka-process__before--next">
                            <div className="zayavka-process__prev">
                                    <Button onClick={() => setCount2(count2 - 1)} disabled={count2 === 0} >
                                        &minus;
                                    </Button>
                                        <span>
                                            {count2}
                                        </span>
                                    <Button onClick={() => setCount2(count2 + 1)}>
                                        &#43;
                                    </Button>
                            </div>
                        </div>
                            <button type={"button"} className='zayavka-btn' onClick={addsort} disabled={state.length > 4} >
                                    <img src={primary}/>
                            </button>
                   </div>
                        <FormGroup className='zayavka-all'>
                            <FormControlLabel className='zayavka-all__all' control={<Checkbox defaultChecked />} label="Hammasi" />
                        </FormGroup>
                        {
                            state.map(el => {
                                return(
                                    <>
                                    <div style={{display:"flex",alignItems:"center"}}>
                                        <FormGroup className='zayavka-all'>
                                            <FormControlLabel className='zayavka-all__all' control={<Checkbox  />} label={el.prev+"-"+el.next} />
                                        </FormGroup>
                                        <Button
                                        className="zayavka-clear"
                                        onClick={Delete}
                                        id={el.id}
                                        variant="text"
                                        color="primary"
                                        size="large"
                                        startIcon={<ClearIcon  />} 
                                        />
                                    </div>
                                    </>
                            )
                            })
                        }

                        <div style={{display:"flex",alignItmes:"center"}}>
                            {
                                state.length > 4 && 
                                <p  className={visable?"zayavka-all__limit--none":'zayavka-all__limit'}>Siz 5 tagacha variant qo'shishingiz mumkin. Yangi variant qo'shish uchun ulardan birini o'chiring</p>
                            }
                            {
                                state.length > 4 && 
                            <Button
                                className={visable && "zayavka-all__limit--none"}
                                variant="text"
                                color="primary"
                                size="large"
                                onClick={() => setVisable(!visable)}
                                startIcon={<ClearIcon />}
                                />
                            }
                        </div> 
                        <Button type={"submit"} style={{
                            width:"100%", 
                            display:"block", 
                            margin:"0 auto",
                            marginTop:"12px",
                            backgroundColor:"#1464C0",
                            borderRadius:"12px",
                            marginBottom:"0"
                        }} variant="contained">Arizaga o’zgartirish
                        </Button>
                </form>
               </Box>
           </Modal>
              <Modal
                open={open} 
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  className='zayavka-process__modal' sx={style}>
                    <Button
                    style={{
                        width:"100%",
                        justifyContent:"end"
                       }}
                    variant="text"
                    color="primary"
                    size="large"
                    onClick={() => setOpen(false)}
                    startIcon={<ClearIcon />}
                    />
                    
                    <h1 className="zayavka-process__head">Arizaga o’zgarmoqda</h1>
                    <p className="zayavka-process__page">
                        Iltimos kuting, sahifani yopmang yoki yangilamang
                    </p>
                    <div className="loading-process">
                    </div>
                    <p className="zayavka-process__timer">{timer} : soniya qoldi</p>
                </Box>
            </Modal>
            <Modal
                open={poptwo} 
                onClose={() => setPoptwo(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box  className='zayavka-process__modal' sx={style}>
                    <Button
                    style={{
                        width:"100%",
                        justifyContent:"end"
                       }}
                    variant="text"
                    color="primary"
                    size="large"
                    onClick={() => setPoptwo(false)}
                    startIcon={<ClearIcon />}
                    />
                    
                    <h1 className="zayavka-process__true">Ariza muvaffaqiyatli o’zgardi</h1>
                    <p className="zayavka-process__page">
                        Arizani ko’rish uchun quyidagi tugmaga bosing:
                    </p>
                    <Link to={"/"} className='zayavka-process__link'>
                        Arizani ko’rish
                    </Link>
                </Box>
            </Modal>
        </>
    )
}

export default Mmodal;