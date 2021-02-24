import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';

import EntryCard from '../components/Entry';

import { Patient } from '../types';
import { useStateValue } from '../state';
import { setPatient } from '../state/reducer';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };

        if (!patient || patient.id !== id) {
            fetchPatient();
        }
    }, [dispatch, id, patient]);

    if (!patient || patient.id !== id) {
        return null;
    }

    const determineGenderIcon = () => {
        switch (patient.gender) {
            case 'male':
                return <Icon name="mars" />;
            case 'female':
                return <Icon name="venus" />;
            case 'other':
                return <Icon name="genderless" />;
        }
    };

    return (
        <div className="App">
            <Container>
                <Header as="h2">
                    {patient.name} {determineGenderIcon()}
                </Header>
                <p>ssn: {patient.ssn}</p>
                <p>Occupation: {patient.occupation}</p>
                <Divider hidden />
                <Header as="h3">Entries</Header>
                {patient.entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                ))}
            </Container>
        </div>
    );
};

export default PatientPage;
