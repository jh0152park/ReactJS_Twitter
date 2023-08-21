import { styled } from "styled-components";

export const Header = styled.div`
    width: 250px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px 0px;
`;

export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > div {
        color: #1988ec;
        margin-bottom: 5px;
    }
`;

export const Logo = styled.img`
    width: 35px;
    height: 30px;
`;
