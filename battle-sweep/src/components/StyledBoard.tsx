export const StyledBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, calc(25vw / ${props => props.width}));
    grid-template-columns: repeat(${props => props.width}, 1fr);
`