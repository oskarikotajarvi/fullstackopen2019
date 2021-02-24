import React, { useEffect } from 'react';
import axios from 'axios';

import { List, Card, Divider } from 'semantic-ui-react';
import DetailIcon from './EntryIcons';

import { Entry, Diagnosis } from '../types';
import { useStateValue } from '../state';
import { setDiagnoses } from '../state/reducer';
import { apiBaseUrl } from '../constants';

interface IEntryProps {
    entry: Entry;
}

const EntryCard: React.FC<IEntryProps> = ({ entry }) => {
    const [{ diagnoses }, dispatch] = useStateValue();

    useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                dispatch(setDiagnoses(diagnosesFromApi));
            } catch (e) {
                console.log(e);
            }
        };

        if (!diagnoses || diagnoses.length === 0) {
            fetchDiagnoses();
        }
    });

    const createDiagnosisList = () => {
        if (entry.diagnosisCodes && diagnoses.length > 0) {
            return entry.diagnosisCodes.map((code) => (
                <List.Item key={code} as="li">
                    {code} {diagnoses && diagnoses.filter((diagnose) => diagnose.code === code)[0].name}
                </List.Item>
            ));
        } else {
            return null;
        }
    };

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date} <DetailIcon type={entry.type} />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                    {entry.diagnosisCodes && <Divider />}
                    {createDiagnosisList()}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>Specialist: {entry.specialist}</Card.Content>
        </Card>
    );
};

export default EntryCard;
