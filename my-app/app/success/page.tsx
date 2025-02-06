"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaCheck } from "react-icons/fa6";
import { useState , useEffect } from 'react';

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


  



export default function Success(){
    
    
        const [open, setOpen] = useState(false);

useEffect(() => {
    setOpen(true);
    if(!open){
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
        

  }
     // Open modal automatically when component mounts
  });

  const handleClose = () => setOpen(false);

  return (
    <main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex flex-col gap-4'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="bg-emerald-300 w-[40%] h-[130px] m-4 text-center p-10 rounded-full mx-auto shadow-xl"><FaCheck className="fill-emerald-600 w-[50px] h-[50px]" /></div>
            </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="text-center text-3xl font-bold">
                    <p>Order Confirmed!</p>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="text-center text-gray-500">
                    <p>Thank you for your purchase.We're  processing your order and will ship it soon. A confirmation email with your order details will be sent to your inbox shortly</p>
            </div>
          </Typography>
          
          </div>
        </Box>
      </Modal>
    </main>
  );
}
            
             
