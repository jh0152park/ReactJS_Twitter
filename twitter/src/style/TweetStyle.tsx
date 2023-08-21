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
    top: 0;
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
    top: 0;
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
