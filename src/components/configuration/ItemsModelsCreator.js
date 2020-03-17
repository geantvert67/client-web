import React, { useState, useEffect } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ItemModelCheck from './ItemModelCheck';
import ItemModelConfig from './ItemModelConfig';
import { addItemsModels } from '../../utils/config';
import { useParams } from 'react-router-dom';
import { getItemsModel } from '../../service/configuration';

function ItemsModelsCreator({}) {
    const { configurationId } = useParams();

    const [selectedModels, setSelectedModels] = useState([]);
    useEffect(() => {
        getItemsModel(configurationId).then(res => setSelectedModels(res.data));
    }, []);

    const checkItemModel = nom => {
        let checked = false;
        selectedModels.map(m => m.name === nom && (checked = true));
        return checked;
    };

    const modelItems = [
        { name: 'Sonde', tipKey: 'sonde', checked: checkItemModel('Sonde') },
        {
            name: 'Noyau protecteur',
            tipKey: 'noyau',
            checked: checkItemModel('Noyau protecteur')
        },
        {
            name: 'Prisme de transfert',
            tipKey: 'prisme',
            checked: checkItemModel('Prisme de transfert')
        },
        {
            name: 'Intercepteur',
            tipKey: 'intercepteur',
            checked: checkItemModel('Intercepteur')
        },
        { name: 'Tempête', tipKey: 'tempete' },
        {
            name: 'Canon à photons',
            tipKey: 'canon',
            checked: checkItemModel('Tempête')
        },
        {
            name: 'Sentinelle',
            tipKey: 'sentinelle',
            checked: checkItemModel('Sentinelle')
        },
        {
            name: 'Portail',
            tipKey: 'portail',
            checked: checkItemModel('Portail')
        },
        { name: 'Oracle', tipKey: 'oracle', checked: checkItemModel('Oracle') },
        {
            name: 'Disloqueur',
            tipKey: 'disloqueur',
            checked: checkItemModel('Disloqueur')
        },
        {
            name: 'Transducteur',
            tipKey: 'transducteur',
            checked: checkItemModel('Transducteur')
        },
        {
            name: 'Antenne',
            tipKey: 'antenne',
            checked: checkItemModel('Antenne')
        }
    ];

    const handleClick = () => {
        addItemsModels(configurationId, selectedModels);
    };

    return (
        <>
            <Form>
                <Row className="justify-content-md-center">
                    {modelItems.map(model => (
                        <ItemModelCheck
                            model={model}
                            selectedModels={selectedModels}
                            setSelectedModels={setSelectedModels}
                        />
                    ))}
                </Row>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        {selectedModels.map(model => (
                            <ItemModelConfig
                                model={model}
                                selectedModels={selectedModels}
                                setSelectedModels={setSelectedModels}
                            />
                        ))}
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Button
                            variant="success"
                            type="button"
                            onClick={() => handleClick()}
                        >
                            Suivant{' '}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default ItemsModelsCreator;
