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
    margin: 20px 0 20px;
    

    img {    
        height: 400px;  
        width: 100%;;
    }

    .card {
            background: whitesmoke;
            height: 450px;
            width: 90%;
            display: flex;
            align-items: flex-start;
            border-radius: 10px;
            border: 1px solid lightgray;
       
        }

        @media only screen and (max-width: 1000px) {
            display: grid;
    grid-template-columns: 1fr 1fr;
           
}

@media only screen and (max-width: 500px) {
            display: grid;
    grid-template-columns: 1fr;
           
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
    
    @media only screen and (max-width: 500px) {
           .subbreeds {
               justify-content: center;
           }
           
}
    
`
