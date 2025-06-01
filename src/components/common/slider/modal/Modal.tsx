import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { DialogContent } from '@mui/material';
import { ImageCar } from '../../../../types/types';
import Slider from '../Slider';

type Props = {
  images: ImageCar[];
  isOpen: boolean;
  closeModal: () => void;
  imageIndex: number;
};

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    maxWidth: '90vw',
    width: '90vw',
    height: '90vh',
    overflow: 'hidden',
    backgroundColor: '#242424',
  },
  '& .MuiDialogContent-root': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default function Modal({ images, isOpen, closeModal, imageIndex }: Props) {
  return (
    <StyledDialog open={isOpen} onClose={closeModal}>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={() => ({
            position: 'absolute',
            right: 0,
            top: 0,
            color: '#ffffff',
            zIndex: 999,
          })}
        >
          <CloseIcon
            fontSize="large"
            sx={{
              filter: 'drop-shadow(0 0 1px black)',
            }}
          />
        </IconButton>
        <Slider modalContext images={images} imageIndex={imageIndex} />
      </DialogContent>
    </StyledDialog>
  );
}
