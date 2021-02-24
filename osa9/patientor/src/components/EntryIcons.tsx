import React from 'react';
import { Icon } from 'semantic-ui-react';

import { assertNever } from '../utils';

type IDetailIconProps = {
    type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
};

const HospitalIcon: React.FC = () => {
    return <Icon name="hospital" />;
};

const HealthCheckIcon: React.FC = () => {
    return <Icon name="stethoscope" />;
};

const OccupationalHealthcareIcon: React.FC = () => {
    return <Icon name="user md" />;
};

const DetailIcon: React.FC<IDetailIconProps> = (props) => {
    switch (props.type) {
        case 'HealthCheck':
            return <HealthCheckIcon />;
        case 'Hospital':
            return <HospitalIcon />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareIcon />;
        default:
            assertNever(props.type);
            return null;
    }
};

export default DetailIcon;
