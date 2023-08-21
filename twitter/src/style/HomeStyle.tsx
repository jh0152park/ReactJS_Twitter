import { styled } from "styled-components";

export const Container = styled.div``;

export const Form = styled.form`
    width: 300px;
    height: 150px;
    box-sizing: border-box;
    /* background-color: teal; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: relative;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    padding-left: 20px;
    border-radius: 20px;
    border: 1px solid #1988ec;
    background-color: inherit;
    color: inherit;

    &:hover {
        cursor: pointer;
    }
`;

export const AttachedBox = styled.div`
    color: #1988ec;
    margin: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        margin-left: 5px;
        font-size: 30px;
    }
    &:hover {
        cursor: pointer;
    }
`;

export const AttachedInput = styled.input`
    opacity: 0;
`;

export const SubmitButton = styled.input`
    background-color: #1988ec;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    position: absolute;
    right: -20px;
    top: -2px;
    &:hover {
        cursor: pointer;
    }
`;

export const Frames = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

export const Frame = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`;

export const FrameButton = styled.button`
    border: none;
    background-color: inherit;
    color: #1988ec;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`;
