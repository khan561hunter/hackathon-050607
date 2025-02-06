"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

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


  



export default function (){
    
    
        const [open, setOpen] = useState(false);

  React.useEffect(() => {
    setOpen(true);
    if(!open){
        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
        

  }
     // Open modal automatically when component mounts
  }, []);

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
            <div className="bg-red-300 w-[40%] h-[130px] m-4 text-center p-10 rounded-full mx-auto shadow-xl"><RxCross2 className="fill-red w-[50px] h-[50px]" /></div>
            </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="text-center text-3xl font-bold">
                    <p>Order Cancelled!</p>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="text-center text-gray-500">
                    <p>Your order has been successfully canceled. If payment was already processed, a refund will be initiated as per our refund policy. You will receive a confirmation email shortly with further details.</p>
            </div>
          </Typography>
          
          </div>
        </Box>
      </Modal>
    </main>
  );
}
            
             
