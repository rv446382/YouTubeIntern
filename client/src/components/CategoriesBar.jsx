import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
position:fixed;
margin-top:3px;
display: flex;
padding-right:50px;
font-size:15px;
gap:8px;
object-fit:cover;
span {
  white-space: nowrap;
  color: #fff;
  width:68px;
  height:20px;
  background-color:#222222;
  border-radius:10px;
  padding:5px;
 
  &:hover{
   
  background-color:#454545
  }
  &.active {
    
    background-color: #606060;
   
  }

}


`;

const keywords = [
  'All',
  'React js',
  'use of API',
  'Music',
  'Algorithm',
  'Guitar',
  'Coding',
  'Cricket',
  'Football',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
  'coding',

]


const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')

  const handleClick = value => {
    setActiveElement(value)
  }

  return (
    <Container className='categoriesBar'>
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? 'active' : ''}>
          {value}
        </span>
      ))}
    </Container>
  )
}

export default CategoriesBar;