import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    width: 320px;
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 7px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    border: none;
    box-sizing: border-box;
`;

export const ConfirmButton = styled.input`
    display: block;
    width: 100%;
    padding: 7px 10px;
    border-radius: 20px;
    margin-bottom: 20px;
    border: none;
    background-color: #1988ec;
    color: whitesmoke;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
`;

export const ToggleButton = styled.span`
    color: #1988ec;
    margin-bottom: 50px;
    &:hover {
        cursor: pointer;
    }
`;

export const SNSLoginButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

export const SNSLoginButton = styled.button`
    border: none;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    background-color: whitesmoke;
    justify-content: flex-start;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

export const LogoImage = styled.img`
    width: 15px;
    height: 15px;
    margin-left: 3px;
`;
