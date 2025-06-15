import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { ImageCar } from '../../../../types/types';
import Slider from '../Slider';
import { JSX } from 'react';

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
    height: 'auto',
    margin: '0',
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
  '& .MuiBackdrop-root': {
    backgroundColor: '#000000cc',
  },
  '& .MuiDialog-container': {
    height: 'auto',
    marginTop: '5rem',
  },
});

export default function Modal({ images, isOpen, closeModal, imageIndex }: Props): JSX.Element {
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
