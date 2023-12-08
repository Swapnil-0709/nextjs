import React, {useState} from 'react';

const ToggleBox = () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleBoxModal= () => {
        setOpen(prevState => !prevState);
    }
    return {open,toggleBoxModal,setOpen}
};

export default ToggleBox;