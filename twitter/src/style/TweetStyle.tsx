import { styled } from "styled-components";

export const BigContainer = styled.div`
    margin-top: 200px;
`;

export const TweetContainer = styled.div<{ isAttached: boolean }>`
    width: 300px;
    height: ${(props) => (props.isAttached ? 200 : 50)}px;
    border: 1px solid #1988ec;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    padding: 10px;

    display: ${(props) => (props.isAttached ? "block" : "flex")};
    justify-content: ${(props) => (props.isAttached ? "none" : "flex-start")};
    align-items: ${(props) => (props.isAttached ? "none" : "center")};
`;

export const EditButton = styled.button`
    background-color: inherit;
    border: none;
    position: absolute;
    right: 30px;
    top: 3px;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

export const DeleteButton = styled.button`
    background-color: inherit;
    border: none;
    position: absolute;
    right: 0;
    top: 3px;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

export const Text = styled.p`
    margin-bottom: 5px;
`;

export const Image = styled.img`
    width: 300px;
    height: 180px;
`;

export const FormContainer = styled.div`
    width: 300px;
    height: 50px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    padding: 10px;
    padding-top: 6px;
    margin-bottom: 20px;
`;

export const EditForm = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
`;

export const EditInput = styled.input`
    width: 100%;
    padding: 7px;
    padding-left: 10px;
    border: 1px solid #1988ec;
    border-radius: 20px;
    background-color: inherit;
    color: whitesmoke;
    font-size: 15px;
    &::placeholder {
        color: whitesmoke;
        font-size: 20px;
    }
`;

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
`;

export const UpdateButton = styled.input`
    width: 45%;
    border: none;
    background-color: #1988ec;
    border-radius: 20px;
    color: whitesmoke;
    font-weight: bold;
    width: 140px;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;

export const CancleButton = styled.button`
    width: 45%;
    border: none;
    background-color: #fc4547;
    border-radius: 20px;
    color: whitesmoke;
    font-weight: bold;
    width: 140px;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;
