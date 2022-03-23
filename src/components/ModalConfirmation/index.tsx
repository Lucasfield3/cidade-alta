
import { Button } from "../../style/global";
import { Modal, Overlay } from "./style";

type Props = {
    isShown:boolean;
    onDisMiss:()=>void;
    onClickYes:()=>void;
};  
export const ModalConfirmation = ({isShown, onDisMiss, onClickYes}: Props) => {
    return (
        <>
            <Overlay onClick={()=>onDisMiss()} isShown={isShown}/>
            <Modal isShown={isShown}>
                <p>Voce tem certeza que deseja excluir?</p>
                <div>
                    <Button height='3rem' width='6rem' onClick={()=>onClickYes()}>sim</Button>
                    <Button height='3rem' width='6rem' onClick={()=>onDisMiss()}>não</Button>
                </div>
            </Modal> 
        </>
    );
};