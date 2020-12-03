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
  margin: auto;
`;

export const ExitButton = styled.div`
  width: 100px;
`

export const CatName = styled.span`
  font-size: 24px;
`

export const SubCatName = styled.span`
  font-size: 20px;
`

export const SubSubCatName = styled.span`
  font-size: 16px;
`

export const SidebarCategories = styled.div`
  color: #dddddd;
`

export const Menu = styled.ul`
  list-style: none;
`

export const MenuItem = styled.li`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: -22px;
    border-left: 1px solid #666666;
    border-bottom: 1px solid #666666;
    border-radius: 0 0 0 0;
    width: 20px;
    height: 15px;
  }
  
  &:not(:last-child):after {
    position: absolute;
    content: "";
    top: 16px;
    left: -22px;
    border-left: 1px solid #666666;
    border-top: 1px solid #666666;
    border-radius: 0 0 0 0;
    width: 20px;
    height: 100%;
  }
`