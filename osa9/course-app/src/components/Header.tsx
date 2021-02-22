import React from 'react';

interface IHeaderProps {
    name: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
    return <h1>{props.name}</h1>;
};

export default Header;
