import React, { useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ItemModelCheck from './ItemModelCheck';
import ItemModelConfig from './ItemModelConfig';
import { addItemsModels } from '../../utils/config';
import { useParams } from 'react-router-dom';

function ItemsModelsCreator({}) {
    const { configurationId } = useParams();

    const [selectedModels, setSelectedModels] = useState([]);

    const modelItems = [
        { name: 'Sonde' },
        { name: 'Noyau protecteur' },
        { name: 'Prisme de transfert' },
        { name: 'Intercepteur' },
        { name: 'Tempête' },
        { name: 'Canon à photons' },
        { name: 'Sentinelle' },
        { name: 'Portail' },
        { name: 'Oracle' },
        { name: 'Disloqueur' },
        { name: 'Transducteur' },
        { name: 'Antenne' }
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
                                rang={selectedModels.indexOf(model)}
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
