import styled from "styled-components";

// COMMON
export const Card = styled.div`
  background-color: whitesmoke;
  padding: 25px;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
  border-radius: 10px;
`;

// LOGIN FORM
export const FormWrapper = styled.div`
  max-width: 350px;
  margin: auto;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Form = styled.form`
  padding: 25px 15px;
  background-color: whitesmoke;
  border-radius: 6px;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
`;

// NAV
export const NormalText = styled.i`
  font-style: normal;
  cursor: pointer;
`;

export const Nav = styled.nav`
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
`;

export const NavItem = styled.li`
  margin-left: 15px;
  font-size: 1.1rem;
`;

// WAREHOUSE ADMIN PANEL
export const CategoryTitle = styled.div`
  text-align: center;
  padding-bottom: 18px;
`;

export const CategoryTree = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export const Categories = styled.div`
  text-align: left;
`;

export const SubCategories = styled.div`
  text-align: center;
`;

export const SubSubCategory = styled.h6`
  text-align: right;
  margin: 0px 0 20px 0;
`
