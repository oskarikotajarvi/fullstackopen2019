import React from 'react';
import { Icon } from 'semantic-ui-react';

import { Gender } from '../types';

interface IGenderIconProps {
    gender: Gender;
}

const MaleIcon: React.FC = () => {
    return <Icon name="mars" />;
};

const FemaleIcon: React.FC = () => {
    return <Icon name="venus" />;
};

const OtherGenderIcon: React.FC = () => {
    return <Icon name="genderless" />;
};

const GenderIcon: React.FC<IGenderIconProps> = (props) => {
    switch (props.gender) {
        case 'male':
            return <MaleIcon />;
        case 'female':
            return <FemaleIcon />;
        case 'other':
            return <OtherGenderIcon />;
        default:
            return null;
    }
};

export default GenderIcon;
