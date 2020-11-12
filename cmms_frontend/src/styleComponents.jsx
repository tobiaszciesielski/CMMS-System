import styled from "styled-components";

export const Card = styled.div`
  background-color: whitesmoke;
  padding: 25px;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const CategoryTitle = styled.div`
  text-align: center;
  padding-bottom: 18px;
`;

export const CategoryTree = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Categories = styled.div`
display: block;
transform: translateX(-70px)
`;

export const SubCategories = styled.div`
  transform: translateX(80px)
`;

export const SubSubCategory = styled.h6`
    transform: translateX(70px);
    margin: 0px 0 20px 0;
`
