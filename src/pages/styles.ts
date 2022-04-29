import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    height: 200px;

    background-color:  whitesmoke;
    gap: 10px;
    

    h1 {
        background: transparent;
        font-size: 40px;
    }
    
`

export const Images = styled.main`

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 20px;
    justify-items: center;
    margin-top: 20px;
    

    img {
        width: 400px;
        height: 400px;  
    }

    .card {
            background: whitesmoke;
            height: 450px;
            display: flex;
            align-items: flex-start;
            border-radius: 10px;
            border: 1px solid lightgray;
       
        }
`

export const Subbreed = styled.div`
   display: flex;
   justify-content: center;

    .title {
        display: flex;
        justify-content: center;
        color: black;
    }
`
