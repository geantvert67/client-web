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

    const modelItems = [
        { name: 'Sonde', tipKey: 'sonde' },
        { name: 'Noyau protecteur', tipKey: 'noyau' },
        { name: 'Prisme de transfert', tipKey: 'prisme' },
        { name: 'Intercepteur', tipKey: 'transducteur' },
        { name: 'Tempête', tipKey: 'tempete' },
        { name: 'Canon à photons', tipKey: 'canon' },
        { name: 'Sentinelle', tipKey: 'sentinelle' },
        { name: 'Portail', tipKey: 'portail' },
        { name: 'Oracle', tipKey: 'oracle' },
        { name: 'Disloqueur', tipKey: 'disloqueur' },
        { name: 'Transducteur', tipKey: 'transducteur' },
        { name: 'Antenne', tipKey: 'antenne' }
    ];

    const handleClick = () => {
        addItemsModels(configurationId, selectedModels);
    };

    return (
        <>
            <Form>
                <Row className="justify-content-md-center">
                    {modelItems.map(model => (
                        <div key={model.name}>
                            <ItemModelCheck
                                model={model}
                                selectedModels={selectedModels}
                                setSelectedModels={setSelectedModels}
                            />
                        </div>
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
